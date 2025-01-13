const { spec } = require('pactum')

class BaseApi {

    constructor(baseURL) {
        /**
         * @param {string} baseURL - A URL base para todas as requisições da API.
         */
        this.baseURL = baseURL
    }

    /**
     * Substitui placeholders no corpo da requisição.
     * @param {object} data - O objeto JSON contendo os placeholders no formato `@DATA:KEY@`.
     * @param {object} templateValues - Um objeto contendo os valores para substituir os placeholders.
     * @returns {object} O objeto JSON com os placeholders substituídos pelos valores fornecidos.
     */
    resolveTemplate(data, templateValues) {
        if (!data || !templateValues) return data

        /* Converte o objeto para string para facilitar a substituição */
        let stringifiedData = JSON.stringify(data)

        /* Substitui placeholders no formato @DATA:KEY@ */
        stringifiedData = stringifiedData.replace(/@DATA:([A-Z_]+)@/g, (_, key) => {
            return templateValues[key] || `@DATA:${key}@` // Substitui ou mantém o placeholder
        })

        /* Converte de volta para JSON */
        let resolvedData = JSON.parse(stringifiedData)

        /* Aplica @OVERRIDES@ */
        if (templateValues['@OVERRIDES@']) {
            const overrides = templateValues['@OVERRIDES@']
            Object.entries(overrides).forEach(([key, value]) => {
                resolvedData[key] = value // Sobrescreve ou adiciona o valor
            })
        }

        /* Aplica @REMOVES@ */
        if (templateValues['@REMOVES@']) {
            const removes = templateValues['@REMOVES@']
            removes.forEach((key) => {
                delete resolvedData[key] // Remove a chave
            })
        }

        return resolvedData
    }

    /**
     * Método genérico para construir as requisições HTTP
     * @param {string} method - O método HTTP (GET, POST, PUT, DELETE, PATCH, etc.).
     * @param {string} endpoint - O endpoint da API (relativo à URL base).
     * @param {object} [options] - As opções para a requisição.
     * @param {object} [options.body] - O corpo da requisição (para POST, PUT, PATCH).
     * @param {object} [options.queryParams] - Os parâmetros de consulta para a URL.
     * @param {object} [options.headers] - Os cabeçalhos HTTP para a requisição.
     * @param {object} [options.templateValues] - Valores para substituir placeholders no corpo da requisição.
     * @param {number} [options.timeout] - Tempo limite para a requisição em milissegundos.
     * @param {object} [options.formData] - Dados de formulário para enviar na requisição.
     * @param {string[]} [options.files] - Lista de caminhos de arquivos para enviar.
     * @returns {object} Uma instância configurada de `pactum.spec`.
     */
    async requestConstructor(method, endpoint, { body = null, queryParams = null, headers = null, templateValues = null, timeout = null, formData = null, files = null } = {}) {
        const request = spec()[method.toLowerCase()](`${this.baseURL}${endpoint}`)

        if (queryParams) request.withQueryParams(queryParams)
        if (headers) request.withHeaders(headers)
        if (timeout) request.withRequestTimeout(timeout)

        /* Tratamento do json body */
        if (body) {
            const resolvedBody = this.resolveTemplate(body, templateValues)
            request.withJson(resolvedBody)
        }

        /* Tratamento do form data */
        if (formData) {
            Object.entries(formData).forEach(([key, value]) => {
                request.withFormField(key, value)
            })
        }

        /* Tratamento de arquivos */
        if (files) {
            files.forEach((file) => {
                request.withFile(file)
            })
        }

        return request
    }

    /**
     * Faz uma requisição GET.
     * @param {string} endpoint - O endpoint da API.
     * @param {object} [options] - As opções para a requisição (ver método `requestConstructor`).
     * @returns {object} Uma instância configurada de `pactum.spec`.
     */
    async get(endpoint, options = {}) {
        return this.requestConstructor('GET', endpoint, options)
    }

    /**
     * Faz uma requisição POST.
     * @param {string} endpoint - O endpoint da API.
     * @param {object} [options] - As opções para a requisição (ver método `requestConstructor`).
     * @returns {object} Uma instância configurada de `pactum.spec`.
     */
    async post(endpoint, options = {}) {
        return this.requestConstructor('POST', endpoint, options)
    }

    /**
     * Faz uma requisição PUT.
     * @param {string} endpoint - O endpoint da API.
     * @param {object} [options] - As opções para a requisição (ver método `requestConstructor`).
     * @returns {object} Uma instância configurada de `pactum.spec`.
     */
    async put(endpoint, options = {}) {
        return this.requestConstructor('PUT', endpoint, options)
    }

    /**
     * Faz uma requisição DELETE.
     * @param {string} endpoint - O endpoint da API.
     * @param {object} [options] - As opções para a requisição (ver método `requestConstructor`).
     * @returns {object} Uma instância configurada de `pactum.spec`.
     */
    async delete(endpoint, options = {}) {
        return this.requestConstructor('DELETE', endpoint, options)
    }

    /**
     * Faz uma requisição PATCH.
     * @param {string} endpoint - O endpoint da API.
     * @param {object} [options] - As opções para a requisição (ver método `requestConstructor`).
     * @returns {object} Uma instância configurada de `pactum.spec`.
     */
    async patch(endpoint, options = {}) {
        return this.requestConstructor('PATCH', endpoint, options)
    }

    /**
     * Faz uma requisição HEAD.
     * @param {string} endpoint - O endpoint da API.
     * @param {object} [options] - As opções para a requisição (ver método `requestConstructor`).
     * @returns {object} Uma instância configurada de `pactum.spec`.
     */
    async head(endpoint, options = {}) {
        return this.requestConstructor('HEAD', endpoint, options)
    }

    /**
     * Faz uma requisição OPTIONS.
     * @param {string} endpoint - O endpoint da API.
     * @param {object} [options] - As opções para a requisição (ver método `requestConstructor`).
     * @returns {object} Uma instância configurada de `pactum.spec`.
     */
    async options(endpoint, options = {}) {
        return this.requestConstructor('OPTIONS', endpoint, options)
    }
}

module.exports = BaseApi