import axios from 'axios'
const config = require('../../server/config/config.json')

export default () => {
  return axios.create({
    baseURL: `http://localhost:${config.port}`
  })
}