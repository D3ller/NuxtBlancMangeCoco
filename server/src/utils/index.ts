import {blue_cards, white_cards} from "../server.ts";

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

    public setHandCard(index: number) {
        this.hand = this.cards[index];
        console.log(this.hand);
        return this.hand;
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
    wCards = white_cards;
    bCards = blue_cards;
    currentCard: string[] = [];
    currentAnswer : number = 1;

    constructor(name: string, id: number, users?: User) {
        this.name = name;
        this.id = id;
        if (users) {
            this.users.push(users);
        }
    }

    static isRoomExist(roomName: string): boolean {
        return !!rooms.find(room => room.name === roomName);
    }

    static generateRoomId(): number {
        return Math.floor(Math.random() * 100000);
    }

    public isUserExist(username: string): boolean {
        return !!this.users.find(user => user.username === username);
    }

    public getRoom(): room {
        return {
            name: this.name,
            id: this.id,
            users: this.users,
            status: this.status
        }
    }

    public addUser(user: User) {
        this.users.push(user);
    }

    public RemoveUser(user: User) {
        const index = this.users.indexOf(user);
        if (index > -1) {
            this.users.splice(index, 1);
        }
    }

    public distributeCards() {
        let playerCount = this.users.length;

        for (let i = 0; i < playerCount; i++) {
            let player = this.users[i];

            if (player.role === UserRoles.TV) {
                continue;
            }

            if(player.role === UserRoles.LEADER) {
                let randomBlueCards = Math.floor(Math.random() * this.bCards.length);
                this.currentCard = this.bCards[randomBlueCards];
                this.bCards.splice(randomBlueCards, 1);
            }

            let playerCards: string[] = [];
            for (let j = 0; j < 11; j++) {
                let randomIndex = Math.floor(Math.random() * this.wCards.length);
                playerCards.push(this.wCards[randomIndex]);
                this.wCards.splice(randomIndex, 1);
            }
            player.cards = playerCards;
        }

    }

    public countAnswer() : boolean {
        if(this.currentAnswer === this.users.length-1) {
            this.currentAnswer = 0;
            return true
        }
        this.currentAnswer++;
        return false;
    }

}

export const rooms: Room[] = [];

export function addRoom(room: Room) {
    rooms.push(room);
}

