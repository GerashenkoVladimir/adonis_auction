'use strict';

const Schema = use('Schema');

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.string('firstName').notNullable();
      table.string('lastName').notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema;
