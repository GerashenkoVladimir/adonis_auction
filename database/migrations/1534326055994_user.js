'use strict'

const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.alter('users', table => {
      table.string('username', 80).notNullable().unique()
    })
  }

  down () {
    this.alter('users', table => {
      table.dropColumn('username')
    })
  }
}

module.exports = UserSchema
