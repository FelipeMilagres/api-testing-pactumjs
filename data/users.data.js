const { faker } = require("@faker-js/faker")

function createRandomUser() {
    return {
        "nome": faker.internet.userName(),
        "email": faker.internet.email(),
        "password": faker.internet.password(),
        "administrador": "true"
    }
}

module.exports = {
    createRandomUser
}