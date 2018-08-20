'use strict'

const JSONAPISerializer = require('jsonapi-serializer').Serializer

const LotPublicSerializer = new JSONAPISerializer('lotPublic', {
  attributes: ['title', 'image', 'description', 'currentPrice', 'estimatedPrice', 'endTime']
})

module.exports = LotPublicSerializer
