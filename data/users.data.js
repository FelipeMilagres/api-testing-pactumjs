const FakerData = require("../helpers/fakerData.helpers")
const fakerData = new FakerData()

let cachedUser = null

const usersData = {
    get: {
        headers: {
            accept: 'application/json'
        }
    },
    post: {
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
        },
        get body() {
            if (!cachedUser) {
                cachedUser = fakerData.createRandomUser()
            }
            return cachedUser
        },
        templateValues: null,
        resetBody() {
            cachedUser = null
        }
    },
    put: {
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
        },
        get body() {
            return fakerData.createRandomUser()
        },
        templateValues: null
    },
    delete: {
        headers: {
            accept: 'application/json'
        }
    }
}

module.exports = {
    usersData
}