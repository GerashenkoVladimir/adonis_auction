'use strict'

const UserPrivateSerializer = use('App/ResponseSerializers/User/UserPrivateSerializer')
const User = use('App/Models/User')

class SessionController {
  async signIn ({ request, auth, response }) {
    const { email, password } = request.all()
    const jwtObj = await auth.withRefreshToken().attempt(email, password)

    Object.keys(jwtObj).forEach(key => response.header(key, jwtObj[key]))

    const user = await User.findBy({email: email})

    response.send(UserPrivateSerializer.serialize(user.toJSON()))
  }
}

module.exports = SessionController
