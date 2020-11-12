import { userConstants } from '../_constants'
import { userService } from '../_services'
import { alertActions } from './'
import { history } from '../_helpers'

export { requester }

function requester(service, request, success, failure, payload){
  console.log('called')
  return dispatch => {
      dispatch(request(payload))

      service(payload)
          .then(
              data => dispatch(success(data)),
              error => dispatch(failure(error.toString()))
          )
  }
}
