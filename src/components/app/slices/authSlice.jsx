import { createSlice } from '@reduxjs/toolkit'


export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    value: false,
  },
  reducers: {
    login: (state) => {
      state.value = true
    },
    logout: (state) => {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('firstName')
      localStorage.removeItem('lastName')
      state.value = false
    },
  },
})

export const { login, logout } = authSlice.actions


