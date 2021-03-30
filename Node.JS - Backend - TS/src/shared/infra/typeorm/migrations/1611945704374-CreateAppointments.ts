/* eslint-disable class-methods-use-this */
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateAppointments1611945704374
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'provider_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'date',
            type: 'timestamp with time zone',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentProvider',
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        /**
         * USER DELETADO, O QUE ACONTECE?
         * CASCADE: Deleta todos os APPOINTMENTS relacionados ao usuário
         * SET NULL: Torna provider_id NULL
         * RESTRICT: Não deixa o usuário ser deletado
         */
        onDelete: 'SET NULL',
        /**
         * USER ID ATUALIZADO, O QUE ACONTECE?
         * CASCADE: Altera todos os APPOINTMENTS_ID relacionados ao usuário
         * SET NULL: Altera provider_id
         * RESTRICT: Não deixa o usuário ser alterado
         */
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

    await queryRunner.dropTable('appointments');
  }
}
