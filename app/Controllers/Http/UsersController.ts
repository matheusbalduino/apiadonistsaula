import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Address from 'App/Models/Address'
import Card from 'App/Models/Card'
import Contact from 'App/Models/Contact'

import User from 'App/Models/User'

export default class UsersController {
  public async index({ response }: HttpContextContract) {
    const users = await User.all()

    return response.send(users)
  }

  public async store({ request, response }: HttpContextContract) {
    const body = request.only(['username', 'password', 'firstName', 'lastName', 'email'])

    console.log('body', body)

    const users = await User.create(body)

    return response.send({ User: { ...users.toJSON() } })
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({ request, response, params }: HttpContextContract) {
    const { id } = params

    const payload = request.all()

    const address = new Address()
    const contacts = new Contact()
    const cards = new Card()

    const user = await User.findByOrFail('id', id)

    if (payload.address) {
      address.street = payload.address.street
      address.number = payload.address.number
      address.complement = payload.address.complement
      address.neighborhood = payload.address.neighborhood
      address.zip_code = payload.address.zip_code
      address.state = payload.address.state
      address.country = payload.address.country
      address.description = payload.address.description

      await user.related('address').save(address)
    }

    if (payload.contacts) {
      console.log('contacts works fine')
      contacts.type = payload.contacts.type
      contacts.ddd = payload.contacts.ddd
      contacts.number = payload.contacts.number

      await user.related('contact').save(contacts)
    }

    if (payload.cards) {
      console.log('cards works fine')
      cards.card_holder_name = payload.cards.card_holder_name
      cards.card_holder_document = payload.cards.card_holder_document
      cards.card_holder_agency = payload.cards.card_holder_agency
      cards.card_holder_account = payload.cards.card_holder_account
      cards.card_holder_number = payload.cards.card_holder_number
      cards.card_holder_security_number = payload.cards.card_holder_security_number

      await user.related('card').save(cards)
    }

    await this.loadRelations(user)

    response.send(user)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params

    try {
      const user = await User.findByOrFail('id', id)

      user.delete()

      response.status(201).send('Usuário Removido com Sucesso')
    } catch (error) {
      response.status(400).send('Não foi possivel completar a requisição')
    }
  }

  public async loadRelations(user) {
    await user.load('address')
    await user.load('contact')
    await user.load('card')
  }
}
