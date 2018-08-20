'use strict'

const moment = require('moment')

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

const Factory = use('Factory')

Factory.blueprint('App/Models/User', (faker) => {
  return {
    username: faker.username(),
    email: faker.email(),
    firstName: faker.first(),
    lastName: faker.last(),
    password: '12345678'
  }
})

Factory.blueprint('App/Models/Lot', (faker, i, data) => {
  return {
    user_id: data.user_id || null,
    title: data.title || faker.word(),
    currentPrice: data.currentPrice || faker.integer({ min: 10, max: 20 }),
    estimatedPrice: data.estimatedPrice || faker.integer({ min: 50, max: 100 }),
    startTime: data.startTime || moment().add(5, 'days'),
    endTime: data.endTime || moment().add(20, 'days'),
    description: data.description || faker.paragraph(),
    image: data.image || 'some image'
  }
})
