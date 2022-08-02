import express from 'express'
import { APP_PORT, DB_URL } from './config'
import mongoose from 'mongoose'
import auth from './middlewares/auth'
const restrictedRoute = require('./routes/restrictedRoutes')
const openRoute = require('./routes/openRoutes')
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
app.use('/o', openRoute)
app.use('/r', auth, restrictedRoute)





app.use(errorHandler)