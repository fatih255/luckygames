import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
interface GameState {
  answer: number | string
  gamestart: Boolean
  timeover: Boolean
}

// Define the initial state using that type
const initialState: GameState = {
  answer: 0,
  gamestart: false,
  timeover: false,
}

export const gameSlice = createSlice({
  name: 'game',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    changeAnswer: (state, action: PayloadAction<number | string>) => {
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
  changeAnswer,
  GameStart,
  GameStop,
  TimeOver,
  TimeReset
} = gameSlice.actions

// Other code such as selectors can use the imported `RootState` type
//export const selectCount = (state: RootState) => state.game.answer

export default gameSlice.reducer