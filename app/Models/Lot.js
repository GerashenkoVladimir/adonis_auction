'use strict'

const Model = use('Model')

class Lot extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }

  bids () {
    return this.hasMany('App/Models/Bid')
  }
}

module.exports = Lot
