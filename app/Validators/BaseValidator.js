'use strict'
const { rule } = require('indicative')

class BaseValidator {
  async fails (errorMessages) {
    return this.ctx.response.status(422).send({errors: errorMessages})
  }

  get validateAll () {
    return true
  }

  rule (ruleName, rulePattern) {
    return rule(ruleName, rulePattern)
  }
}

module.exports = BaseValidator
