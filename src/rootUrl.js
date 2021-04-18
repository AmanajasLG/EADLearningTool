
const rootUrl = process.env.NODE_ENV === 'development'? ''
              : process.env.NODE_ENV === 'production'? process.env.PUBLIC_URL
              : ''

export default rootUrl
