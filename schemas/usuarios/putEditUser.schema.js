const putEditUserSchema = {
    ok: {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Ok Schema",
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
    putEditUserSchema
}