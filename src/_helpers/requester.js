export const requester = (service, request, success, failure, payload) =>  dispatch => {
    dispatch(request(payload))

    return service(payload)
        .then(
            data => {
              dispatch(success(data))

              return Promise.resolve()
            },
            error => {
              dispatch(failure(error.toString()))
              console.log(error.response.data)
              
              try {
                return Promise.reject(error.response.data.data[0].messages[0].message)
              } catch{
                return Promise.reject(error.response.data.message)
              }
              
            }
        )
}

