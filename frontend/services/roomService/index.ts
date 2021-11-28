import { Socket } from "socket.io-client";

class RoomService {

    public async updateRoom(socket: Socket, room: {
        id: number,
        onlineUsers?: number
    }) {
        socket.emit("all_update_room", { id: room.id, onlineUsers: room.onlineUsers });
    }

    public async onRoomUpdate(
        socket: Socket,
        listiner: (listiner: { id: number, onlineUsers: number }) => void) {
        socket.on("on_all_room_update", (data) => listiner(data))
    }

    public async getJoinedUsersSize(
        socket: Socket,
        roomId: number | string | string[]): Promise<number> {
        return new Promise((rs, rj) => {
            socket.emit("users_total_in_room", { roomId })
            socket.on(`get_room_${roomId}_users_size`, (size) => rs(size))
        });
    }

}

export default new RoomService();