import { Migration } from '@mikro-orm/migrations';

export class Migration20231116035118 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "users" ("userid" varchar(255) not null, "username" varchar(255) not null, "password" varchar(255) not null, constraint "users_pkey" primary key ("userid"));');
    this.addSql('alter table "users" add constraint "users_username_unique" unique ("username");');

    this.addSql('create table "todo" ("id" serial primary key, "desc" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "userid_userid" varchar(255) not null, "age" timestamptz(0) not null);');

    this.addSql('alter table "todo" add constraint "todo_userid_userid_foreign" foreign key ("userid_userid") references "users" ("userid") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "todo" drop constraint "todo_userid_userid_foreign";');

    this.addSql('drop table if exists "users" cascade;');

    this.addSql('drop table if exists "todo" cascade;');
  }

}
