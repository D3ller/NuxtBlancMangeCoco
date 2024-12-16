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

    constructor(username: string, id: number, role: string = UserRoles.USER, socketId: string) {
        this.username = username;
        this.id = id;
        this.role = role;
        this.socketId = socketId;

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

}

export const rooms: Room[] = [];

export function addRoom(room: Room) {
    rooms.push(room);
}

