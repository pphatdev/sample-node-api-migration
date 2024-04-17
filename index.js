import express from 'express'
import ROUTE from './src/apis/index.js'
import ip from 'ip'
import fs from "fs"
import { Response } from './src/helpers/response-data.js'
import { ENV, PORT, VERSION } from './src/db/configs/index.js'


const app       = express()
const response  = new Response()


app.use(ROUTE)


// Defualt End point
app.get('/', (req, res) => {
    res.send(response.success(req.query))
})


app.listen(PORT, () => {
    console.log(`\n♻️  Starting with: [\x1b[35m${ENV}\x1b[0m\] Mode!`)
    console.log(`\n🌞  Web development:`)
    console.log(`🚀 \x1b[30mLocalhost:\x1b[32m http://localhost:${PORT}\x1b[0m`)
    console.log(`🚀 \x1b[30mLocal Service:\x1b[32m http://127.0.0.1:${PORT}\x1b[0m`)
    console.log(`🚀 \x1b[30mHost Service:\x1b[32m http://${ip.address()}:${PORT}\x1b[0m`)

    console.log(`\n🌞  API development:`)
    console.log(`🚀 \x1b[30mLocalhost:\x1b[32m http://localhost:${PORT}/api/v1/\x1b[0m`)
    console.log(`🚀 \x1b[30mLocal Service:\x1b[32m http://127.0.0.1:${PORT}/api/v1/\x1b[0m`)
    console.log(`🚀 \x1b[30mHost Service:\x1b[32m http://${ip.address()}:${PORT}/api/v1/\x1b[0m`)
})


/**
 * Not Found Route
*/
app.all("*", (req, res) => {
    const currentPath   = `http://${ ip.address() }:${ PORT }${ req.path }`
    const currentURL    = currentPath + (req._parsedUrl.search ? req._parsedUrl.search : "")
    res.send(
        new Response().notFound({
            title: `Welcome to API ${ VERSION.toLocaleUpperCase() }`,
            method: req.method,
            current: currentURL,
            message: `We can't find [${req.method}]:${ currentURL } on this server! Please check {api_endpint} below.`,
            api_endpint: fs.readdirSync('./src/apis')
            .map( file => {
                const filename  = String(file).replaceAll('.js', '')
                const url       = `http://${ ip.address() }:${ PORT }/api/${VERSION}/` + ( filename == "index" ? "" : filename )
                return url != currentPath ? url : ""
            })
            // .filter( url => url != "" )
            .filter( url => url != `http://${ ip.address() }:${ PORT }/api/${VERSION}/` )
        })
    )
})

export default app