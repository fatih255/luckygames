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
    @OnMessage("users_total_in_room")
    public async getJoinedUsersSize(@SocketIO() io: Server, @ConnectedSocket() socket: Socket, @MessageBody() message: any) {
        // if user enter the room , change current user size and update connected user size for show in frontend
        console.log('room ID : ', message.roomId, 'users total in room : ', io.sockets.adapter.rooms.get(message.roomId).size)

        socket.emit(`get_room_${message.roomId}_users_size`, io.sockets.adapter.rooms.get(message.roomId).size)
    }

    // send message all socket for listiner all sockets for show same message 
    @OnMessage("all_update_room")
    public async updateGame(
        @SocketIO() io: Server,
        @ConnectedSocket() socket: Socket,
        @MessageBody() message: any) {
        socket.broadcast.emit("on_all_room_update", message)
    }

    /*
    'socket.broadcast' : used to forward the same message to all connected sockets.
    To show it to all users instantly on the client side: 
    we have defined a 'listiner' for this message that will be sent to all users (in the client service folder)
    */
    //same user not connected multiple  1 client = 1 join room
    //when user playing game , user not able entering the game rooms 
    //the user cannot enter the game played a second time
    @OnMessage("check_user_in_room")
    public async UserAlreadyInRoom(
        @SocketIO() io: Server,
        @ConnectedSocket() socket: Socket,
        @MessageBody() message: any) {

        //get all socket joined user socket by room id 
        const connectedSockets = io.sockets.adapter.rooms.get(message.roomId);

// TODO:: this steps show on frontend
        if (connectedSockets) {
            console.log(connectedSockets)
            console.log(Array.from(connectedSockets))
            const UserInRoom = Array
                .from(connectedSockets)
                .find((r) => r.includes(socket.id)) ? true : false

            if (UserInRoom) {
                console.log('Bu Oyuna Zaten Giriş Yapmıştın')
            } else {
                console.log('Oyuna İlk kez Giriliyor')
            }
        } else {
            console.log('Odada Kullanıcı Bulunamadı')
        }



    }

}