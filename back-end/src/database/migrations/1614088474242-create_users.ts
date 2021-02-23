import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUsers1614088474242 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true
          },
          {
            name: "name",
            type: "varchar"
          },
          {
            name: "email",
            type: "varchar"
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()" // o valor padrão do created_at vai ser a hora atual
          }
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }

}
