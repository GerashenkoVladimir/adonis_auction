'use strict'

const Lot = use('App/Models/Lot')

const LotPrivateSerializer = use('App/ResponseSerializers/Lot/LotPrivateSerializer')
const LotPublicSerializer = use('App/ResponseSerializers/Lot/LotPublicSerializer')

class LotsController {
  async store ({request, auth, response}) {
    const user = auth.user
    const newLot = await Lot.create({...LotsController.lotParams(request), user_id: user.id})

    response.send(LotPrivateSerializer.serialize(newLot.toJSON()))
  }

  async show ({params, auth, response}) {
    const lot = await Lot.findOrFail(params.id)
    if (lot.user_id === auth.user.id) {
      response.send(LotPrivateSerializer.serialize(lot.toJSON()))
    } else {
      response.send(LotPublicSerializer.serialize(lot.toJSON()))
    }
  }

  async update ({params, request, auth, response}) {
    const lot = await Lot.findByOrFail({
      user_id: auth.user.id,
      id: params.id
    })

    lot.merge(LotsController.lotParams(request))
    await lot.save()

    response.send(LotPrivateSerializer.serialize(lot.toJSON()))
  }

  async destroy ({params, auth, response}) {
    const lot = await Lot.findByOrFail({
      user_id: auth.user.id,
      id: params.id
    })
    await lot.delete()
    response.send({status: 'ok'})
  }

  async index ({auth, response}) {
    const lots = await auth.user.lots().fetch()
    response.send(LotPrivateSerializer.serialize(lots.toJSON()))
  }

  /**
   * @access private
   * @param request
   */
  static lotParams (request) {
    return request.only(['title', 'image', 'description', 'currentPrice', 'estimatedPrice', 'startTime', 'endTime'])
  }
}

module.exports = LotsController
