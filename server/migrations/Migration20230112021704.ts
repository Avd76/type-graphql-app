import { Migration } from '@mikro-orm/migrations';

export class Migration20230112021704 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "todo" drop constraint "todo_userid_userid_foreign";');

    this.addSql('alter table "todo" rename column "userid" to "userid_userid";');
    this.addSql('alter table "todo" add constraint "todo_userid_userid_foreign" foreign key ("userid_userid") references "users" ("userid") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "todo" drop constraint "todo_userid_userid_foreign";');

    this.addSql('alter table "todo" rename column "userid_userid" to "userid";');
    this.addSql('alter table "todo" add constraint "todo_userid_userid_foreign" foreign key ("userid") references "users" ("userid") on update cascade on delete no action;');
  }

}
