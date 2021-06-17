import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterItemsTable1623881842322 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'items',
      new TableColumn({
        name: 'measureUnity',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('items', 'measureUnity');
  }
}
