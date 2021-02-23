import { Request, Response } from 'express';

import { getRepository } from 'typeorm';
import { User } from '../../models/User';

export default async function create(request: Request, response: Response) {
  const { name, email } = request.body;

  // o repositório permite que se faça algumas ações dentro do banco de dados,
  // manipulação de dados, inserção de dados, criação de tabela, edição de
  // alguns atributos.
  // toda a comunicação com o banco de dados vai ser feita pelos repositórios
  // para cada entidade vai ter um repositório expecífico

  const usersRepository = getRepository(User);

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

  return response.json(user);
};