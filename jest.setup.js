// En caso de necesitar la implementación del FetchAPI
import 'whatwg-fetch' // <-- yarn add whatwg-fetch
import { getEnviroments } from './src/helpers/getEnviroments'

require('dotenv').config({
  path: '.env.test'
}) // <-- yarn add dotenv
jest.mock('./src/helpers/getEnviroments', () => ({
  getEnviroments: () => ({ ...process.env })
}))
