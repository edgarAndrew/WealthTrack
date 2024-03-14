import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authReducer'
import homeReducer from './reducers/homeReducer'

export const store = configureStore({
  reducer: {
    auth:authReducer,
    home:homeReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch