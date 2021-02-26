import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  JoinColumn, 
  ManyToOne, 
  PrimaryColumn 
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { User } from './User';
import { Survey } from './Survey';

@Entity("surveys_users")
class SurveyUser {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({name: "user_id"})
  user: User

  @Column()
  survey_id: string;

  @ManyToOne(() => Survey)
  @JoinColumn({name: "survey_id"})
  survey: Survey

  @Column()
  value: number;

  @CreateDateColumn()
  created_at: Date;

  // o constructor é um método que é executado assim que uma classe é
  // instanciada, ou seja, assim que uma classe é chamada, é criada as
  // informações que estão dentro do constructor são executadas
  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
};

export { SurveyUser };