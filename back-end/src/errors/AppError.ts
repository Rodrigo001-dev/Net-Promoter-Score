

export class AppError {
  // quem vai colocar o valor dentro da minhas variáveis vai ser o constructor,
  // eu posso colocar o public readonly
  public readonly message: string;
  public readonly statusCode: number;

  // o constructor é um método que é executado assim que uma classe é
  // instanciada, ou seja, assim que uma classe é chamada, é criada as
  // informações que estão dentro do constructor são executadas
  // eu estou definindo um valor padrão para o statusCode
  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  };
};