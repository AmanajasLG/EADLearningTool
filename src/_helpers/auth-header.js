export function authHeader () {
    const user = JSON.parse(localStorage.getItem('user'))
    console.log('user.jwt:', user? user.jwt : 'no user')
    return user && user.jwt ? {
        'Authorization': 'Bearer ' + user.jwt
    } : {}
}
