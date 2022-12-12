import { MigrationInterface, QueryRunner } from "typeorm";

export class default1670886699794 implements MigrationInterface {
    name = 'default1670886699794'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`orphanages\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` text NOT NULL, \`about\` varchar(200) NOT NULL, \`instructions\` varchar(200) NOT NULL, \`opening_hours\` varchar(255) NOT NULL, \`latitude\` decimal NOT NULL, \`longitude\` decimal NOT NULL, \`open_on_weekands\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`images\` (\`id\` int NOT NULL AUTO_INCREMENT, \`path\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`images\``);
        await queryRunner.query(`DROP TABLE \`orphanages\``);
    }

}
