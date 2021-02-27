import { Request, Response } from 'express';
import { getCustomRepository, Not, IsNull } from 'typeorm';

import { SurveysUsersRepository } from '../../repositories/SurveysUsersRepository';

export default async function execute(request: Request, response: Response) {
  // em um nps(Net Promoter Score) tem as notas de 1 até 10 e dentre essas notas
  // tem três classificações:
  // os Detratores => são as notas consideradas de 0 - 6
  // os Passivos => 7 - 8
  // e os Promotores => 9 - 10
  // em um cálculo de nps as pessoas que dão notas de 7 - 8 não interfere e não
  // importa nada porque os Passivos são removidos, ou seja, todas as pessoas
  // que votam de 7 - 8 é como se elas não estivessem fazendo parte da pesquisa
  // o cálculo de NPS é: 
  // (Número de promotores - Número de detratores) / (Número de respondentes) x 100

  const { survey_id } = request.params; 
  
  const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

  const surveyUsers = await surveysUsersRepository.find({
    survey_id,
    // estou falando que o valor não pode ser igual a nulos
    value: Not(IsNull())
  });

  // o filter vai fazer uma leitura de todos
  const detractor = surveyUsers.filter(
    // filtrando todos os detratores  
    (survey) => survey.value >= 0 && survey.value <= 6
    // o length serve para pegar somente o valor porque se não colocar o length
    // vai retornar um array
  ).length;

  const promoters = surveyUsers.filter(
    // filtrando todos os promotores
    (survey) => survey.value >= 9 && survey.value <= 10
  ).length;

  const passive = surveyUsers.filter(
    // filtrando todos os passivos
    (survey) => survey.value >= 7 && survey.value <= 8
  ).length;

  // pegando todas as quantidades de respostas que tem
  const totalAnswers = surveyUsers.length;

  // o toFixed vai trazer somente 2 casas depois do ponto do calculo de nps
  // e estou convertendo tudo para um Number porque o toFixed retorna uma String
  const calculate = Number(
    (((promoters - detractor) / totalAnswers) * 100).toFixed(2)
  );

  return response.json({ 
    detractor, 
    promoters, 
    passive, 
    totalAnswers, 
    nps: calculate
  });
};