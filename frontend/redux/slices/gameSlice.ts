import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface GameState {
  joinedUsersTotal: number | string
  isJoining: boolean
  roomId: number | string | null,
  win: 'win' | 'lose' | 'draw' | null,
  loseCount: number | 0,
  tour: number | 1,
  answer: 'rock' | 'paper' | 'scissors' | null
  opposinganswer: 'rock' | 'paper' | 'scissors' | null,
  gamestart: Boolean
  timeover: Boolean
  gameStartSecond: number,
  gameDrawWaitingSecond: number,
  joinAttempt: {
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
    response: { roomid: number | null, message: string | null, AvailableBalance: number | null }
  }
}

// Define the initial state using that type
const initialState: GameState = {
  joinedUsersTotal: 0,
  isJoining: false,
  joinAttempt: { loading: 'idle', response: { roomid: null, message: null, AvailableBalance: null } },
  roomId: null,
  win: null,
  loseCount: 0,
  tour: 1,
  answer: null,
  opposinganswer: null,
  gamestart: false,
  timeover: false,
  gameStartSecond: 5,
  gameDrawWaitingSecond: 3
}



//async state update 
export const joinAttempt = createAsyncThunk(
  'game/joinattempt',
  // if you type your function argument here
  async (join: { userid: number | null, roomid: number | null }) => {
    return fetch(`${process.env.SERVER_BASE_URL}/api/room/join`, {
      method: 'POST',
      body: JSON.stringify(join),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    }).then(async (res) => {
      if (res.ok) {
        return res.json()
      } else {
        const text = await res.text()
        throw new Error(text)
      }
    })

  }
)




export const gameSlice = createSlice({
  name: 'game',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    changeloseCount: (state, action: PayloadAction<number | 0>) => {
      state.loseCount = action.payload
    },
    changeJoinedUserTotal: (state, action: PayloadAction<number | string>) => {
      state.joinedUsersTotal = action.payload
    },
    isJoining: (state, action: PayloadAction<boolean>) => {
      state.isJoining = action.payload
    },
    inRoom: (state, action: PayloadAction<number | string>) => {
      state.roomId = action.payload
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    changeAnswer: (state, action: PayloadAction<'rock' | 'paper' | 'scissors' | null>) => {
      state.answer = action.payload
    },
    opposingPlayerAnswer: (state, action: PayloadAction<'rock' | 'paper' | 'scissors' | null>) => {
      state.opposinganswer = action.payload
    },
    GameStart: (state) => {
      state.gamestart = true
    },
    GameTour: (state, action: PayloadAction<number | 1>) => {
      state.tour = action.payload
    },
    GameWin: (state, action: PayloadAction<'lose' | 'win' | 'draw' | null>) => {
      state.win = action.payload

    },
    GameStop: (state) => {
      state.gamestart = false
    },
    TimeOver: (state, action: PayloadAction<boolean>) => {
      state.timeover = action.payload
    },
    GameReset: (state) => {
      state.answer = null
      state.opposinganswer = null
    }
  },
  extraReducers: (builder) => {
    //join attempt thunk
    builder.addCase(joinAttempt.pending, (state, action) => {
      state.joinAttempt.loading = 'idle'
    }),
      builder.addCase(joinAttempt.fulfilled, (state, action) => {
        state.joinAttempt.loading = 'succeeded'
        state.joinAttempt.response = action.payload
      }),
      builder.addCase(joinAttempt.rejected, (state, action) => {
        state.joinAttempt.loading = 'failed'
        state.isJoining = false
        state.joinAttempt.response = JSON.parse(action.error.message as string)
      })
  }
})

export const {
  changeJoinedUserTotal,
  changeloseCount,
  isJoining,
  inRoom,
  GameWin,
  changeAnswer,
  opposingPlayerAnswer,
  GameStart,
  GameTour,
  GameStop,
  TimeOver,
  GameReset
} = gameSlice.actions

// Other code such as selectors can use the imported `RootState` type
//export const selectCount = (state: RootState) => state.game.answer

export default gameSlice.reducer