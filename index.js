import express from 'express'
import { exec } from 'child_process'
import bodyParser from 'body-parser'

const app = express()
const port = 5000

app.use(bodyParser.json())

app.post('/', (req, res) => {
    console.log('web hook received')
    res.status(200).send("Webhook received. Deployment in progress...");
    const deployScript = "bash portofolio-deploy-script.sh"

    exec(deployScript, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`)
            res.status(500).send("Deployment failed")
            return
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`)
            return
        }
        console.log(`stdout: ${stdout}`)
        res.status(200).send(`deployment successful: ${stdout}`)
    })
})

app.listen(port, () => {
    console.log(`deployment app listening on port ${port}`)
})