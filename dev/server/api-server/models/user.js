const { timeStamp } = require('console')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true

    },
    lastName: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true

    },
    role: {
        type: String,
        default: "customer"

    }

}, { timestamps: true })

const User = new mongoose.model("User", userSchema, 'users')
export default User