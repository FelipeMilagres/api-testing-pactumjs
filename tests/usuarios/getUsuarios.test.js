const { expect } = require("pactum")
const { usersData } = require("../../data/users.data")
const usersRequest = require("../../requests/usuarios/usuarios.request")
const { getListRegisteredUsersSchema } = require("../../schemas/usuarios/getListRegisteredUsers.schema")

describe('Testes da API - GET /usuarios', () => {

    it('Validar a consulta da lista de usuários com sucesso', async () => {
        const response = await usersRequest.getListRegisteredUsers(usersData.get)
        expect(response).to.have.status(200)
        expect(response).to.have.bodyContains('quantidade')
        expect(response).to.have.bodyContains('usuarios')
        expect(response).to.have.jsonSchema(getListRegisteredUsersSchema.ok)
        expect(response).to.have.responseTimeLessThan(1000)
    })
})