import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (): Promise<Connection> => {
  // com o defaultOptions vai ter acesso a todas as informações que estão 
  // dentro do ormconfig.json
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    // com o Object.assign vai poder pegar um objeto e vai sobredescrever a 
    // variável database
    Object.assign(defaultOptions, {
      // se a variável de ambiente NODE_ENV for igual a test vai utilizar o
      // banco de dados para testes(database.test.sqlite) se não vai utilizar
      // o padrão
      database: process.env.NODE_ENV === 'test' 
        ? "./src/database/database.test.sqlite" 
        : defaultOptions.database
    })
  );
};