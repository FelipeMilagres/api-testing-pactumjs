const { urls } = require("../../data/urls.data")
const BaseApiRequest = require("../baseApi.request")

class ProductsRequest extends BaseApiRequest {
    constructor() {
        super(urls.baseUrl)
    }

    /**
     * Obtém a lista de produtos registrados.
     * @param {object} requestOptions - Opções para a requisição (headers, queryParams, etc.).
     * @returns {Promise<object>} A resposta da requisição.
     */
    async getListRegisteredProducts(requestOptions) {
        return await this.get(urls.products, requestOptions)
    }

    /**
     * Cria um novo produto.
     * @param {object} requestOptions - Opções para a requisição (headers, queryParams, etc.).
     * @returns {Promise<object>} A resposta da requisição.
     */
    async postRegisterProduct(requestOptions) {
        return await this.post(urls.products, requestOptions)
    }

    /**
     * Busca um produto pelo ID.
     * @param {Number} productId - Identificador único do produto.
     * @param {object} requestOptions - Opções para a requisição (headers, queryParams, etc.).
     * @returns {Promise<object>} A resposta da requisição.
     */
    async getSearchProductById(productId, requestOptions) {
        return await this.get(`${urls.products}/${productId}`, requestOptions)
    }

    /**
     * Remove um produto pelo ID.
     * @param {Number} productId - Identificador único do produto.
     * @param {object} requestOptions - Opções para a requisição (headers, queryParams, etc.).
     * @returns {Promise<object>} A resposta da requisição.
     */
    async deleteProduct(productId, requestOptions) {
        return await this.delete(`${urls.products}/${productId}`, requestOptions)
    }

    /**
     * Edita as informações de um produto pelo ID.
     * @param {Number} productId - Identificador único do produto.
     * @param {object} requestOptions - Opções para a requisição (headers, queryParams, etc.).
     * @returns {Promise<object>} A resposta da requisição.
     */
    async putEditProduct(productId, requestOptions) {
        return await this.put(`${urls.products}/${productId}`, requestOptions)
    }
}

module.exports = new ProductsRequest()