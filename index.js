import express from 'express'
import ROUTE from './src/routes/index.js'
import { Response } from './src/helpers/response-data.js'
import { ENV, PORT } from './src/db/configs/index.js'

const app = express()

// Configure trust proxy for accurate client IP detection with rate limiting
app.set('trust proxy', 1)

app.use(ROUTE)


// Defualt End point
app.get('/', (req, res) => {
    res.send(Response.success(req.query))
})


app.listen(PORT, () => {
    console.log(`\n♻️  Starting with: [\x1b[35m${ENV}\x1b[0m\] Mode!`)
    console.log(`\n🌞  API development:`)
    console.log(`🚀 \x1b[30mLocalhost:\x1b[32m http://localhost:${PORT}/api/v1/\x1b[0m`)
    console.log(`🚀 \x1b[30mLocal Service:\x1b[32m http://127.0.0.1:${PORT}/api/v1/\x1b[0m`)
})


/**
 * Not Found Route
*/
app.all("*", (req, res) => {
    res.send(
        Response.notFound({
            title: `Welcome to API NINTREA LABS`,
            method: req.method,
            message: `The requested URL ${req.originalUrl} was not found on this server.`,
        })
    )
})

export default app