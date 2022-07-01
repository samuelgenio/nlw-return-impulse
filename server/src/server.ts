import express from 'express'
import { routes } from './routes'


const app = express()

app.use(express.json())
app.use(routes)

app.get("/health", (req, res) => {
    res.status(200).send("it's running!");
  });

app.listen(process.env.PORT || 3333, () => {
    console.log("running!")
})