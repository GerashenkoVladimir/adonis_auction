'use strict';

const Schema = use('Schema');

class OrderSchema extends Schema {
  up () {
    this.create('orders', (table) => {
      table.increments();
      table.string('arrivalLocation').notNullable();
      table.enu('arrivalType', ['royalMail', 'usps', 'dhlExpress']).notNullable();
      table.enu('status', ['pending', 'send', 'delivered']).notNullable();
      table.integer('user_id').unsigned().references('id').inTable('users');
      table.integer('lot_id').unsigned().references('id').inTable('lots');
      table.timestamps();
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrderSchema;
