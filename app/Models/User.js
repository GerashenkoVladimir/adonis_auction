'use strict'

const Model = use('Model')
const Hash = use('Hash')

class User extends Model {
  static boot () {
    super.boot()
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  static get hidden () {
    return ['password']
  }

  lots () {
    return this.hasMany('App/Models/Lot')
  }

  bids () {
    return this.hasMany('App/Models/Bid')
  }

  orders () {
    return this.hasMany('App/Models/Order')
  }

  tokens () {
    return this.hasMany('App/Models/Token')
  }
}

module.exports = User
