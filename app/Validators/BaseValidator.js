'use strict'

class BaseValidator {
  async fails (errorMessages) {
    return this.ctx.response.status(422).send({errors: errorMessages})
  }

  get validateAll () {
    return true
  }
}

module.exports = BaseValidator
