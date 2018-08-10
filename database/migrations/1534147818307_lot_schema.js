'use strict';

const Schema = use('Schema');

class LotSchema extends Schema {
  up () {
    this.create('lots', (table) => {
      table.increments();
      table.string('title').notNullable();
      table.string('image');
      table.text('description');
      table.enu('status', ['pending', 'inProcess', 'closed']).notNullable();
      table.float('currentPrice').notNullable();
      table.float('estimatedPrice').notNullable();
      table.dateTime('startTime').notNullable();
      table.dateTime('endTime').notNullable();
      table.integer('user_id').unsigned().references('id').inTable('users');

      table.timestamps();
    })
  }

  down () {
    this.drop('lots')
  }
}

module.exports = LotSchema;
