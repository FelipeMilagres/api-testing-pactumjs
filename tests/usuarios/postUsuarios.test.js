const { expect } = require("pactum")
const { usersData } = require("../../data/users.data")
const usersRequest = require("../../requests/usuarios/usuarios.request")
const { urls } = require("../../data/urls.data")
const { postCreateUserSchema } = require("../../schemas/usuarios/postCreateUser.schema")

describe('Testes da API - POST /usuarios', () => {

    let response

    beforeEach('Reseta o body para gerar um novo usuário randômico', () => {
        usersData.post.resetBody()
    })

    it('Validar o cadastro de usuário com sucesso', async () => {
        response = await usersRequest.postCreateUser(usersData.post)
        expect(response).to.have.status(201)
        expect(response).to.have.jsonLike({
            message: 'Cadastro realizado com sucesso',
            _id: /^[a-zA-Z0-9]+$/
        })
        expect(response).to.have.jsonSchema(postCreateUserSchema.created)
        expect(response).to.have.responseTimeLessThan(500)
    })

    it('Validar o cadastro do campo "nome" vazio', async () => {
        usersData.post.templateValues = {
            '@OVERRIDES@': {
                "nome": ""
            }
        }
        response = await usersRequest.postCreateUser(usersData.post)
        expect(response).to.have.status(400)
        expect(response).to.have.jsonLike({ nome: 'nome não pode ficar em branco' })
        expect(response).to.have.jsonSchema(postCreateUserSchema.badRequest.name)
        expect(response).to.have.responseTimeLessThan(500)
    })

    it('Validar o tipo esperado do campo "nome"', async () => {
        usersData.post.templateValues = {
            '@OVERRIDES@': {
                "nome": true
            }
        }
        response = await usersRequest.postCreateUser(usersData.post)
        expect(response).to.have.status(400)
        expect(response).to.have.jsonLike({ nome: 'nome deve ser uma string' })
        expect(response).to.have.jsonSchema(postCreateUserSchema.badRequest.name)
        expect(response).to.have.responseTimeLessThan(500)
    })

    it('Validar a obrigatóriedade do campo "nome" no body', async () => {
        usersData.post.templateValues = {
            '@REMOVES@': ["nome"]
        }
        response = await usersRequest.postCreateUser(usersData.post)
        expect(response).to.have.status(400)
        expect(response).to.have.jsonLike({ nome: 'nome é obrigatório' })
        expect(response).to.have.jsonSchema(postCreateUserSchema.badRequest.name)
        expect(response).to.have.responseTimeLessThan(500)
    })

    it('Validar o cadastro do campo "email" vazio', async () => {
        usersData.post.templateValues = {
            '@OVERRIDES@': {
                "email": ""
            }
        }
        response = await usersRequest.postCreateUser(usersData.post)
        expect(response).to.have.status(400)
        expect(response).to.have.jsonLike({ email: 'email não pode ficar em branco' })
        expect(response).to.have.jsonSchema(postCreateUserSchema.badRequest.email)
        expect(response).to.have.responseTimeLessThan(500)
    })

    it('Validar o tipo esperado do campo "email"', async () => {
        usersData.post.templateValues = {
            '@OVERRIDES@': {
                "email": true
            }
        }
        response = await usersRequest.postCreateUser(usersData.post)
        expect(response).to.have.status(400)
        expect(response).to.have.jsonLike({ email: 'email deve ser uma string' })
        expect(response).to.have.jsonSchema(postCreateUserSchema.badRequest.email)
        expect(response).to.have.responseTimeLessThan(500)
    })

    it('Validar a obrigatóriedade do campo "email" no body', async () => {
        usersData.post.templateValues = {
            '@REMOVES@': ["email"]
        }
        response = await usersRequest.postCreateUser(usersData.post)
        expect(response).to.have.status(400)
        expect(response).to.have.jsonLike({ email: 'email é obrigatório' })
        expect(response).to.have.jsonSchema(postCreateUserSchema.badRequest.email)
        expect(response).to.have.responseTimeLessThan(500)
    })

    it('Validar o cadastro do campo "password" vazio', async () => {
        usersData.post.templateValues = {
            '@OVERRIDES@': {
                "password": ""
            }
        }
        response = await usersRequest.postCreateUser(usersData.post)
        expect(response).to.have.status(400)
        expect(response).to.have.jsonLike({ password: 'password não pode ficar em branco' })
        expect(response).to.have.jsonSchema(postCreateUserSchema.badRequest.password)
        expect(response).to.have.responseTimeLessThan(500)
    })

    it('Validar o tipo esperado do campo "password"', async () => {
        usersData.post.templateValues = {
            '@OVERRIDES@': {
                "password": true
            }
        }
        response = await usersRequest.postCreateUser(usersData.post)
        expect(response).to.have.status(400)
        expect(response).to.have.jsonLike({ password: 'password deve ser uma string' })
        expect(response).to.have.jsonSchema(postCreateUserSchema.badRequest.password)
        expect(response).to.have.responseTimeLessThan(500)
    })

    it('Validar a obrigatóriedade do campo "password" no body', async () => {
        usersData.post.templateValues = {
            '@REMOVES@': ["password"]
        }
        response = await usersRequest.postCreateUser(usersData.post)
        expect(response).to.have.status(400)
        expect(response).to.have.jsonLike({ password: 'password é obrigatório' })
        expect(response).to.have.jsonSchema(postCreateUserSchema.badRequest.password)
        expect(response).to.have.responseTimeLessThan(500)
    })

    it('Validar o cadastro do campo "administrador" vazio', async () => {
        usersData.post.templateValues = {
            '@OVERRIDES@': {
                "administrador": ""
            }
        }
        response = await usersRequest.postCreateUser(usersData.post)
        expect(response).to.have.status(400)
        expect(response).to.have.jsonLike({ administrador: "administrador deve ser 'true' ou 'false'" })
        expect(response).to.have.jsonSchema(postCreateUserSchema.badRequest.administrator)
        expect(response).to.have.responseTimeLessThan(500)
    })

    it('Validar o tipo esperado do campo "administrador"', async () => {
        usersData.post.templateValues = {
            '@OVERRIDES@': {
                "administrador": true
            }
        }
        response = await usersRequest.postCreateUser(usersData.post)
        expect(response).to.have.status(400)
        expect(response).to.have.jsonLike({ administrador: "administrador deve ser 'true' ou 'false'" })
        expect(response).to.have.jsonSchema(postCreateUserSchema.badRequest.administrator)
        expect(response).to.have.responseTimeLessThan(500)
    })

    it('Validar a obrigatóriedade do campo "administrador" no body', async () => {
        usersData.post.templateValues = {
            '@REMOVES@': ["administrador"]
        }
        response = await usersRequest.postCreateUser(usersData.post)
        expect(response).to.have.status(400)
        expect(response).to.have.jsonLike({ administrador: 'administrador é obrigatório' })
        expect(response).to.have.jsonSchema(postCreateUserSchema.badRequest.administrator)
        expect(response).to.have.responseTimeLessThan(500)
    })

    it('Validar o cadastro de usuário com e-mail já registrado', async () => {
        usersData.post.templateValues = {
            '@OVERRIDES@': {
                "email": "teste@teste.com"
            }
        }
        response = await usersRequest.postCreateUser(usersData.post)
        expect(response).to.have.status(400)
        expect(response).to.have.jsonLike({ message: "Este email já está sendo usado" })
        expect(response).to.have.jsonSchema(postCreateUserSchema.badRequest.message)
        expect(response).to.have.responseTimeLessThan(500)
    })

    it('Validar chamada de método inexistente', async () => {
        response = await usersRequest.patch(urls.users, usersData.post)
        expect(response).to.have.status(405)
        expect(response).to.have.jsonLike({ message: 'Não é possível realizar PATCH em /usuarios. Acesse https://serverest.dev para ver as rotas disponíveis e como utilizá-las.' })
        expect(response).to.have.jsonSchema(postCreateUserSchema.badRequest.message)
        expect(response).to.have.responseTimeLessThan(500)
    })
})