const {serialized} = require('../../helpers/responseHelper')
const moment = require('moment')

const { test, trait } = use('Test/Suite')('LotsController')
const Lot = use('App/Models/Lot')

const Factory = use('Factory')
const LotPrivateSerializer = use('App/ResponseSerializers/Lot/LotPrivateSerializer')
const LotPublicSerializer = use('App/ResponseSerializers/Lot/LotPublicSerializer')

trait('DatabaseTransactions')
trait('Test/ApiClient')
trait('Auth/Client')

test('GET /lots/:id', async ({ client }) => {
  const lot = await Factory.model('App/Models/Lot').create()
  const user = await Factory.model('App/Models/User').create()

  const response = await client.get(`/api/lots/${lot.id}`).loginVia(user).end()

  response.assertStatus(200)
  response.assertJSONSubset(serialized(lot, LotPublicSerializer))
})

test('POST /lots', async ({ client, assert }) => {
  const user = await Factory.model('App/Models/User').create()

  assert.equal(await user.lots().getCount(), 0)
  const response = await client.post('/api/lots').send({
    title: 'some title',
    currentPrice: 10,
    estimatedPrice: 100,
    startTime: moment().add(5, 'days').format('YYYY-MM-DD HH:mm:ss'),
    endTime: moment().add(20, 'days').format('YYYY-MM-DD HH:mm:ss'),
    description: 'some description',
    image: null
  }).loginVia(user).end()

  assert.equal(await user.lots().getCount(), 1)
  const createdLot = await Lot.findBy({user_id: user.id})
  response.assertStatus(200)
  response.assertJSONSubset(serialized(createdLot, LotPrivateSerializer))
})

test('PUT /lots/:id', async ({ client, assert }) => {
  const oldData = {
    title: 'old title',
    currentPrice: 10,
    estimatedPrice: 100,
    startTime: moment().add(5, 'days').format('YYYY-MM-DD HH:mm:ss'),
    endTime: moment().add(20, 'days').format('YYYY-MM-DD HH:mm:ss'),
    description: 'old description',
    image: null
  }

  const newData = {
    title: 'new title',
    currentPrice: 30,
    estimatedPrice: 130,
    startTime: moment().add(10, 'days').format('YYYY-MM-DD HH:mm:ss'),
    endTime: moment().add(25, 'days').format('YYYY-MM-DD HH:mm:ss'),
    description: 'new description',
    image: null
  }

  const user = await Factory.model('App/Models/User').create()
  const oldLot = await Factory.model('App/Models/Lot').create({...oldData, user_id: user.id})

  const response = await client.put(`/api/lots/${oldLot.id}`).send(newData).loginVia(user).end()

  const updatedLot = await Lot.findBy({user_id: user.id})

  response.assertStatus(200)
  response.assertJSONSubset(serialized(updatedLot, LotPrivateSerializer))
})

test('DELETE /lots/:id', async ({ client, assert }) => {
  const user = await Factory.model('App/Models/User').create()
  let lot = await Factory.model('App/Models/Lot').create({user_id: user.id})

  assert.equal(await user.lots().getCount(), 1)
  const response = await client.delete(`/api/lots/${lot.id}`).loginVia(user).end()
  assert.equal(await user.lots().getCount(), 0)

  response.assertStatus(200)
  response.assertJSONSubset({status: 'ok'})
})

test('GET /lots', async ({ client, assert }) => {
  const user = await Factory.model('App/Models/User').create()
  await Factory.model('App/Models/Lot').createMany(10, {user_id: user.id})

  const response = await client.get('/api/lots').loginVia(user).end()

  response.assertStatus(200)
  response.assertJSONSubset(serialized(await user.lots().fetch(), LotPrivateSerializer))
})
