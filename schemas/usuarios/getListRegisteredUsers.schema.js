const getListRegisteredUsersSchema = {
    ok: {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Ok Schema",
        "type": "object",
        "properties": {
            "quantidade": {
                "type": "number"
            },
            "usuarios": {
                "type": "array",
                "items": {
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
                }
            }
        },
        "required": [
            "quantidade",
            "usuarios"
        ]
    }
}

module.exports = {
    getListRegisteredUsersSchema
}