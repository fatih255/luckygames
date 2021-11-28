import { ConnectedSocket, MessageBody, OnMessage, SocketController, SocketIO } from 'socket-controllers';
import { Server, Socket } from 'socket.io';


@SocketController()
export class RoomController {


    @OnMessage("join_game")
    public async joinGame(@SocketIO() io: Server, @ConnectedSocket() socket: Socket, @MessageBody() message: any) {
        console.log("New User joining room: ", message);

        const connectedSockets = io.sockets.adapter.rooms.get(message.roomId);

        // checking if the socket is in the room.
        const socketRooms = Array.from(socket.rooms.values()).filter((r) => r !== socket.id)

        if (socketRooms.length > 0 || connectedSockets && connectedSockets.size === 3) {
            socket.emit("room_join_error", {
                error: "Room is full please choose another room  to play"
            })
        } else {
            await socket.join(message.roomId)
            socket.emit("room_joined")
        }
    }
    //TODO:: socket.to yapimi ile tüm soketlere değil sadece odaya göre kullanıcı sayısını gönderecegiz
    @OnMessage("users_total_in_room")
    public async getJoinedUsersSize(@SocketIO() io: Server, @ConnectedSocket() socket: Socket, @MessageBody() message: any) {
        // if user enter the room , change current user size and update connected user size for show in frontend
        console.log('room ID : ', message.roomId, 'users total in room : ', io.sockets.adapter.rooms.get(message.roomId).size)

        socket.emit(`get_room_${message.roomId}_users_size`, io.sockets.adapter.rooms.get(message.roomId).size)
    }


    @OnMessage("all_update_room")
    public async updateGame(
        @SocketIO() io: Server,
        @ConnectedSocket() socket: Socket,
        @MessageBody() message: any) {
        socket.broadcast.emit("on_all_room_update", message)
    }



}