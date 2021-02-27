import createConnection from './database';
import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
// por padrão o express não lidar com os erros e para isso que é instalado a
// biblioteca express-async-errors e tem que importar ela logo após a importação
// express
import 'express-async-errors';
import { router } from './routes';

import { AppError } from './errors/AppError';

createConnection();
const app = express();

app.use(express.json());
app.use(router);

// utilizando conceito de middleware, middleware é tudo aquilo vai estar no 
// caminho entre a requisição e a resposta
app.use(
  (error: Error, request: Request, response: Response, _next: NextFunction) => {
    // se o erro que está vindo aqui for uma instância da classe AppError(throw
    // new AppError)
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({ message: error.message });
    };

    // se o erro que está retornando não for uma instância da classe AppError
    // vai retornar um status 500(erro interno no servidor)
    return response.status(500).json({
      status: "Error",
      message: `Internal server error ${error.message}`
    });
  }
)

export { app };