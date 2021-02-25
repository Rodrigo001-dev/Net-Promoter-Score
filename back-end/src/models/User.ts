import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

import { v4 as uuid } from 'uuid';

@Entity("users")
class User {
  
  @PrimaryColumn()
  // quem tem informação sobre o uduário(controllers) possa adicionar ou mudar
  // o valor do id
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @CreateDateColumn()
  created_at: Date;

  // o constructor é um método que é executado assim que uma classe é
  // instanciada, ou seja, assim que uma classe é chamada, é criada as
  // informações que estão dentro do constructor são executadas
  constructor() {
    // se o id não axistir
    if (!this.id) {
      // vai atribuir o valor do id para uuid para gerar vários hashs
      // aleatórios
      this.id = uuid();
    }
  }
}

export { User };