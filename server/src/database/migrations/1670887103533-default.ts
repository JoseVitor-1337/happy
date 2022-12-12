import { MigrationInterface, QueryRunner } from "typeorm";

export class default1670887103533 implements MigrationInterface {
    name = 'default1670887103533'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orphanages\` DROP COLUMN \`latitude\``);
        await queryRunner.query(`ALTER TABLE \`orphanages\` ADD \`latitude\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`orphanages\` DROP COLUMN \`longitude\``);
        await queryRunner.query(`ALTER TABLE \`orphanages\` ADD \`longitude\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orphanages\` DROP COLUMN \`longitude\``);
        await queryRunner.query(`ALTER TABLE \`orphanages\` ADD \`longitude\` decimal(10,0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`orphanages\` DROP COLUMN \`latitude\``);
        await queryRunner.query(`ALTER TABLE \`orphanages\` ADD \`latitude\` decimal(10,0) NOT NULL`);
    }

}
