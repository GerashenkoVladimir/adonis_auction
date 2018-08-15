'use strict'

const JSONAPISerializer = require('jsonapi-serializer').Serializer

const UserPrivateSerializer = new JSONAPISerializer('userPrivate', {
  attributes: ['firstName', 'lastName']
})

module.exports = UserPrivateSerializer
