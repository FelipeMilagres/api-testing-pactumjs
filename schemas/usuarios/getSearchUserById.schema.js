const getSearchUserByIdSchema = {
    ok: {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Ok Schema",
        "type": "object",
        "properties": {
            "nome": {
                "type": "string"
            },
            "email": {
                "type": "string"
            },
            "password": {
                "type": "string"
            },
            "administrador": {
                "type": "string"
            },
            "_id": {
                "type": "string"
            }
        },
        "required": [
            "nome",
            "email",
            "password",
            "administrador",
            "_id"
        ]
    },
    badRequest: {
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
    getSearchUserByIdSchema
}