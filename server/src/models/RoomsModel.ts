import mongoose from "mongoose";

// Définition du schéma des utilisateurs dans la room
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    role: { type: String, required: true },
    socketId: { type: String, required: true },
    cards: [{ type: Object }],
    wins: { type: Number, default: 0 },
    isWaiting: { type: Boolean, default: false }
});

// Définition du schéma de la room
const RoomsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    status: { type: String, required: true },
    users: [UserSchema],
    playerWon: { type: String, default: "" },
    blueCard: { type: Object },
    answers: [{ type: Object }],
});

export const RoomMongoose = mongoose.model('Rooms', RoomsSchema)