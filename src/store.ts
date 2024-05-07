import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authReducer'
import homeReducer from './reducers/homeReducer'
import transactionReducer from './reducers/transactionReducer'
import budgetReducer from './reducers/budgetReducer'
import goalReducer from './reducers/goalReducer'
import bankReducer from './reducers/bankReducer'

export const store = configureStore({
  reducer: {
    auth:authReducer,
    home:homeReducer,
    transaction:transactionReducer,
    budgets:budgetReducer,
    goals:goalReducer,
    bank:bankReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch