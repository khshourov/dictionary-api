import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class StarterSchema1729963981316 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create dictionary_words table
    await queryRunner.createTable(
      new Table({
        name: 'dictionary_words',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'word',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'lexical_entry',
            type: 'text',
          },
        ],
      }),
    );

    // Create access_logs table
    await queryRunner.createTable(
      new Table({
        name: 'access_logs',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'user_id',
            type: 'varchar',
          },
          {
            name: 'word_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'access_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    // Create foreign key for access_logs
    await queryRunner.createForeignKey(
      'access_logs',
      new TableForeignKey({
        name: 'FK_access_logs_word_id',
        columnNames: ['word_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'dictionary_words',
        onDelete: 'CASCADE', // Adjust this as necessary
      }),
    );

    // Create access_summaries table
    await queryRunner.createTable(
      new Table({
        name: 'access_summaries',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'user_id',
            type: 'varchar',
          },
          {
            name: 'word_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'total_access',
            type: 'smallint',
          },
          {
            name: 'last_access_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    // Create foreign key for access_summaries
    await queryRunner.createForeignKey(
      'access_summaries',
      new TableForeignKey({
        name: 'FK_access_summaries_word_id',
        columnNames: ['word_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'dictionary_words',
        onDelete: 'CASCADE', // Adjust this as necessary
      }),
    );

    // Create unique index for access_summaries
    await queryRunner.createIndex(
      'access_summaries',
      new TableIndex({
        name: 'IDX_user_id_word_id_access_summaries',
        columnNames: ['user_id', 'word_id'],
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop indexes first
    await queryRunner.dropIndex(
      'access_summaries',
      'IDX_user_id_word_id_access_summaries',
    );

    // Drop foreign keys
    await queryRunner.dropForeignKey('access_logs', 'FK_access_logs_word_id');
    await queryRunner.dropForeignKey(
      'access_summaries',
      'FK_access_summaries_word_id',
    );

    // Drop access_summaries table
    await queryRunner.dropTable('access_summaries');

    // Drop access_logs table
    await queryRunner.dropTable('access_logs');

    // Drop dictionary_words table
    await queryRunner.dropTable('dictionary_words');
  }
}
