'use strict';

const Schema = use('Schema');

class BidSchema extends Schema {
  up () {
    this.create('bids', (table) => {
      table.increments();
      table.float('proposedPrice').notNullable();
      table.integer('user_id').unsigned().references('id').inTable('users');
      table.integer('lot_id').unsigned().references('id').inTable('lots');

      table.timestamps();
    })
  }

  down () {
    this.drop('bids')
  }
}

module.exports = BidSchema;
