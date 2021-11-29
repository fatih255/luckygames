import {
  ConnectedSocket,
  OnConnect,
  OnDisconnect,
  SocketController,
  SocketIO,
} from "socket-controllers";
import { Socket, Server } from "socket.io";

@SocketController()
export class MainController {
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
  public onDisconnect(
    @ConnectedSocket() socket: Socket,
    @SocketIO() io: Server
  ) {
    // socket.emit("disconnect", true);
    console.log("Disconnect Socket : ", socket.id);
  }
}