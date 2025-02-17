const postRegisterProductSchema = {
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
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Bad Request Schema",
        "type": "object",
        "properties": {},
        "propertyNames": {
            "type": "string"
        },
        "patternProperties": {
            ".*": {
                "type": "string"
            }
        },
        "minProperties": 1,
        "maxProperties": 1
    },
    unauthorized: {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Unauthorized Schema",
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

module.exports = {
    postRegisterProductSchema
}