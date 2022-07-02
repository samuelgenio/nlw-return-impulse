import express from 'express'
import { routes } from './routes'
var cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.get("/health", (req, res) => {
    res.status(200).send("it's running!");
  });

app.listen(process.env.PORT || 3333, () => {
    console.log("running!")
})