const express = require('express')
const config = require('config')
const path = require("path")
const fs = require('fs')
const https = require('https')

const privateKey  = fs.readFileSync('_.congratsy.info_private_key.key').toString()
const certificate = fs.readFileSync('congratsy.info_ssl_certificate.cer').toString()

const credentials = {key: privateKey, cert: certificate}

const app = express()

app.use(express.json({extended: true}))

app.use("/api/home", require("./routes/home.routes"))

if (process.env.NODE_ENV === "production") {
    app.use("/", express.static(path.join(__dirname, "client", "build")))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}

const PORT = config.get('port') || 5000

async function start() {
    try {
        await https.createServer(credentials,app).listen(PORT)
        app.listen(config.get('httpPort'))
        console.log(`server running on port: ${PORT} and ${config.get('httpPort')}`)
    } catch (e) {
        console.log(e)
    }

}
start()