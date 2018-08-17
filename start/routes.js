'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.get('/', ({ request }) => {
  return { greeting: 'Hello world in JSON' }
})

Route.group(() => {
  Route.post('/', 'Auth/RegistrationController.store').validator('User')
  Route.post('/sign_in', 'Auth/SessionController.signIn')
    .validator('SignIn')
}).prefix('/api/auth')

Route.group(() => {
  Route.resource('lots', 'LotsController').validator(new Map([
    [['lots.store'], ['Lot']]
  ])).only(['store', 'show', 'update', 'destroy', 'index'])
}).prefix('/api').middleware('auth')
