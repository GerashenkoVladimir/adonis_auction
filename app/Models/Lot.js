'use strict'

const kue = require('kue')
const moment = require('moment')
const Model = use('Model')
const jobs = kue.createQueue()

class Lot extends Model {
  static boot () {
    super.boot()

    this.addHook('beforeCreate', async (lot) => {
      lot.status = 'pending'
    })

    this.addHook('afterSave', async (lot) => {
      if (!Lot.skipHookForList.afterSave.includes(lot.id)) {
        Lot.skipHookForList.afterSave.push(lot.id)
        Lot.publishLot(lot)
      } else {
        const index = Lot.skipHookForList.afterSave.indexOf(lot.id)
        Lot.skipHookForList.afterSave.splice(index, 1)
      }
    })
  }

  static publishLot (lot) {
    const publish = jobs.create(`processLot_${lot.id}`, {
      title: `Lot with ${lot.id} in process`,
      lot_id: lot.id,
      startTime: lot.startTime
    })
      .delay(moment(lot.startTime).toDate())
      .save()

    publish.on('error', function (error) {
      console.log('error', error)
    })

    jobs.process(`processLot_${lot.id}`, 1, ({data}, done) => {
      Lot.find(data.lot_id).then(result => {
        if (result) {
          result.status = 'inProcess'
          result.save()
        }
        done()
      }).catch(error => console.log(error))
    })
  }

  isStatusUpdated () {

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

Lot.skipHookForList = {
  afterSave: []
}

module.exports = Lot
