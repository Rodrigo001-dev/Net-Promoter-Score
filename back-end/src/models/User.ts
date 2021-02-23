import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

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
}

export { User };