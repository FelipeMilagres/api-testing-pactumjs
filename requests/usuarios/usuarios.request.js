const BaseApi = require("../baseApi.request")
const { urls } = require("../../data/urls.data")

class UsersRequest extends BaseApi {
    constructor() {
        super(urls.baseUrl)
    }

    /**
     * Obtém a lista de usuários registrados.
     * @param {object} requestOptions - Opções para a requisição (headers, queryParams, etc.).
     * @returns {Promise<object>} A resposta da requisição.
     */
    async getListRegisteredUsers(requestOptions) {
        return await this.get(urls.users, requestOptions)
    }

    /**
     * Cria um novo usuário.
     * @param {object} requestOptions - Opções para a requisição (headers, queryParams, etc.).
     * @returns {Promise<object>} A resposta da requisição.
     */
    async postCreateUser(requestOptions) {
        return await this.post(urls.users, requestOptions)
    }

    /**
     * Busca um usuário pelo ID.
     * @param {object} requestOptions - Opções para a requisição (headers, queryParams, etc.).
     * @returns {Promise<object>} A resposta da requisição.
     */
    async getSearchUserById(userId, requestOptions) {
        return await this.get(`${urls.users}/${userId}`, requestOptions)
    }

    /**
     * Remove um usuário pelo ID.
     * @param {object} requestOptions - Opções para a requisição (headers, queryParams, etc.).
     * @returns {Promise<object>} A resposta da requisição.
     */
    async deleteUser(userId, requestOptions) {
        return await this.delete(`${urls.users}/${userId}`, requestOptions)
    }

    /**
     * Edita as informações de um usuário pelo ID.
     * @param {object} requestOptions - Opções para a requisição (headers, queryParams, etc.).
     * @returns {Promise<object>} A resposta da requisição.
     */
    async putEditUser(userId, requestOptions) {
        return await this.put(`${urls.users}/${userId}`, requestOptions)
    }
}

module.exports = new UsersRequest()