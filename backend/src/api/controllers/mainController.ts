import {
  ConnectedSocket,
  MessageBody,
  OnConnect,
  OnDisconnect,
  SocketController,
  SocketIO,
} from "socket-controllers";
import { Socket, Server } from "socket.io";
import { RoomController } from "./roomController";

@SocketController()
export class MainController extends RoomController{
  @OnConnect()
  public onConnection(
    @ConnectedSocket() socket: Socket,
    @SocketIO() io: Server
  ) {
    console.log("New Socket connected: ", socket.id);

    socket.on("custom_event", (data: any) => {
      console.log("Data: ", data);
    });

  }
  @OnDisconnect()
  public async onDisconnect(
    @ConnectedSocket() socket: Socket,
    @SocketIO() io: Server
  ) {
    //TODO::: When the player is disconnected, all sockets will see that 1 person is reduced from the room
    //Object.keys(io.sockets.adapter.sids[connectedSocketsIds])
    const connectedSocketsIds = this.rooms
    console.log(connectedSocketsIds)
    // socket.broadcast.emit("on_all_room_update", message)
    console.log("Disconnect Socket : ", socket.id);
  }
}