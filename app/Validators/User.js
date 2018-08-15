'use strict'

const BaseValidator = use('App/Validators/BaseValidator')

class User extends BaseValidator {
  get rules () {
    return {
      username: 'required',
      firstName: 'required',
      lastName: 'required',
      email: 'required|email',
      password: 'required|confirmed'
    }
  }
}

module.exports = User
