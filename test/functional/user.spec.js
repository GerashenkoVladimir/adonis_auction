const {test, trait} = use('Test/Suite')('User')
const User = use('App/Models/User')
const chai = require('chai')

chai.use(require('chai-change'))

trait('DatabaseTransactions')

test('User.create', async ({assert}) => {
  await User.create({
    firstName: 'john',
    lastName: 'Doe',
    email: 'john_doe@example.com',
    password: '12345678'
  })

  assert.equal(await User.getCount(), 1)
})