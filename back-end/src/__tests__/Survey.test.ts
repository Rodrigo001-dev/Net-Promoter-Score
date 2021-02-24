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

describe("Surveys", () => {
  // beforeAll => antes de tudo vai executar as migrations
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  it("Should be able to create a new survey", async () => {
    const response = await request(app).post("/surveys").send({
      title: "Title Example",
      description: "Description Example"
    });

    console.log(response);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("Should be able to get all surveys", async () => {
    await request(app).post("/surveys").send({
      title: "Title Example2",
      description: "Description Example2"
    });

    const response = await request(app).get("/surveys");

    console.log(response);

    // espera que o tamanho do aray seja igual a 2
    expect(response.body.length).toBe(2);
  });
});