const { expect } = require("pactum")
const { usersData } = require("../../data/users.data")
const usersRequest = require("../../requests/usuarios/usuarios.request")

describe('Testes da API - GET/usuarios', () => {

    it('Validar consulta de usuários', async () => {
        const response = await usersRequest.getListRegisteredUsers(usersData.get)
        expect(response).to.have.status(200)
        expect(response).to.have.bodyContains('quantidade')
        expect(response).to.have.bodyContains('usuarios')
    })
})