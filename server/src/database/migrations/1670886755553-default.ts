import { MigrationInterface, QueryRunner } from "typeorm";

export class default1670886755553 implements MigrationInterface {
    name = 'default1670886755553'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`images\` ADD \`orphanage_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`images\` ADD CONSTRAINT \`FK_aa7e04fdd620f748adad5b96bbb\` FOREIGN KEY (\`orphanage_id\`) REFERENCES \`orphanages\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`images\` DROP FOREIGN KEY \`FK_aa7e04fdd620f748adad5b96bbb\``);
        await queryRunner.query(`ALTER TABLE \`images\` DROP COLUMN \`orphanage_id\``);
    }

}
