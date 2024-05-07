import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  isLoading:boolean,
  isAuthenticated:boolean,
  error:string,
}

const initialState: AuthState = {
    isLoading:false,
    isAuthenticated:false,
    error:''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.isLoading = true,
      state.isAuthenticated = false,
      state.error = ''
    },
    loginSuccess: (state) => {
        state.isLoading = false,
        state.isAuthenticated = true,
        state.error = ''
    },
    loginFailure: (state,action: PayloadAction<string>) => {
        state.isLoading = false,
        state.isAuthenticated = false,
        state.error = action.payload
    },

    registerRequest: (state) => {
      state.isLoading = true,
      state.isAuthenticated = false,
      state.error = ''
    },
    registerSuccess: (state) => {
        state.isLoading = false,
        state.isAuthenticated = true,
        state.error = ''
    },
    registerFailure: (state,action: PayloadAction<string>) => {
        state.isLoading = false,
        state.isAuthenticated = false,
        state.error = action.payload
    },

    loadUserRequest: (state) => {
      state.isLoading = true
    },
    loadUserSuccess: (state) => {
      state.isLoading = false,
      state.isAuthenticated = true
    },
    loadUserFailure: (state,action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },

    logout: (state) => {
      state.isAuthenticated = false
    },

    clearError: (state) => {
      state.error = ""
    },
    

  },
})

// Action creators are generated for each case reducer function
export const { loginRequest,loginSuccess,loginFailure,
  loadUserRequest,loadUserSuccess,registerRequest,
  registerSuccess,registerFailure,loadUserFailure,logout,clearError } = authSlice.actions

export default authSlice.reducer