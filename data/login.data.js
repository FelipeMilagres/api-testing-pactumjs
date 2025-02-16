const loginData = {
    post: {
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: {
            email: '',
            password: ''
        },
        templateValues: null
    }
}

module.exports = {
    loginData
}