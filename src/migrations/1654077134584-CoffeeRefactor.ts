import { MigrationInterface, QueryRunner } from 'typeorm';

export class CoffeeRefactor1654077134584 implements MigrationInterface {
  // up指示是我们迁移中要更改的类容以及如何更改
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coffee" RENAME COLUMN "name" TO "title"`,
    );
  }
  // 撤销或者回滚这些更改
  public async down(queryRunner: QueryRunner): Promise<void> {
    `ALTER TABLE "coffee" RENAME COLUMN "title" TO "name"`;
  }
}
