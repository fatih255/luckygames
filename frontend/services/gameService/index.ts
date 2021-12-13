import { Socket } from "socket.io-client";

type answer = 'rock' | 'paper' | 'scissors' | null


class GameService {

    public async joinGameRoom(socket: Socket, roomId: number): Promise<boolean> {
        return new Promise((rs, rj) => {
            socket.emit("join_game", { roomId })
            socket.on("room_joined", () => rs(true))
            socket.on("room_join_error", ({ error }) => rj(error))
        });
    }

    public async updateGame(socket: Socket, room: {
        answer?: answer,
        size?: number
    }) {
        socket.emit("update_game", { answer: room.answer, size: room.size });
    }

    public async onGameUpdate(
        socket: Socket,
        listiner: (listiner: { answer: answer, size: number }) => void) {
        socket.on("on_game_update", (data) => listiner(data))
    }

    public async GameStart(
        socket: Socket,
        roomId: number | string | null): Promise<any> {
        return new Promise<any>((rs, rj) => {
            socket.emit("game_start", { roomId });
            socket.on("on_game_start", (data) => rs(data))
        })
    }

    public async onGameStart(
        socket: Socket,
        listiner: (listiner: { sockets: any}) => void) {
        socket.on("on_game_start", (data) => listiner(data))
    }




}
export default new GameService();