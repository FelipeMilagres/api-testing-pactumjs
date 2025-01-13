const { spec } = require('pactum')

class BaseApi {
    constructor(baseURL) {
        this.baseURL = baseURL
    }

    resolveTemplate(data, templateValues) {
        if (!data || !templateValues) return data

        const stringifiedData = JSON.stringify(data)
        const resolvedData = stringifiedData.replace(/@DATA:([A-Z_]+)@/g, (_, key) => {
            return templateValues[key] || `@DATA:${key}@`
        });

        return JSON.parse(resolvedData)
    }

    async get(endpoint, queryParams = null, headers = null) {
        const request = spec().get(`${this.baseURL}${endpoint}`)

        if (queryParams) {
            request.withQueryParams(queryParams)
        }

        if (headers) {
            request.withHeaders(headers)
        }

        return request
    }


    async post(endpoint, body = null, headers = null, templateValues = null) {
        const request = spec().post(`${this.baseURL}${endpoint}`)

        if (body) {
            const resolvedBody = this.resolveTemplate(body, templateValues)
            request.withJson(resolvedBody)
        }

        if (headers) {
            request.withHeaders(headers)
        }

        return request
    }

    async put(endpoint, body = null, headers = null, templateValues = null) {
        const request = spec().put(`${this.baseURL}${endpoint}`)

        if (body) {
            const resolvedBody = this.resolveTemplate(body, templateValues)
            request.withJson(resolvedBody)
        }

        if (headers) {
            request.withHeaders(headers)
        }

        return request
    }

    async delete(endpoint, queryParams = null, headers = null) {
        const request = spec().delete(`${this.baseURL}${endpoint}`)

        if (queryParams) {
            request.withQueryParams(queryParams)
        }

        if (headers) {
            request.withHeaders(headers)
        }
        return request
    }
}

module.exports = BaseApi