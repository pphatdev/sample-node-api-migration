import express from 'express'
import ROUTE from './src/routes/apis/index.js'
import ip from 'ip'
import { config } from 'dotenv'
import { Response } from './src/helpers/response-data.js'
import bodyParser from 'body-parser'
config()

const app       = express()
const port      = process.env.PORT || 3000
const ENV       = process.env.NODE_ENV || "development"
const response  = new Response()

ROUTE.use(bodyParser.urlencoded({ extended: true }))
ROUTE.use(bodyParser.json())

app.use(ROUTE)

// Defualt End point
app.get('/', (req, res) => {
    res.send(response.success(req.query))
})

app.listen(port, () => {
    console.log(`\n♻️  Starting with: [\x1b[35m${ENV}\x1b[0m\] Mode!`)
    console.log(`\n🌞  Web development:`)
    console.log(`🚀 \x1b[30mLocalhost:\x1b[32m http://localhost:${port}\x1b[0m`)
    console.log(`🚀 \x1b[30mLocal Service:\x1b[32m http://127.0.0.1:${port}\x1b[0m`)
    console.log(`🚀 \x1b[30mHost Service:\x1b[32m http://${ip.address()}:${port}\x1b[0m`)

    console.log(`\n🌞  API development:`)
    console.log(`🚀 \x1b[30mLocalhost:\x1b[32m http://localhost:${port}/api/v1/\x1b[0m`)
    console.log(`🚀 \x1b[30mLocal Service:\x1b[32m http://127.0.0.1:${port}/api/v1/\x1b[0m`)
    console.log(`🚀 \x1b[30mHost Service:\x1b[32m http://${ip.address()}:${port}/api/v1/\x1b[0m`)
})

export default app