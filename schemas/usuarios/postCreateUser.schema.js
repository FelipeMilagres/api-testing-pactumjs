const postCreateUserSchema = {
    created: {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Created Schema",
        "type": "object",
        "properties": {
            "message": {
                "type": "string"
            },
            "_id": {
                "type": "string"
            }
        },
        "required": [
            "message",
            "_id"
        ]
    },
    badRequest: {
        name: {
            "$schema": "http://json-schema.org/draft-07/schema#",
            "title": "Bad Request Schema",
            "type": "object",
            "properties": {
                "nome": {
                    "type": "string"
                }
            },
            "required": [
                "nome"
            ]
        },
        email: {
            "$schema": "http://json-schema.org/draft-07/schema#",
            "title": "Bad Request Schema",
            "type": "object",
            "properties": {
                "email": {
                    "type": "string"
                }
            },
            "required": [
                "email"
            ]
        },
        password: {
            "$schema": "http://json-schema.org/draft-07/schema#",
            "title": "Bad Request Schema",
            "type": "object",
            "properties": {
                "password": {
                    "type": "string"
                }
            },
            "required": [
                "password"
            ]
        },
        administrator: {
            "$schema": "http://json-schema.org/draft-07/schema#",
            "title": "Bad Request Schema",
            "type": "object",
            "properties": {
                "administrador": {
                    "type": "string"
                }
            },
            "required": [
                "administrador"
            ]
        },
        message: {
            "$schema": "http://json-schema.org/draft-07/schema#",
            "title": "Bad Request Schema",
            "type": "object",
            "properties": {
                "message": {
                    "type": "string"
                }
            },
            "required": [
                "message"
            ]
        }
    }
}

module.exports = {
    postCreateUserSchema
}