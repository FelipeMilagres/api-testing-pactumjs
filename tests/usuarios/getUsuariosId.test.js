const { expect } = require("pactum")
const { usersData } = require("../../data/users.data")
const usersRequest = require("../../requests/usuarios/usuarios.request")
const { getSearchUserByIdSchema } = require("../../schemas/usuarios/getSearchUserById.schema")
const { urls } = require("../../data/urls.data")

describe('Testes da API - GET /usuarios/{_id}', () => {

    let response

    beforeEach('Reseta o body para gerar um novo usuário randômico', () => {
        usersData.post.resetBody()
    })

    describe('@Usuarios-health - Health Check', () => {
        it('Validar a saúde da API', async () => {
            const user = usersData.post
            let userBody = user.body

            const reponseCreateuser = await usersRequest.postCreateUser(user)
            response = await usersRequest.getSearchUserById(reponseCreateuser.body._id, usersData.get)
            userBody._id = reponseCreateuser.body._id
            expect(response).to.have.status(200)
        })
    })

    describe('@Usuarios-regras - Fluxo Operacional', () => {
        it('Validar a consulta de usuário existente com sucesso', async () => {
            const user = usersData.post
            let userBody = user.body

            const reponseCreateuser = await usersRequest.postCreateUser(user)
            response = await usersRequest.getSearchUserById(reponseCreateuser.body._id, usersData.get)
            userBody._id = reponseCreateuser.body._id
            expect(response).to.have.status(200)
            expect(response).to.have.jsonLike(user.body)
            expect(response).to.have.jsonSchema(getSearchUserByIdSchema.ok)
            expect(response).to.have.responseTimeLessThan(1000)
        })
    })

    describe('@Usuarios-excecoes - Cobertura de exceções', () => {
        it('Validar a consulta de id inexistente', async () => {
            response = await usersRequest.getSearchUserById('NCnPcucqzdMLOEWG', usersData.get)
            expect(response).to.have.status(400)
            expect(response).to.have.jsonLike({ message: "Usuário não encontrado" })
            expect(response).to.have.jsonSchema(getSearchUserByIdSchema.badRequest.message)
            expect(response).to.have.responseTimeLessThan(1000)
        })

        it('Validar chamada de método inexistente', async () => {
            response = await usersRequest.patch(`${urls.users}/NCnPcucqzdMLOEWG`, usersData.get)
            expect(response).to.have.status(405)
            expect(response).to.have.jsonLike({ message: "Não é possível realizar PATCH em /usuarios/NCnPcucqzdMLOEWG. Acesse https://serverest.dev para ver as rotas disponíveis e como utilizá-las." })
            expect(response).to.have.jsonSchema(getSearchUserByIdSchema.badRequest.message)
            expect(response).to.have.responseTimeLessThan(1000)
        })
    })
})