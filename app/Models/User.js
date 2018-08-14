'use strict'

const Model = use('Model')

class User extends Model {
  lots () {
    return this.hasMany('App/Models/Lot')
  }

  bids () {
    return this.hasMany('App/Models/Bid')
  }

  orders () {
    return this.hasMany('App/Models/Order')
  }
}

module.exports = User
