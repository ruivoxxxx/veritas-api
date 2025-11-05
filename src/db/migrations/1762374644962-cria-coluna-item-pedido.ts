import { MigrationInterface, QueryRunner } from "typeorm";

export class CriaColunaItemPedido1762374644962 implements MigrationInterface {
    name = 'CriaColunaItemPedido1762374644962'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Item-pedidos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantidade" integer NOT NULL, "preco_venda" integer NOT NULL, "produtoId" uuid, CONSTRAINT "PK_e16919a52881bb3d57687d56d1a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP COLUMN "valor_total"`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD "valor_total" integer`);
        await queryRunner.query(`ALTER TABLE "Item-pedidos" ADD CONSTRAINT "FK_444797dcc4032211f7587d0aece" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Item-pedidos" DROP CONSTRAINT "FK_444797dcc4032211f7587d0aece"`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP COLUMN "valor_total"`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD "valor_total" character varying(255)`);
        await queryRunner.query(`DROP TABLE "Item-pedidos"`);
    }

}
