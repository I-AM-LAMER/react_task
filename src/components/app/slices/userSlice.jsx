import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    firstName: 'ФИО',
  }

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    set_user: (state, action) => {
      state.firstName = action.payload.firstName
    },
    remove_user: (state) => {
      state = initialState
    },
  },
})

export const { set_user, remove_user } = userSlice.actions
