const getListRegisteredProductsSchema = {
    ok: {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Ok Schema",
        "type": "object",
        "properties": {
            "quantidade": {
                "type": "number"
            },
            "produtos": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "nome": {
                            "type": "string"
                        },
                        "preco": {
                            "type": "number"
                        },
                        "descricao": {
                            "type": "string"
                        },
                        "quantidade": {
                            "type": "number"
                        },
                        "_id": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "nome",
                        "preco",
                        "descricao",
                        "quantidade",
                        "_id"
                    ]
                }
            }
        },
        "required": [
            "quantidade",
            "produtos"
        ]
    }
}

module.exports = {
    getListRegisteredProductsSchema
}