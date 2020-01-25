import fetch from 'cross-fetch'

export default (endpoint: string, init: RequestInit) =>
  fetch([process.env.BASE_API_URL, '/', endpoint].join(''), init)
    .then((response) => response.json())
    .catch((error) => error)
