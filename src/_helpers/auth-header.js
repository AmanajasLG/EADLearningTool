export function authHeader () {
    const user = JSON.parse(localStorage.getItem('user'))
    return user && user.jwt ? {
        'Authorization': 'Bearer ' + user.jwt
    } : {}
}
