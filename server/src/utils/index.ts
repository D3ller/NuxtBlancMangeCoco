import { RoomMongoose } from "../models/RoomsModel.ts";
import mongoose from "mongoose";
import { WhiteCardMongoose } from "../models/WhiteCardModel.ts";
import { BlueCardMongoose } from "../models/BlueCardModel.ts";

export enum UserRoles {
    USER = "user",
    TV = "tv",
    LEADER = "leader"
}

export class User {
    username: string;
    id: number;
    role: string;
    socketId: string;
    cards: string[] = [];
    hand: any | null = null;
    win: number = 0;

    constructor(username: string, id: number, role: string = UserRoles.USER, socketId: string) {
        this.username = username;
        this.id = id;
        this.role = role;
        this.socketId = socketId;

    }

    /**
     * This function is for adding cards once the player has played
     * @param index 
     * @returns 
     */
    public setHandCard(index: number) {
        this.hand = this.cards[index];
        this.cards.splice(index, 1)
        console.log(this.cards.length)
        return this.hand;
    }

    public deleteCardFromDeck(index: number) {
        this.cards.splice(index, 1)
    }
}

export interface room {
    name: string;
    id: number;
    users: User[];
    status: string;
}

export enum RoomStatus {
    WAITING = "waiting",
    STARTED = "started",
    ENDED = "ended"
}

export class Room {
    users: User[] = [];
    name: string;
    id: number;
    status: string = RoomStatus.WAITING;
    // wCards = [];
    bCards = [];
    currentCard: string[] = [];
    currentAnswer: number = 1;

    /**
        * Construct new Room
        * @params {string} name - Name of the room
        * @params {string} id - Id of the room
        * @params Users - Add new user at the creation of the room
    */
    // constructor(name: string, id: number, users?: User) {
    //     this.name = name;
    //     this.id = id;
    //     if (users) {
    //         this.users.push(users);
    //     }
    // }

    constructor(name: string, id: number) {
        this.name = name;
        this.id = id;
    }

    /**
        * Function for verifying the existance of the room
        * @params {string} roomName - Name of the room who is verified
        * @returns return if the room was finded or not
    */
    static async isRoomExist(roomName: string): boolean {
        await mongoose.connect(process.env.MONGO_URI);
        return await !RoomMongoose.find({ name: roomName });
    }

    static generateRoomId(): number {
        return Math.floor(Math.random() * 100000);
    }

    /**
        * Function for verifying the existance of the player
        * @params {string} username - Username of the player who is verified
        * @returns return if the room was finded or not
    */
    public async isUserExist(roomName: string, username: string): boolean {
        // return !!this.users.find(user => user.username === username);
        await mongoose.connect(process.env.MONGO_URI);
        let room = await !RoomMongoose.find({ name: roomName });
        let usersInRoom = await room[0].users
        // console.log(usersInRoom)
        // return .find(user => user.username === username);
    }

    /**
         * @returns Room object with name, id, users in there and status("waiting", "started", "ended")
    */
    public getRoom(): room {
        return {
            name: this.name,
            id: this.id,
            users: this.users,
            status: this.status
        }
    }

    /**
         * Function to add an user
         * @params user - User params to add
    */
    public addUser(user: User) {
        this.users.push(user);
    }

    /**
         * Function to remove an user
         * @params user - User params to delete it
    */
    public RemoveUser(user: User) {
        const index = this.users.indexOf(user);
        if (index > -1) {
            this.users.splice(index, 1);
        }
    }

    /**
         * Hard function to distribute cards
         * @author C.Nelhomme
     */
    // public distributeCards() {
    //     /*
    //         This function distribute all cards to players without player "TV"

    //         Way you already have cards when you play 
    //         this function is here to add the 11 card in your hand
    //     */

    //     let playerCount = this.users.length;

    //     for (let i = 0; i < playerCount; i++) {
    //         let player = this.users[i];

    //         if (player.role === UserRoles.TV) {
    //             continue;
    //         }

    //         if (player.role === UserRoles.LEADER) {
    //             let randomBlueCards = Math.floor(Math.random() * this.bCards.length);
    //             this.currentCard = this.bCards[randomBlueCards];
    //             this.bCards.splice(randomBlueCards, 1);
    //         }

    //         let playerCards: string[] = [];
    //         for (let j = 0; j < 11 - player.cards.length; j++) {
    //             let randomIndex = Math.floor(Math.random() * this.wCards.length);
    //             playerCards.push(this.wCards[randomIndex]);
    //             this.wCards.splice(randomIndex, 1);
    //         }
    //         playerCards.forEach((e) => {
    //             player.cards.push(e)
    //         })

    //     }

    // }

    /**
     * 
     * @returns {boolean}
     */
    public countAnswer(): boolean {
        if (this.currentAnswer === this.users.length - 2) {
            this.currentAnswer = 1;
            return true
        }
        this.currentAnswer++;
        return false;
    }

}

/**
 * I replace this const by a call to database to get the Room expected
 */

export const rooms: Room[] = [];

// export const rooms = async () => {
//     await mongoose.connect(process.env.MONGO_URI)
//     const result = await RoomMongoose.find();
//     console.log(result)
//     mongoose.connection.close();
//     return result;
// }

/**
 * Function to create Room and save it into database
 * @param room is the room object you want to save into database
 */
export default async function addRoom(room: Room) {
    await mongoose.connect(process.env.MONGO_URI);
    // console.log(room)
    const newRoom = new RoomMongoose({
        users: room.users,
        name: room.name,
        id: room.id,
        status: room.status,
        // wCards: room.wCards,
        bCards: room.bCards,
        currentCard: room.currentCard,
        currentAnswer: room.currentAnswer
    });
    await newRoom.save();
    // rooms.push(room);
    mongoose.connection.close();

}

// !!!!!!!!!!!!!!!!!!
// function à revoir car elle fait disparaitre la liste lorsqu'un client rejoin n'importe quelle room
// !!!!!!!!!!!!!!!!!!

export async function getRoomAvailable() {
    // let AvailableRooms = rooms.filter(room => room.users.length < 10 && room.status === RoomStatus.WAITING);
    // let roomInfo: { name: string; id: number; users: number; status: string; }[] = [];
    // AvailableRooms.map(room => {
    //     roomInfo.push({ name: room.name, id: room.id, users: room.users.length - 1, status: room.status })
    // })
    // return roomInfo;

    await mongoose.connect(process.env.MONGO_URI)
    let AvailableRooms = await RoomMongoose.find({ status: RoomStatus.WAITING });
    let roomInfo = [];
    AvailableRooms.map(room => {
        roomInfo.push({ name: room.name, id: room.id, users: room.users.length, status: room.status })
    })
    return roomInfo;
}

export function getUserBySocketId(socketId: string): User | undefined {
    for (let i = 0; i < rooms.length; i++) {
        let user = rooms[i].users.find(user => user.socketId === socketId);
        if (user) {
            return user;
        }
    }
}

function moveItem(array, fromIndex, toIndex) {
    if (fromIndex < 0 || fromIndex >= array.length || toIndex < 0 || toIndex >= array.length) {
        return array;
    }

    const [item] = array.splice(fromIndex, 1);
    array.splice(toIndex, 0, item);

    return array;
}

export function deleteRoom(roomName: string) {

    console.log('room deleted')

    // let index = rooms.findIndex(e => e.name === roomName);
    // rooms.splice(index, 1);
}

// export async function distributeCards(currentRoom, roomName: string) {
//     try {

//         await mongoose.connect(process.env.MONGO_URI);

//         if (!currentRoom) {
//             throw new Error(`Room with name "${roomName}" not found.`);
//         }

//         let wCards = await WhiteCardMongoose.find();
//         let bCards = await BlueCardMongoose.find();
//         const { users } = currentRoom;
//         const updatedUsers = [];

//         for (const user of users) {

//             // if (user.role === UserRoles.TV) {
//             //     updatedUsers.push(user);
//             //     continue;
//             // }

//             if (bCards.length === 0) {
//                 throw new Error('No more blue cards available.');
//             }

//             // distribute the blue card
//             const randomBlueIndex = Math.floor(Math.random() * bCards.length);
//             currentRoom.currentCard = bCards[randomBlueIndex];
//             bCards.splice(randomBlueIndex, 1);

//             const cardsToAdd = 11 - user.cards.length;
//             const newCards = [];
//             for (let i = 0; i < cardsToAdd; i++) {
//                 if (wCards.length === 0) {
//                     throw new Error('No more white cards available.');
//                 }

//                 const randomWhiteIndex = Math.floor(Math.random() * wCards.length);
//                 newCards.push(wCards[randomWhiteIndex]);
//                 wCards.splice(randomWhiteIndex, 1);
//             }

//             updatedUsers.push({
//                 ...user,
//                 cards: [...user.cards, ...newCards],
//             });
//         }

//         await RoomMongoose.updateOne(
//             { name: roomName },
//             {
//                 users: updatedUsers,
//                 currentCard: currentRoom.currentCard,
//             }
//         );

//         console.log('Cartes distribuées avec succès.');
//     } catch (error) {
//         console.error('Erreur lors de la distribution des cartes:', error);
//         throw error;
//     } finally {
//         // Déconnexion de MongoDB
//         await mongoose.disconnect();
//     }
// }

export function countAnswer(currentRoom): boolean {
    if (currentRoom.currentAnswer === currentRoom.users.length - 2) {
        currentRoom.currentAnswer = 1;
        return true
    }
    currentRoom.currentAnswer++;
    return false;
}

export function setHandCard(user, index: number) {
    user.hand = user.cards[index];
    moveItem(user.cards, index, 0)
    console.log(user.cards)
    return user.hand;
}

export function deleteCardFromDeck(user, index: number) {
    user.cards.splice(index, 1)

    console.log('test')
}