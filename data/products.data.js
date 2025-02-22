const FakerData = require("../helpers/fakerData.helper")
const fakerData = new FakerData()

const productsData = {
    get: {
        headers: {
            accept: 'application/json'
        }
    },
    post: {
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: null
        },
        get body() {
            return fakerData.createRandomProduct()
        },
        templateValues: null
    }
}

module.exports = {
    productsData
}