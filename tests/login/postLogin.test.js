const { expect } = require("pactum")
const { usersData } = require("../../data/users.data")
const usersRequest = require("../../requests/usuarios/usuarios.request")
const loginRequest = require("../../requests/login/login.request")
const { loginData } = require("../../data/login.data")
const { postLoginSchema } = require("../../schemas/login/postLogin.schema")

describe('@teste Testes da API - POST /login', () => {

    let userData, responseCreateuser, response

    beforeEach('Cadastrar usuário', async () => {
        const userBody = usersData.post
        userData = usersData.post.body
        responseCreateuser = await usersRequest.postCreateUser(userBody)
        usersData.post.resetBody()
    })

    describe('@Login-health - Health Check', () => {
        it('Validar a saúde da API', async () => {
            loginData.post.templateValues = {
                '@OVERRIDES@': {
                    "email": userData.email,
                    "password": userData.password
                }
            }
            response = await loginRequest.postLogin(loginData.post)
            expect(response).to.have.status(200)
        })
    })

    describe('@Login-regras - Fluxo Operacional', () => {
        it('Validar o login do usuário com sucesso', async () => {
            loginData.post.templateValues = {
                '@OVERRIDES@': {
                    "email": userData.email,
                    "password": userData.password
                }
            }
            response = await loginRequest.postLogin(loginData.post)
            expect(response).to.have.status(200)
            expect(response).to.have.jsonLike({
                message: 'Login realizado com sucesso',
                authorization: /^Bearer\s[\w-]+\.[\w-]+\.[\w-]+$/
            })
            expect(response).to.have.jsonSchema(postLoginSchema.ok)
            expect(response).to.have.responseTimeLessThan(500)
        })
    })

    describe('@Login-excecoes - Cobertura de exceções', () => {
        it('Validar o campo "email" vazio no login', async () => {
            loginData.post.templateValues = {
                '@OVERRIDES@': {
                    "password": userData.password
                }
            }
            response = await loginRequest.postLogin(loginData.post)
            expect(response).to.have.status(400)
            expect(response).to.have.jsonLike({
                email: "email não pode ficar em branco"
            })
            expect(response).to.have.jsonSchema(postLoginSchema.badRequest)
            expect(response).to.have.responseTimeLessThan(500)
        })

        it('Validar no login um email inválido no campo "email"', async () => {
            loginData.post.templateValues = {
                '@OVERRIDES@': {
                    "email": "teste",
                    "password": userData.password
                }
            }
            response = await loginRequest.postLogin(loginData.post)
            expect(response).to.have.status(400)
            expect(response).to.have.jsonLike({
                email: "email deve ser um email válido"
            })
            expect(response).to.have.jsonSchema(postLoginSchema.badRequest)
            expect(response).to.have.responseTimeLessThan(500)
        })

        it('Validar o tipo esperado do campo "email" no login', async () => {
            loginData.post.templateValues = {
                '@OVERRIDES@': {
                    "email": true,
                    "password": userData.password
                }
            }
            response = await loginRequest.postLogin(loginData.post)
            expect(response).to.have.status(400)
            expect(response).to.have.jsonLike({
                email: "email deve ser uma string"
            })
            expect(response).to.have.jsonSchema(postLoginSchema.badRequest)
            expect(response).to.have.responseTimeLessThan(500)
        })

        it('Validar que o campo "email" é obrigatório no login', async () => {
            loginData.post.templateValues = {
                '@REMOVES@': ["email"],
                '@OVERRIDES@': {
                    "password": userData.password
                }
            }
            response = await loginRequest.postLogin(loginData.post)
            expect(response).to.have.status(400)
            expect(response).to.have.jsonLike({
                email: "email é obrigatório"
            })
            expect(response).to.have.jsonSchema(postLoginSchema.badRequest)
            expect(response).to.have.responseTimeLessThan(500)
        })

        it('Validar o campo "password" vazio no login', async () => {
            loginData.post.templateValues = {
                '@OVERRIDES@': {
                    "email": userData.email
                }
            }
            response = await loginRequest.postLogin(loginData.post)
            expect(response).to.have.status(400)
            expect(response).to.have.jsonLike({
                password: "password não pode ficar em branco"
            })
            expect(response).to.have.jsonSchema(postLoginSchema.badRequest)
            expect(response).to.have.responseTimeLessThan(500)
        })

        it('Validar uma senha inválida no campo "password"', async () => {
            loginData.post.templateValues = {
                '@OVERRIDES@': {
                    "email": userData.email,
                    "password": "12345678"
                }
            }
            response = await loginRequest.postLogin(loginData.post)
            expect(response).to.have.status(401)
            expect(response).to.have.jsonLike({
                message: "Email e/ou senha inválidos"
            })
            expect(response).to.have.jsonSchema(postLoginSchema.badRequest)
            expect(response).to.have.responseTimeLessThan(500)
        })

        it('Validar o tipo esperado do campo "password" no login', async () => {
            loginData.post.templateValues = {
                '@OVERRIDES@': {
                    "email": userData.email,
                    "password": true
                }
            }
            response = await loginRequest.postLogin(loginData.post)
            expect(response).to.have.status(400)
            expect(response).to.have.jsonLike({
                password: "password deve ser uma string"
            })
            expect(response).to.have.jsonSchema(postLoginSchema.badRequest)
            expect(response).to.have.responseTimeLessThan(500)
        })

        it('Validar que o campo "password" é obrigatório no login', async () => {
            loginData.post.templateValues = {
                '@REMOVES@': ["password"],
                '@OVERRIDES@': {
                    "email": userData.email
                }
            }
            response = await loginRequest.postLogin(loginData.post)
            expect(response).to.have.status(400)
            expect(response).to.have.jsonLike({
                password: "password é obrigatório"
            })
            expect(response).to.have.jsonSchema(postLoginSchema.badRequest)
            expect(response).to.have.responseTimeLessThan(500)
        })

        it('Validar no login um "Content-Type" inválido', async () => {
            loginData.post.templateValues = {
                '@OVERRIDES@': {
                    "email": userData.email,
                    "password": userData.password,
                    "Content-Type": 'application/xml'
                }
            }
            response = await loginRequest.postLogin(loginData.post)
            expect(response).to.have.status(400)
            expect(response).to.have.jsonLike({
                "Content-Type": "Content-Type não é permitido"
            })
            expect(response).to.have.jsonSchema(postLoginSchema.badRequest)
            expect(response).to.have.responseTimeLessThan(500)
        })
    })
})