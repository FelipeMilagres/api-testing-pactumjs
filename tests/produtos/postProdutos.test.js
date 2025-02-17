const { expect } = require("pactum")
const usersRequest = require("../../requests/usuarios/usuarios.request")
const loginRequest = require("../../requests/login/login.request")
const productsRequest = require("../../requests/produtos/produtos.request")
const { usersData } = require("../../data/users.data")
const { loginData } = require("../../data/login.data")
const { productsData } = require("../../data/products.data")
const { postRegisterProductSchema } = require("../../schemas/produtos/postRegisterProduct.schema")

describe('Testes da API - POST /produtos', () => {

    let loginResponse, response

    beforeEach('Criar um usuário e realizar login', async () => {
        await usersRequest.postCreateUser(usersData.post)
        loginData.post.templateValues = {
            '@OVERRIDES@': {
                "email": usersData.post.body.email,
                "password": usersData.post.body.password
            }
        }
        loginResponse = await loginRequest.postLogin(loginData.post)
    })

    describe('@Produtos-health - Health Check', () => {
        it('Validar a saúde da API', async () => {
            productsData.post.headers.Authorization = loginResponse.body.authorization
            response = await productsRequest.postRegisterProduct(productsData.post)
            expect(response).to.have.status(201)
        })
    })

    describe('@Produtos-regras - Fluxo Operacional', () => {
        it('Validar o cadastro de um produto com sucesso', async () => {
            productsData.post.headers.Authorization = loginResponse.body.authorization
            response = await productsRequest.postRegisterProduct(productsData.post)
            expect(response).to.have.status(201)
            expect(response).to.have.jsonLike({
                message: "Cadastro realizado com sucesso",
                _id: /^[a-zA-Z0-9]+$/
            })
            expect(response).to.have.jsonSchema(postRegisterProductSchema.created)
            expect(response).to.have.responseTimeLessThan(1000)
        })
    })

    describe('@Produtos-excecoes - Cobertura de exceções', () => {
        it('Validar cadastro de produto sem token de acesso', async () => {
            productsData.post.headers.Authorization = null
            response = await productsRequest.postRegisterProduct(productsData.post)
            expect(response).to.have.status(401)
            expect(response).to.have.jsonLike({
                message: "Token de acesso ausente, inválido, expirado ou usuário do token não existe mais"
            })
            expect(response).to.have.jsonSchema(postRegisterProductSchema.unauthorized)
            expect(response).to.have.responseTimeLessThan(1000)
        })

        it('Validar o campo "nome" vazio no cadastro de produto', async () => {
            productsData.post.headers.Authorization = loginResponse.body.authorization
            productsData.post.templateValues = {
                '@OVERRIDES@': {
                    "nome": ""
                }
            }
            response = await productsRequest.postRegisterProduct(productsData.post)
            expect(response).to.have.status(400)
            expect(response).to.have.jsonLike({
                nome: "nome não pode ficar em branco"
            })
            expect(response).to.have.jsonSchema(postRegisterProductSchema.badRequest)
            expect(response).to.have.responseTimeLessThan(1000)
        })

        it('Validar o tipo de dado esperado para o campo "nome" no cadastro de produto', async () => {
            productsData.post.headers.Authorization = loginResponse.body.authorization
            productsData.post.templateValues = {
                '@OVERRIDES@': {
                    "nome": 12345
                }
            }
            response = await productsRequest.postRegisterProduct(productsData.post)
            expect(response).to.have.status(400)
            expect(response).to.have.jsonLike({
                nome: "nome deve ser uma string"
            })
            expect(response).to.have.jsonSchema(postRegisterProductSchema.badRequest)
            expect(response).to.have.responseTimeLessThan(1000)
        })

        it('Validar a obrigatoriedade do campo "nome" no cadastro de produto', async () => {
            productsData.post.headers.Authorization = loginResponse.body.authorization
            productsData.post.templateValues = {
                '@REMOVES@': ["nome"]
            }
            response = await productsRequest.postRegisterProduct(productsData.post)
            expect(response).to.have.status(400)
            expect(response).to.have.jsonLike({
                nome: "nome é obrigatório"
            })
            expect(response).to.have.jsonSchema(postRegisterProductSchema.badRequest)
            expect(response).to.have.responseTimeLessThan(1000)
        })

        it('Validar que o campo "preco" aceita apenas números positivos no cadastro de produto', async () => {
            productsData.post.headers.Authorization = loginResponse.body.authorization
            productsData.post.templateValues = {
                '@OVERRIDES@': {
                    "preco": 0
                }
            }
            response = await productsRequest.postRegisterProduct(productsData.post)
            expect(response).to.have.status(400)
            expect(response).to.have.jsonLike({
                preco: "preco deve ser um número positivo"
            })
            expect(response).to.have.jsonSchema(postRegisterProductSchema.badRequest)
            expect(response).to.have.responseTimeLessThan(1000)
        })

        it('Validar que o campo "preco" aceita apenas números inteiros no cadastro de produto', async () => {
            productsData.post.headers.Authorization = loginResponse.body.authorization
            productsData.post.templateValues = {
                '@OVERRIDES@': {
                    "preco": 123.20
                }
            }
            response = await productsRequest.postRegisterProduct(productsData.post)
            expect(response).to.have.status(400)
            expect(response).to.have.jsonLike({
                preco: "preco deve ser um inteiro"
            })
            expect(response).to.have.jsonSchema(postRegisterProductSchema.badRequest)
            expect(response).to.have.responseTimeLessThan(1000)
        })

        it('Validar o tipo de dado esperado para o campo "preco" no cadastro de produto', async () => {
            productsData.post.headers.Authorization = loginResponse.body.authorization
            productsData.post.templateValues = {
                '@OVERRIDES@': {
                    "preco": "Teste"
                }
            }
            response = await productsRequest.postRegisterProduct(productsData.post)
            expect(response).to.have.status(400)
            expect(response).to.have.jsonLike({
                preco: "preco deve ser um número"
            })
            expect(response).to.have.jsonSchema(postRegisterProductSchema.badRequest)
            expect(response).to.have.responseTimeLessThan(1000)
        })

        it('Validar a obrigatoriedade do campo "preco" no cadastro de produto', async () => {
            productsData.post.headers.Authorization = loginResponse.body.authorization
            productsData.post.templateValues = {
                '@REMOVES@': ["preco"]
            }
            response = await productsRequest.postRegisterProduct(productsData.post)
            expect(response).to.have.status(400)
            expect(response).to.have.jsonLike({
                preco: "preco é obrigatório"
            })
            expect(response).to.have.jsonSchema(postRegisterProductSchema.badRequest)
            expect(response).to.have.responseTimeLessThan(1000)
        })

        it('Validar o campo "descricao" vazio no cadastro de produto', async () => {
            productsData.post.headers.Authorization = loginResponse.body.authorization
            productsData.post.templateValues = {
                '@OVERRIDES@': {
                    "descricao": ""
                }
            }
            response = await productsRequest.postRegisterProduct(productsData.post)
            expect(response).to.have.status(400)
            expect(response).to.have.jsonLike({
                descricao: "descricao não pode ficar em branco"
            })
            expect(response).to.have.jsonSchema(postRegisterProductSchema.badRequest)
            expect(response).to.have.responseTimeLessThan(1000)
        })

        it('Validar o tipo de dado esperado para o campo "descricao" no cadastro de produto', async () => {
            productsData.post.headers.Authorization = loginResponse.body.authorization
            productsData.post.templateValues = {
                '@OVERRIDES@': {
                    "descricao": 12345
                }
            }
            response = await productsRequest.postRegisterProduct(productsData.post)
            expect(response).to.have.status(400)
            expect(response).to.have.jsonLike({
                descricao: "descricao deve ser uma string"
            })
            expect(response).to.have.jsonSchema(postRegisterProductSchema.badRequest)
            expect(response).to.have.responseTimeLessThan(1000)
        })

        it('Validar a obrigatoriedade do campo "descricao" no cadastro de produto', async () => {
            productsData.post.headers.Authorization = loginResponse.body.authorization
            productsData.post.templateValues = {
                '@REMOVES@': ["descricao"]
            }
            response = await productsRequest.postRegisterProduct(productsData.post)
            expect(response).to.have.status(400)
            expect(response).to.have.jsonLike({
                descricao: "descricao é obrigatório"
            })
            expect(response).to.have.jsonSchema(postRegisterProductSchema.badRequest)
            expect(response).to.have.responseTimeLessThan(1000)
        })

        it('Validar que o campo "quantidade" aceita apenas números maior ou igual a 0 no cadastro de produto', async () => {
            productsData.post.headers.Authorization = loginResponse.body.authorization
            productsData.post.templateValues = {
                '@OVERRIDES@': {
                    "quantidade": -1
                }
            }
            response = await productsRequest.postRegisterProduct(productsData.post)
            expect(response).to.have.status(400)
            expect(response).to.have.jsonLike({
                quantidade: "quantidade deve ser maior ou igual a 0"
            })
            expect(response).to.have.jsonSchema(postRegisterProductSchema.badRequest)
            expect(response).to.have.responseTimeLessThan(1000)
        })

        it('Validar que o campo "quantidade" aceita apenas números inteiros no cadastro de produto', async () => {
            productsData.post.headers.Authorization = loginResponse.body.authorization
            productsData.post.templateValues = {
                '@OVERRIDES@': {
                    "quantidade": 123.20
                }
            }
            response = await productsRequest.postRegisterProduct(productsData.post)
            expect(response).to.have.status(400)
            expect(response).to.have.jsonLike({
                quantidade: "quantidade deve ser um inteiro"
            })
            expect(response).to.have.jsonSchema(postRegisterProductSchema.badRequest)
            expect(response).to.have.responseTimeLessThan(1000)
        })

        it('Validar o tipo de dado esperado para o campo "quantidade" no cadastro de produto', async () => {
            productsData.post.headers.Authorization = loginResponse.body.authorization
            productsData.post.templateValues = {
                '@OVERRIDES@': {
                    "quantidade": "Teste"
                }
            }
            response = await productsRequest.postRegisterProduct(productsData.post)
            expect(response).to.have.status(400)
            expect(response).to.have.jsonLike({
                quantidade: "quantidade deve ser um número"
            })
            expect(response).to.have.jsonSchema(postRegisterProductSchema.badRequest)
            expect(response).to.have.responseTimeLessThan(1000)
        })

        it('Validar a obrigatoriedade do campo "quantidade" no cadastro de produto', async () => {
            productsData.post.headers.Authorization = loginResponse.body.authorization
            productsData.post.templateValues = {
                '@REMOVES@': ["quantidade"]
            }
            response = await productsRequest.postRegisterProduct(productsData.post)
            expect(response).to.have.status(400)
            expect(response).to.have.jsonLike({
                quantidade: "quantidade é obrigatório"
            })
            expect(response).to.have.jsonSchema(postRegisterProductSchema.badRequest)
            expect(response).to.have.responseTimeLessThan(1000)
        })
    })

    afterEach('Reseta o body para gerar um novo usuário aleatório', () => {
        usersData.post.resetBody()
    })
})