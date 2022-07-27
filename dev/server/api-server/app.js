import express from 'express'
import { Server } from 'http'
import { APP_PORT, DB_URL } from './config'
import mongoose from 'mongoose'
import exp from 'constants'
const mainRouter = require('./router')
import errorHandler from './middlewares/errorHandler'

const app = express()


app.listen(APP_PORT, () => {
    console.log(`server started at ${APP_PORT}`)
})

async function dbConnection() {
    try {
        await mongoose.connect(DB_URL, () => {
            console.log("DB Connected !")
        })
    } catch (err) {
        throw err
    }
}
dbConnection()

app.use(express.json())
app.use('/api', mainRouter)




app.use(errorHandler)