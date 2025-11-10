import { MigrationInterface, QueryRunner } from "typeorm";

export class MapeandoDb1759444610969 implements MigrationInterface {
    name = 'MapeandoDb1759444610969'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produto_imagens" DROP CONSTRAINT "FK_eb1531605709dd94ec67b2141d0"`);
        await queryRunner.query(`CREATE TABLE "produto_caracteristica" ("id" uuid NOT NULL, "nome" character varying(100) NOT NULL, "descricao" character varying(255) NOT NULL, CONSTRAINT "PK_f5c982faff5e132a82a175505c3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pedidos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "valor_total" character varying(255) NOT NULL, "status" character varying NOT NULL, "itens_pedido" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP NOT NULL DEFAULT now(), "usuarioId" uuid, CONSTRAINT "PK_ebb5680ed29a24efdc586846725" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "produto_imagens" DROP COLUMN "produtoId"`);
        await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "id_usuario"`);
        await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "updated_by"`);
        await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "deleted_by"`);
        await queryRunner.query(`ALTER TABLE "produto_imagens" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "produto_imagens" DROP COLUMN "descricao"`);
        await queryRunner.query(`ALTER TABLE "produto_imagens" ADD "descricao" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "produtos" ALTER COLUMN "nome" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "produtos" ALTER COLUMN "valor" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "produtos" ALTER COLUMN "quantidade" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "descricao"`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD "descricao" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "categoria"`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD "categoria" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD "deleted_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "nome"`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "nome" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "email" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "usuarios" ALTER COLUMN "senha" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "usuarios" ALTER COLUMN "deleted_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD CONSTRAINT "FK_e60a655127c227b5e063e73165b" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pedidos" DROP CONSTRAINT "FK_e60a655127c227b5e063e73165b"`);
        await queryRunner.query(`ALTER TABLE "usuarios" ALTER COLUMN "deleted_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "usuarios" ALTER COLUMN "senha" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "email" character varying(70) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "nome"`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "nome" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD "deleted_at" date`);
        await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD "updated_at" date`);
        await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "categoria"`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD "categoria" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "descricao"`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD "descricao" character varying`);
        await queryRunner.query(`ALTER TABLE "produtos" ALTER COLUMN "quantidade" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "produtos" ALTER COLUMN "valor" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "produtos" ALTER COLUMN "nome" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "produto_imagens" DROP COLUMN "descricao"`);
        await queryRunner.query(`ALTER TABLE "produto_imagens" ADD "descricao" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "produto_imagens" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD "deleted_by" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD "updated_by" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD "id_usuario" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "produto_imagens" ADD "produtoId" uuid`);
        await queryRunner.query(`DROP TABLE "pedidos"`);
        await queryRunner.query(`DROP TABLE "produto_caracteristica"`);
        await queryRunner.query(`ALTER TABLE "produto_imagens" ADD CONSTRAINT "FK_eb1531605709dd94ec67b2141d0" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
