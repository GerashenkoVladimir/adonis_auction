'use strict'

const BaseValidator = use('App/Validators/BaseValidator')

class SignIn extends BaseValidator {
  get rules () {
    return {
      email: 'required|email',
      password: 'required'
    }
  }
}

module.exports = SignIn
