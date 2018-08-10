'use strict';

const Model = use('Model');

class Order extends Model {
  user() {
    return this.belongsTo('App/Models/User');
  }

  lot() {
    return this.belongsTo('App/Models/Lot')
  }
}

module.exports = Order;
