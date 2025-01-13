const { urls } = require("../../data/urls.data");
const BaseApi = require("../baseApi.request");

class UsersRequest extends BaseApi {
    constructor() {
        super(urls.baseUrl)
    }

    async getUsers(requestData) {
        return await this.get(urls.users, requestData.queryParams, requestData.header)
    }

    async createUser(requestData, templateValues) {
        return await this.post(`${urls.users}`, requestData.body, requestData.header, templateValues);
    }
}

module.exports = new UsersRequest()