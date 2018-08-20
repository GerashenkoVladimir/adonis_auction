'use strict'

const { Serializer: JSONAPISerializer } = require('jsonapi-serializer')

const LotPrivateSerializer = new JSONAPISerializer('lotPrivate', {
  attributes: [
    'title', 'image', 'description', 'status', 'currentPrice',
    'estimatedPrice', 'startTime', 'endTime'
  ]
})

module.exports = LotPrivateSerializer
