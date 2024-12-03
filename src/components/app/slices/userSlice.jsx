import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    firstName: 'ФИО',
  }

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    set_user: (state, action) => {
      state.firstName = action.payload.firstName + ' ' + action.payload.lastName;
    },
    remove_user: (state) => {
      state = initialState
    },
  },
})

export const { set_user, remove_user } = userSlice.actions
