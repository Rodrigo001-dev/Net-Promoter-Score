import { Request, Response } from 'express';

import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../../repositories/UsersRepository';

export default async function create(request: Request, response: Response) {
  const { name, email } = request.body;

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