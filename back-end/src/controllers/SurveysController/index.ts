import { Request, Response } from 'express';

import { getCustomRepository } from 'typeorm';

import { SurveysRepository } from '../../repositories/SurveysRepository';

export default async function index(request: Request, response: Response) {
  const surveysRepository = getCustomRepository(SurveysRepository);

  const all = await surveysRepository.find();

  return response.json(all);
};