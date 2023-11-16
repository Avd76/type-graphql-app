import { Migration } from '@mikro-orm/migrations';

export class Migration20231116014419 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "todo" add column "age" timestamptz(0) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "todo" drop column "age";');
  }

}
