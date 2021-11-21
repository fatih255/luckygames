import { configureStore } from '@reduxjs/toolkit'
import GameReducer from './slices/gameSlice'
import AuthReducer from './slices/authSlice'
import AdminReducer from './slices/adminSlice'
// ...



export const store = configureStore({
  reducer: {
    game: GameReducer,
    auth: AuthReducer,
    admin: AdminReducer

  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch