const { expect } = require("pactum")
const productsRequest = require("../../requests/produtos/produtos.request")
const { productsData } = require("../../data/products.data")
const { getListRegisteredProductsSchema } = require("../../schemas/produtos/getListRegisteredProducts.schema")

describe('Testes da API - GET /produtos', () => {

    let response

    describe('@Produtos-health - Health Check', () => {
        it('Validar a saúde da API', async () => {
            response = await productsRequest.getListRegisteredProducts(productsData.get)
            expect(response).to.have.status(200)
        })
    })

    describe('@Produtos-regras - Fluxo Operacional', () => {
        it('Validar a consulta da lista de produtos com sucesso', async () => {
            response = await productsRequest.getListRegisteredProducts(productsData.get)
            expect(response).to.have.status(200)
            expect(response).to.have.bodyContains('quantidade')
            expect(response).to.have.bodyContains('produtos')
            expect(response).to.have.jsonSchema(getListRegisteredProductsSchema.ok)
            expect(response).to.have.responseTimeLessThan(1000)
        })
    })
})