import { Request, Response } from 'express';

import { usersRepository } from '../../repositories/usersRepository';

export default async function create(request: Request, response: Response) {
  const { name, email } = request.body;

  const user = usersRepository.create({
    name, email
  });

  await usersRepository.save(user);

  return response.json(user);
};