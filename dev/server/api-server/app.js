import express from 'express'
import { APP_PORT } from './config'
import auth from './middlewares/auth'
const dbConnection = require('./db/dbConnection')
const restrictedRoute = require('./routes/restrictedRoutes')
const openRoute = require('./routes/openRoutes')
import errorHandler from './middlewares/errorHandler'

const app = express()
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use('/o', openRoute)
app.use('/r', auth, restrictedRoute)

app.use(errorHandler)
dbConnection.connection((err) => {
    if (err) {
        console.log(err)
        process.exit()
    }
    app.listen(APP_PORT, () => {
        console.log(`server started at ${APP_PORT}`)
    })
})
