const { faker } = require("@faker-js/faker")

function createRandomUser() {
    return {
        "nome": faker.internet.username(),
        "email": faker.internet.email(),
        "password": faker.internet.password(),
        "administrador": "true"
    }
}

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
                cachedUser = createRandomUser()
            }
            return cachedUser
        },
        templateValues: null,
        resetBody() {
            cachedUser = null
        }
    }
}

module.exports = {
    createRandomUser,
    usersData
}