'use strict'
const User = use('App/Models/User')
const UserPrivateSerializer = use('App/ResponseSerializers/User/UserPrivateSerializer')

class RegistrationController {
  async store ({request, response}) {
    const newUser = await User.create(this.registrationParams(request))
    // eslint-disable-next-line spaced-comment
    //TODO: add secure serializer
    response.send(UserPrivateSerializer.serialize(newUser.toJSON()))
  }

  registrationParams (request) {
    return request.only(['username', 'email', 'password', 'lastName', 'firstName'])
  }
}

module.exports = RegistrationController
