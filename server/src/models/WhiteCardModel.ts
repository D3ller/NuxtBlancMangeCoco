import mongoose from "mongoose";

const WhiteCardSchema = new mongoose.Schema({
    text: String,
    nsfw: Boolean,
})

export const WhiteCardMongoose = mongoose.model('white_cards', WhiteCardSchema)