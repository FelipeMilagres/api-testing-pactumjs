const BaseApi = require("../baseApi.request")
const { urls } = require("../../data/urls.data")

class UsersRequest extends BaseApi {
    constructor() {
        super(urls.baseUrl)
    }

    /**
     * Faz uma requisição GET para obter os usuários
     * @param {object} requestOptions - As opções para montar a requisição
     * @returns {object} A resposta da requisição
     */
    async getUsers(requestOptions) {
        return await this.get(urls.users, requestOptions)
    }

    /**
     * Faz uma requisição POST para criar um usuário
     * @param {object} requestOptions - As opções para montar a requisição
     * @returns {object} A resposta da requisição
     */
    async createUser(requestOptions) {
        return await this.post(urls.users, requestOptions)
    }
}

module.exports = new UsersRequest()