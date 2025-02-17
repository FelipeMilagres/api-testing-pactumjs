const { urls } = require("../../data/urls.data")
const BaseApi = require("../baseApi.request")

class CartsRequest extends BaseApi {
    constructor() {
        super(urls.baseUrl)
    }

    /**
     * Obtém a lista de carrinhos registrados.
     * @param {object} requestOptions - Opções para a requisição (headers, queryParams, etc.).
     * @returns {Promise<object>} A resposta da requisição.
     */
    async getListRegisteredCarts(requestOptions) {
        return await this.get(urls.carts.root, requestOptions)
    }

    /**
     * Cadastra um novo carrinho.
     * @param {object} requestOptions - Opções para a requisição (headers, body, etc.).
     * @returns {Promise<object>} A resposta da requisição.
     */
    async postRegisterCarts(requestOptions) {
        return await this.post(urls.carts.root, requestOptions)
    }

    /**
     * Busca um carrinho pelo ID.
     * @param {string} cartId - O ID do carrinho a ser pesquisado.
     * @param {object} requestOptions - Opções para a requisição (headers, queryParams, etc.).
     * @returns {Promise<object>} A resposta da requisição.
     */
    async getSearchCartById(cartId, requestOptions) {
        return await this.get(`${urls.carts.root}/${cartId}`, requestOptions)
    }

    /**
     * Exclui um carrinho e finaliza a compra.
     * @param {object} requestOptions - Opções para a requisição (headers, body, etc.).
     * @returns {Promise<object>} A resposta da requisição.
     */
    async deleteCart(requestOptions) {
        return await this.delete(urls.carts.completePurchase, requestOptions)
    }

    /**
     * Exclui um carrinho e retorna os produtos ao estoque.
     * @param {object} requestOptions - Opções para a requisição (headers, body, etc.).
     * @returns {Promise<object>} A resposta da requisição.
     */
    async deleteCartAndReturnProductsToStock(requestOptions) {
        return await this.delete(urls.carts.cancelPurchase, requestOptions)
    }
}

module.exports = new CartsRequest()