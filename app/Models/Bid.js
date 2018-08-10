'use strict';

const Model = use('Model');

class Bid extends Model {
  user(){
    return this.belongsTo('App/Models/User');
  }

  lot(){
    return this.belongsTo('App/Models/Lot');
  }

}

module.exports = Bid;
