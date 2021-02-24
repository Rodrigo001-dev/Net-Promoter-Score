import request from 'supertest';
import { app } from '../app';

import createConnection from '../database';

// vai descrever o que ser feito
// describe("First", () => {
  
  // para criar um teste é utilizando a função it()
  // no primeiro parâmetro é descripto o teste com o máximo de detalhes
  // possível para quando rodar os testes só olhar a descrição e saber o que
  // o teste está fazendo
  // o segundo parâmetro é uma função
  // it("deve somar 2 numeros", () => {
    // dentro do teste tem 2 informações o expect => o que é esperado, pode ser
    // uma função, um serviço que está sendo criado entre outras coisa

    // toBe => que seja, que me retorne
    // expect(2 + 2).toBe(4);
  // });

  // it("deve somar 2 numeros", () => {
    // no.toBe => espera que 2 + 2 não seja 5
    // expect(2 + 2).not.toBe(5);
  // });
// });

describe("User", () => {
  // beforeAll => antes de tudo vai executar as migrations
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });
  
  it("Should be able to create a new user", async () => {
    const response = await request(app).post("/users").send({
      email: "user@example.com",
      name: "User Example"
    });

    expect(response.status).toBe(201);
  });

  it("Should not be able to create a new user with exists email", async () => {
    const response = await request(app).post("/users").send({
      email: "user@example.com",
      name: "User Example"
    });

    expect(response.status).toBe(400);
  });
});