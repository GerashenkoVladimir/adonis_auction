'use strict'

const JSONAPISerializer = require('jsonapi-serializer').Serializer

const LotPrivateSerializer = new JSONAPISerializer('lotPrivate', {
  attributes: ['title', 'image', 'description', 'status', 'currentPrice', 'estimatedPrice', 'startTime', 'endTime']
})

module.exports = LotPrivateSerializer
