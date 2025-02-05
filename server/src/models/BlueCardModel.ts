import mongoose from "mongoose";

const BlueCardSchema = new mongoose.Schema({
    text: String,
    nsfw: Boolean,
})

export const BlueCardMongoose = mongoose.model('blue_cards', BlueCardSchema)