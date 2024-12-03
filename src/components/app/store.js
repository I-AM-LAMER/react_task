import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './slices/authSlice'
import { userSlice } from './slices/userSlice'


export const store = configureStore({
        reducer: {
            auth: authSlice.reducer,
            user: userSlice.reducer
        }
    })

export const isAuth = () => store.getState().auth.value

export const getUser = () => store.getState().user