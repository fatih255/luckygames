import { ConnectedSocket, MessageBody, OnMessage, SocketController, SocketIO } from 'socket-controllers';
import { Server, Socket } from 'socket.io';


@SocketController()
export class GameController {

    private getSocketGameRoom(socket: Socket): string {
        const socketRooms = Array
            .from(socket.rooms.values())
            .filter((r) => r !== socket.id)
        const gameRoom = socketRooms && socketRooms[0]
        return gameRoom
    }

    @OnMessage("update_game")
    public async updateGame(
        @SocketIO() io: Server,
        @ConnectedSocket() socket: Socket,
        @MessageBody() message: any) {

        const gameRoom = this.getSocketGameRoom(socket)
        socket.to(gameRoom).emit("on_game_update", message)
    }
    @OnMessage("game_start")
    public async GameStart(
        @SocketIO() io: Server,
        @ConnectedSocket() socket: Socket,
        @MessageBody() message: any) {
        //console.log('tttt', io.sockets.adapter.rooms.get(message.roomId))
        const gameRoomArr = Array.from((io.sockets.adapter.rooms.get(message.roomId)))
        const p1 = gameRoomArr.slice(0, gameRoomArr.length / 2)
        const p2 = gameRoomArr.slice(gameRoomArr.length / 2, gameRoomArr.length)
        console.log(gameRoomArr, gameRoomArr[1])
        const gameMatches = {
            p1: { ...p1 },
            p2: { ...p2 }
        }
        console.log(gameMatches)
        const currentGameRoom = this.getSocketGameRoom(socket)
        socket.to(currentGameRoom).emit("on_game_start", gameMatches)
    }




}