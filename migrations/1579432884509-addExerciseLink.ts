import {MigrationInterface, QueryRunner} from "typeorm";

export class addExerciseLink1579432884509 implements MigrationInterface {
    name = 'addExerciseLink1579432884509'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "exercises" ADD "link" character varying(500)`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "exercises" DROP COLUMN "link"`, undefined);
    }

}
