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

    createRandomProduct() {
        return {
            "nome": faker.commerce.productName(),
            "preco": faker.number.int(),
            "descricao": faker.commerce.productDescription(),
            "quantidade": faker.number.int()
        }
    }
}

module.exports = FakerData