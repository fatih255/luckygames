import { Socket } from "socket.io-client";

type answer = 'rock' | 'paper' | 'scissors' | null

interface gameState {
    answer: 'rock' | 'paper' | 'scissors'
}

class GameService {

    public async joinGameRoom(socket: Socket, roomId: string): Promise<boolean> {
        return new Promise((rs, rj) => {
            socket.emit("join_game", { roomId })
            socket.on("room_joined", () => rs(true))
            socket.on("room_join_error", ({ error }) => rj(error))
        });
    }

    public async updateGame(socket: Socket, answer: answer) {
        socket.emit("update_game", answer)
    }

    public async onGameUpdate(socket: Socket, listener: (answer: answer) => void) {
        socket.on("on_game_update", ({ answer }) => listener(answer))
    }

}

export default new GameService();