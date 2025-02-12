const { faker } = require("@faker-js/faker")

class FakerData {

    createRandomUser() {
        return {
            "nome": faker.internet.username(),
            "email": faker.internet.email(),
            "password": faker.internet.password(),
            "administrador": "true"
        }
    }
}

module.exports = FakerData