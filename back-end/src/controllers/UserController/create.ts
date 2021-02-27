import { Request, Response } from 'express';

import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../../repositories/UsersRepository';

import * as yup from 'yup';

export default async function create(request: Request, response: Response) {
  const { name, email } = request.body;

  // criando o schema da validação
  const schema = yup.object().shape({
    // estou falando que tem um name do tipo string e que é obrigatório
    name: yup.string().required("Nome é obrigatório"),
    email: yup.string().email().required("Email incorreto")
  });

  // se as informações que tem dentro do request.body não forem validadas com o 
  // schema
  // if (!(await schema.isValid(request.body))) {
  //   return response.status(400).json({ error: "Validation Failed!" });
  // }

  // fazendo a validação com o yup
  try {
    // o abortEarly: false serve para rodar todas as validações de uma vez
    await schema.validate(request.body, { abortEarly: false });
  } catch (error) {
    return response.status(400).json({ error });
  };

  const usersRepository = getCustomRepository(UsersRepository);

  // SELECT * FROM USERS WHERE email = "email"
  const userAlreadyExists = await usersRepository.findOne({
    email
  });

  // se tentar cadastrar um email existente vai dar um erro
  if (userAlreadyExists) {
    return response.status(400).json({ error: "User already exists!" });
  };

  const user = usersRepository.create({
    name, email
  });

  await usersRepository.save(user);

  return response.status(201).json(user);
};