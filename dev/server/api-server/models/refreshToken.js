import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        unique: true
    }
})
const RefreshTokenModel = new mongoose.model("RefreshTokenModel", refreshTokenSchema, "refreshTokens")

export default RefreshTokenModel