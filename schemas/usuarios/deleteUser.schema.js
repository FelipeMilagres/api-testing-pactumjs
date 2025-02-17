const deleteUserSchema = {
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
    },
    badRequest: {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Bad Request Schema",
        "type": "object",
        "properties": {
          "message": {
            "type": "string"
          },
          "idCarrinho": {
            "type": "string"
          }
        },
        "required": [
          "message",
          "idCarrinho"
        ]
      }
}

module.exports = {
    deleteUserSchema
}