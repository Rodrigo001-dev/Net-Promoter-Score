import { EntityRepository, Repository } from "typeorm";

import { User } from "../models/User";

// o repositório permite que se faça algumas ações dentro do banco de dados,
// manipulação de dados, inserção de dados, criação de tabela, edição de
// alguns atributos.
// toda a comunicação com o banco de dados vai ser feita pelos repositórios
// para cada entidade vai ter um repositório expecífico

// estou dizendo que o UsersRepository vai ser um repositório e dentro dos ()
// é passado a entidade
@EntityRepository(User)
class UsersRepository extends Repository<User> {}

export { UsersRepository };