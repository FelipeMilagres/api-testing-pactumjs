const { spec, expect, stash } = require('pactum')
const { createRandomUser } = require('../data/users.data')
const { baseUrl } = require('../data/urls.data')

describe('Testes da API - POST/Usuarios', () => {

    let response, idUser

    stash.addDataTemplate({
        'User': createRandomUser()
    })

    it('Validar o cadastro de usuário com sucesso', async () => {
        response = await spec()
            .post(`${baseUrl}/usuarios`)
            .withHeaders('Content-Type', 'application/json')
            .withJson(
                { '@DATA:TEMPLATE@': 'User' }
            )
        idUser = response.body._id
        expect(response).to.have.status(201)
        expect(response).to.have.jsonLike({ message: 'Cadastro realizado com sucesso' })
        expect(response).to.have.bodyContains('id')
    })

    it('Validar o cadastro campo nome vazio', async () => {
        response = await spec()
            .post(`${baseUrl}/usuarios`)
            .withHeaders('Content-Type', 'application/json')
            .withJson({
                '@DATA:TEMPLATE@': 'User', '@OVERRIDES@': { "nome": "" }
            })

        expect(response).to.have.status(400)
        expect(response).to.have.bodyContains('nome')
        expect(response).to.have.bodyContains('nome não pode ficar em branco')
    })

    it('Validar a tipagem do campo nome', async () => {
        response = await spec()
            .post(`${baseUrl}/usuarios`)
            .withHeaders('Content-Type', 'application/json')
            .withJson({
                '@DATA:TEMPLATE@': 'User', '@OVERRIDES@': { "nome": true }
            })

        expect(response).to.have.status(400)
        expect(response).to.have.bodyContains('nome')
        expect(response).to.have.bodyContains('nome deve ser uma string')
    })

    it('Validar a obrigatóriedade do campo nome', async () => {
        response = await spec()
            .post(`${baseUrl}/usuarios`)
            .withHeaders('Content-Type', 'application/json')
            .withJson({
                '@DATA:TEMPLATE@': 'User', '@REMOVES@': ["nome"]
            })
        expect(response).to.have.status(400)
        expect(response).to.have.bodyContains('nome')
        expect(response).to.have.bodyContains('nome é obrigatório')
    })

    it('Validar o cadastro campo email vazio', async () => {
        response = await spec()
            .post(`${baseUrl}/usuarios`)
            .withHeaders('Content-Type', 'application/json')
            .withJson({
                '@DATA:TEMPLATE@': 'User', '@OVERRIDES@': { "email": "" }
            })
        expect(response).to.have.status(400)
        expect(response).to.have.bodyContains('email')
        expect(response).to.have.bodyContains('email não pode ficar em branco')
    })

    it('Validar a tipagem do campo email', async () => {
        response = await spec()
            .post(`${baseUrl}/usuarios`)
            .withHeaders('Content-Type', 'application/json')
            .withJson({
                '@DATA:TEMPLATE@': 'User', '@OVERRIDES@': { "email": true }
            })
        expect(response).to.have.status(400)
        expect(response).to.have.bodyContains('email')
        expect(response).to.have.bodyContains('email deve ser uma string')
    })

    it('Validar a obrigatóriedade do campo email', async () => {
        response = await spec()
            .post(`${baseUrl}/usuarios`)
            .withHeaders('Content-Type', 'application/json')
            .withJson({
                '@DATA:TEMPLATE@': 'User', '@REMOVES@': ["email"]
            })

        expect(response).to.have.status(400)
        expect(response).to.have.bodyContains('email')
        expect(response).to.have.bodyContains('email é obrigatório')
    })

    it('Validar o cadastro campo password vazio', async () => {
        response = await spec()
            .post(`${baseUrl}/usuarios`)
            .withHeaders('Content-Type', 'application/json')
            .withJson({
                '@DATA:TEMPLATE@': 'User', '@OVERRIDES@': { "password": "" }
            })

        expect(response).to.have.status(400)
        expect(response).to.have.bodyContains('password')
        expect(response).to.have.bodyContains('password não pode ficar em branco')
    })

    it('Validar a tipagem do campo password', async () => {
        response = await spec()
            .post(`${baseUrl}/usuarios`)
            .withHeaders('Content-Type', 'application/json')
            .withJson({
                '@DATA:TEMPLATE@': 'User', '@OVERRIDES@': { "password": true }
            })

        expect(response).to.have.status(400)
        expect(response).to.have.bodyContains('password')
        expect(response).to.have.bodyContains('password deve ser uma string')
    })

    it('Validar a obrigatóriedade do campo password', async () => {
        response = await spec()
            .post(`${baseUrl}/usuarios`)
            .withHeaders('Content-Type', 'application/json')
            .withJson({
                '@DATA:TEMPLATE@': 'User', '@REMOVES@': ["password"]
            })

        expect(response).to.have.status(400)
        expect(response).to.have.bodyContains('password')
        expect(response).to.have.bodyContains('password é obrigatório')
    })

    it('Validar o cadastro campo administrador vazio', async () => {
        response = await spec()
            .post(`${baseUrl}/usuarios`)
            .withHeaders('Content-Type', 'application/json')
            .withJson({
                '@DATA:TEMPLATE@': 'User', '@OVERRIDES@': { "administrador": "" }
            })

        expect(response).to.have.status(400)
        expect(response).to.have.bodyContains('administrador')
        expect(response).to.have.bodyContains("administrador deve ser 'true' ou 'false'")
    })

    it('Validar a tipagem do campo administrador', async () => {
        response = await spec()
            .post(`${baseUrl}/usuarios`)
            .withHeaders('Content-Type', 'application/json')
            .withJson({
                '@DATA:TEMPLATE@': 'User', '@OVERRIDES@': { "administrador": "5" }
            })

        expect(response).to.have.status(400)
        expect(response).to.have.bodyContains('administrador')
        expect(response).to.have.bodyContains("administrador deve ser 'true' ou 'false'")
    })

    it('Validar a obrigatóriedade do campo administrador', async () => {
        response = await spec()
            .post(`${baseUrl}/usuarios`)
            .withHeaders('Content-Type', 'application/json')
            .withJson({
                '@DATA:TEMPLATE@': 'User', '@REMOVES@': ["administrador"]
            })

        expect(response).to.have.status(400)
        expect(response).to.have.bodyContains('administrador')
        expect(response).to.have.bodyContains('administrador é obrigatório')
    })

    after('Excluir usuário cadastrado no teste', async () => {
        response = await spec()
            .delete(`${baseUrl}/usuarios/${idUser}`)
            .withHeaders('Content-Type', 'application/json')

        expect(response).to.have.status(200)
        expect(response).to.have.bodyContains('Registro excluído com sucesso')
    })
})