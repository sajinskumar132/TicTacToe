import { configureStore } from "@reduxjs/toolkit"
import TicTacReducer from "./TicTac"

export const store=configureStore({
    reducer:{
        TicTacStore:TicTacReducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch