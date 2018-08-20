'use strict'

const Model = use('Model')

class Lot extends Model {
  static boot () {
    super.boot()

    this.addHook('beforeSave', async (lot) => {
      lot.status = 'pending'
    })
  }

  static get dates () {
    return super.dates.concat(['endTime', 'startTime'])
  }

  user () {
    return this.belongsTo('App/Models/User')
  }

  bids () {
    return this.hasMany('App/Models/Bid')
  }
}

module.exports = Lot
