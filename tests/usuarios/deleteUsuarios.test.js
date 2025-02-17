const { expect } = require("pactum")
const { usersData } = require("../../data/users.data")
const usersRequest = require("../../requests/usuarios/usuarios.request")
const { deleteUserSchema } = require("../../schemas/usuarios/deleteUser.schema")

describe('Testes da API - DELETE /usuarios/{_id}', () => {

    let responseCreateuser, response

    beforeEach('Cadastrar usuário', async () => {
        responseCreateuser = await usersRequest.postCreateUser(usersData.post)
        usersData.post.resetBody()
    })

    describe('@Usuarios-health - Health Check', () => {
        it('Validar a saúde da API', async () => {
            response = await usersRequest.deleteUser(responseCreateuser.body._id, usersData.delete)
            expect(response).to.have.status(200)
        })
    })

    describe('@Usuarios-regras - Fluxo Operacional', () => {
        it('Validar a exclusão do usuário com sucesso', async () => {
            response = await usersRequest.deleteUser(responseCreateuser.body._id, usersData.delete)
            expect(response).to.have.status(200)
            expect(response).to.have.jsonLike({
                message: "Registro excluído com sucesso"
            })
            expect(response).to.have.jsonSchema(deleteUserSchema.ok)
            expect(response).to.have.responseTimeLessThan(1000)
        })
    })

    describe('@Usuarios-excecoes - Cobertura de exceções', () => {
        it('Validar a exlusão de cadastro de usuário inexistente', async () => {
            response = await usersRequest.deleteUser('NCnPcucqzdMLOEWG', usersData.delete)
            expect(response).to.have.status(200)
            expect(response).to.have.jsonLike({
                message: "Nenhum registro excluído"
            })
            expect(response).to.have.jsonSchema(deleteUserSchema.ok)
            expect(response).to.have.responseTimeLessThan(1000)
        })

        it('Validar exclusão de cadastro de usuário sem passar o id', async () => {
            response = await usersRequest.deleteUser('', usersData.delete)
            expect(response).to.have.status(405)
            expect(response).to.have.jsonLike({
                message: "Não é possível realizar DELETE em /usuarios/. Acesse https://serverest.dev para ver as rotas disponíveis e como utilizá-las."
            })
            expect(response).to.have.jsonSchema(deleteUserSchema.ok)
            expect(response).to.have.responseTimeLessThan(1000)
        })

        it('Validar exclusão de cadastro de usuário com carrinho cadastrado', async () => {
            response = await usersRequest.deleteUser('0uxuPY0cbmQhpEz1', usersData.delete)
            expect(response).to.have.status(400)
            expect(response).to.have.jsonLike({
                message: "Não é permitido excluir usuário com carrinho cadastrado",
                idCarrinho: /^[a-zA-Z0-9]+$/
            })
            expect(response).to.have.jsonSchema(deleteUserSchema.badRequest)
            expect(response).to.have.responseTimeLessThan(1000)
        })
    })
})