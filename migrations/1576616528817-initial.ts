import { MigrationInterface, QueryRunner } from 'typeorm';

export class initial1576616528817 implements MigrationInterface {
    name = 'initial1576616528817';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "lastName" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT false, "about" character varying(500), "trainingNum" integer NOT NULL, "role" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "trainings" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "wodId" integer, CONSTRAINT "PK_b67237502b175163e47dc85018d" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "wods" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "date" TIMESTAMP NOT NULL, "duration" integer NOT NULL, "roundNumber" integer NOT NULL, "trainingType" integer NOT NULL, "trainer" character varying(255) NOT NULL, "globalType" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_98358122b98ac0fca65b151f5b9" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "exercises" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "repsNumber" integer NOT NULL, "weight" integer NOT NULL, "duration" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "wodId" integer, CONSTRAINT "PK_c4c46f5fa89a58ba7c2d894e3c3" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "user_trainings" ("usersId" integer NOT NULL, "trainingsId" integer NOT NULL, CONSTRAINT "PK_b7fa20d96fe61b29ad40a0fabe9" PRIMARY KEY ("usersId", "trainingsId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_0dc3ee93d93c035e1b2ad876a0" ON "user_trainings" ("usersId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_91b6e4b83b24a64a3cef953b1f" ON "user_trainings" ("trainingsId") `, undefined);
        await queryRunner.query(`ALTER TABLE "trainings" ADD CONSTRAINT "FK_a91dfa879568f55971f378d9b78" FOREIGN KEY ("wodId") REFERENCES "wods"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "exercises" ADD CONSTRAINT "FK_6668e6ab4451b028ee9278f5833" FOREIGN KEY ("wodId") REFERENCES "wods"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user_trainings" ADD CONSTRAINT "FK_0dc3ee93d93c035e1b2ad876a06" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user_trainings" ADD CONSTRAINT "FK_91b6e4b83b24a64a3cef953b1fe" FOREIGN KEY ("trainingsId") REFERENCES "trainings"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user_trainings" DROP CONSTRAINT "FK_91b6e4b83b24a64a3cef953b1fe"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_trainings" DROP CONSTRAINT "FK_0dc3ee93d93c035e1b2ad876a06"`, undefined);
        await queryRunner.query(`ALTER TABLE "exercises" DROP CONSTRAINT "FK_6668e6ab4451b028ee9278f5833"`, undefined);
        await queryRunner.query(`ALTER TABLE "trainings" DROP CONSTRAINT "FK_a91dfa879568f55971f378d9b78"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_91b6e4b83b24a64a3cef953b1f"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_0dc3ee93d93c035e1b2ad876a0"`, undefined);
        await queryRunner.query(`DROP TABLE "user_trainings"`, undefined);
        await queryRunner.query(`DROP TABLE "exercises"`, undefined);
        await queryRunner.query(`DROP TABLE "wods"`, undefined);
        await queryRunner.query(`DROP TABLE "trainings"`, undefined);
        await queryRunner.query(`DROP TABLE "users"`, undefined);
    }

}
