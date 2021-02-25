import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { UsersRepository } from '../../repositories/UsersRepository';
import { SurveysRepository } from '../../repositories/SurveysRepository';
import { SurveysUsersRepository } from '../../repositories/SurveysUsersRepository';

import SendMailService from '../../services/SendMailService';

export default async function execute(request: Request, response: Response) {
  const { email, survey_id } = request.body;

  const usersRepository = getCustomRepository(UsersRepository);
  const surveysRepository = getCustomRepository(SurveysRepository);
  const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

  const userAlreadyExists = await usersRepository.findOne({ email });

  // se o usuário não existir vai retornar um erro 
  if (!userAlreadyExists) {
    return response.status(400).json({ error: "User does not exists!" });
  };

  const surveyAlreadyExists = await surveysRepository.findOne({ id: survey_id });

  if (!surveyAlreadyExists) {
    return response.status(400).json({ error: "Survey does not exists!" });
  };

  // salvar as informações na tabela survey_user
  const surveyUser = surveysUsersRepository.create({
    user_id: userAlreadyExists.id,
    survey_id
  });

  await surveysUsersRepository.save(surveyUser);

  // enviar e-mail para o usuário
  await SendMailService.executeMailSend(
    email, 
    surveyAlreadyExists.title,
    surveyAlreadyExists.description
  );

  return response.status(201).json(surveyUser);
};