const BaseApi = require("../baseApi.request")
const { urls } = require("../../data/urls.data")

class UsersRequest extends BaseApi {
    constructor() {
        super(urls.baseUrl)
    }

    /**
     * Faz uma requisição GET para obter os usuários
     * @param {object} requestData - Dados da requisição
     * @returns {object} A resposta da requisição
     */
    async getUsers(requestData) {
        return await this.get(urls.users, { headers: requestData.headers })
    }

    /**
     * Faz uma requisição POST para criar um usuário
     * @param {object} requestData - Dados da requisição
     * @param {object} templateValues - Valores para substituir placeholders no corpo
     * @returns {object} A resposta da requisição
     */
    async createUser(requestData, templateValues) {
        return await this.post(urls.users, {
            body: requestData.body,
            headers: requestData.header,
            templateValues: templateValues
        })
    }
}

module.exports = new UsersRequest()