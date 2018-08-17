'use strict'
const BaseValidator = use('App/Validators/BaseValidator')

class Lot extends BaseValidator {
  get rules () {
    return {
      title: 'required',
      currentPrice: 'required',
      estimatedPrice: 'required',
      startTime:
        [
          this.rule('required'),
          this.rule('dateFormat', 'YYYY-MM-DD HH:mm:ss')
        ],
      endTime: [
        this.rule('required'),
        this.rule('dateFormat', 'YYYY-MM-DD HH:mm:ss')
      ]
    }
  }
}

module.exports = Lot
