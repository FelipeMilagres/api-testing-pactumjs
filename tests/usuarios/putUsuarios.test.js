const { expect } = require("pactum")
const { usersData } = require("../../data/users.data")
const usersRequest = require("../../requests/usuarios/usuarios.request")
const { putEditUserSchema } = require("../../schemas/usuarios/putEditUser.schema")

describe('@Usuarios - Testes da API - PUT /usuarios/{_id}', () => {

    let responseCreateuser, response

    beforeEach('Cadastrar usuário', async () => {
        responseCreateuser = await usersRequest.postCreateUser(usersData.put)
    })

    describe('@Usuarios-health - Health Check', () => {
        it('Validar a saúde da API', async () => {
            response = await usersRequest.putEditUser(responseCreateuser.body._id, usersData.put)
            expect(response).to.have.status(200)
        })
    })

    describe('@Usuarios-regras - Fluxo Operacional', () => {
        it('Validar a alteração do registro do usuário com sucesso', async () => {
            response = await usersRequest.putEditUser(responseCreateuser.body._id, usersData.put)
            expect(response).to.have.status(200)
            expect(response).to.have.jsonLike({
                message: 'Registro alterado com sucesso'
            })
            expect(response).to.have.jsonSchema(putEditUserSchema.ok)
            expect(response).to.have.responseTimeLessThan(1000)
        })
    })
})