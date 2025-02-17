const BaseApi = require("../baseApi.request")
const { urls } = require("../../data/urls.data")

class LoginRequest extends BaseApi {
    constructor() {
        super(urls.baseUrl)
    }

    /**
     * Realiza login.
     * @param {object} requestOptions - Opções para a requisição (headers, queryParams, etc.).
     * @returns {Promise<object>} A resposta da requisição.
     */
    async postLogin(requestOptions) {
        return await this.post(urls.login, requestOptions)
    }
}

module.exports = new LoginRequest()