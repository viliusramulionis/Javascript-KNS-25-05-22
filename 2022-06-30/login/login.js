const credentials = {
    login: 'admin@bit.lt',
    password: 1234
}

export const authenticate = (login, password) => {
    if(login === credentials.login && password === credentials.password)
        return true

    return false
}
