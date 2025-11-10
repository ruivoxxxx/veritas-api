import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeColumnsAt1759877986829 implements MigrationInterface {
    name = 'ChangeColumnsAt1759877986829'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtos" ADD "created_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "produtos" ALTER COLUMN "updated_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "produtos" ALTER COLUMN "updated_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "produtos" ALTER COLUMN "deleted_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "produtos" ALTER COLUMN "deleted_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "pedidos" ALTER COLUMN "valor_total" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pedidos" ALTER COLUMN "status" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pedidos" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pedidos" ALTER COLUMN "created_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "pedidos" ALTER COLUMN "updated_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pedidos" ALTER COLUMN "updated_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "pedidos" ALTER COLUMN "deleted_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pedidos" ALTER COLUMN "deleted_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "usuarios" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "usuarios" ALTER COLUMN "created_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "usuarios" ALTER COLUMN "updated_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "usuarios" ALTER COLUMN "updated_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "usuarios" ALTER COLUMN "deleted_at" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" ALTER COLUMN "deleted_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "usuarios" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "usuarios" ALTER COLUMN "updated_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "usuarios" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "usuarios" ALTER COLUMN "created_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pedidos" ALTER COLUMN "deleted_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "pedidos" ALTER COLUMN "deleted_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pedidos" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "pedidos" ALTER COLUMN "updated_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pedidos" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "pedidos" ALTER COLUMN "created_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pedidos" ALTER COLUMN "status" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pedidos" ALTER COLUMN "valor_total" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "produtos" ALTER COLUMN "deleted_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "produtos" ALTER COLUMN "deleted_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "produtos" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "produtos" ALTER COLUMN "updated_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "created_at"`);
    }

}
