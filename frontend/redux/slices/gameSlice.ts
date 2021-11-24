import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface GameState {
  isJoining: boolean
  inRoom: boolean
  answer: 'rock' | 'paper' | 'scissors' | null
  gamestart: Boolean
  timeover: Boolean
}

// Define the initial state using that type
const initialState: GameState = {
  isJoining: false,
  inRoom: false,
  answer: null,
  gamestart: false,
  timeover: false,
}

export const gameSlice = createSlice({
  name: 'game',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    isJoining: (state, action: PayloadAction<boolean>) => {
      state.isJoining = action.payload
    },
    inRoom: (state, action: PayloadAction<boolean>) => {
      state.inRoom = action.payload
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    changeAnswer: (state, action: PayloadAction<'rock' | 'paper' | 'scissors' | null>) => {
      state.answer = action.payload
    },
    GameStart: (state) => {
      state.gamestart = true
    },
    GameStop: (state) => {
      state.gamestart = false
    },
    TimeOver: (state) => {
      state.timeover = true
    },
    TimeReset: (state) => {
      state.timeover = false
    }
  }
})

export const {
  isJoining,
  inRoom,
  changeAnswer,
  GameStart,
  GameStop,
  TimeOver,
  TimeReset
} = gameSlice.actions

// Other code such as selectors can use the imported `RootState` type
//export const selectCount = (state: RootState) => state.game.answer

export default gameSlice.reducer