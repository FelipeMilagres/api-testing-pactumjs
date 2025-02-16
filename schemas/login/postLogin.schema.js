const postLoginSchema = {
    ok: {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Ok Schema",
        "type": "object",
        "properties": {
            "message": {
                "type": "string"
            },
            "authorization": {
                "type": "string"
            }
        },
        "required": [
            "message",
            "authorization"
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
        "maxProperties": 2
    }
}

module.exports = {
    postLoginSchema
}