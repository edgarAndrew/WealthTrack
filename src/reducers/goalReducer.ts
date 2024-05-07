import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface GoalsState {
  isLoading:boolean,
  error:string,
  message:string,
  goals:Goal[]
}

const initialState: GoalsState = {
    isLoading:false,
    error:'',
    message:'',
    goals:[]
}

export const goalSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    addGoalRequest: (state) => {
      state.isLoading = true,
      state.error = ''
    },
    addGoalSuccess: (state,action: PayloadAction<string>) => {
        state.isLoading = false,
        state.message = action.payload,
        state.error = ''
    },
    addGoalFailure: (state,action: PayloadAction<string>) => {
        state.isLoading = false,
        state.error = action.payload
    },

    getGoalsRequest: (state) => {
        state.isLoading = true,
        state.error = ''
      },
    getGoalsSuccess: (state,action: PayloadAction<Goal[]>) => {
        state.isLoading = false,
        state.goals = action.payload,
        state.error = ''
    },
    getGoalsFailure: (state,action: PayloadAction<string>) => {
        state.isLoading = false,
        state.error = action.payload
    },

    updateGoalRequest: (state) => {
        state.isLoading = true,
        state.error = ''
    },
    updateGoalSuccess: (state,action: PayloadAction<string>) => {
        state.isLoading = false,
        state.message = action.payload,
        state.error = ''
    },
    updateGoalFailure: (state,action: PayloadAction<string>) => {
        state.isLoading = false,
        state.error = action.payload
    },

    deleteGoalRequest: (state) => {
        state.isLoading = true,
        state.error = ''
    },
    deleteGoalSuccess: (state,action: PayloadAction<string>) => {
        state.isLoading = false,
        state.message = action.payload,
        state.error = ''
    },
    deleteGoalFailure: (state,action: PayloadAction<string>) => {
        state.isLoading = false,
        state.error = action.payload
    },

  },
})

// Action creators are generated for each case reducer function
export const { addGoalRequest,addGoalSuccess,addGoalFailure,
    getGoalsRequest,getGoalsSuccess,getGoalsFailure,
    updateGoalRequest,updateGoalSuccess,updateGoalFailure,
    deleteGoalRequest,deleteGoalSuccess,deleteGoalFailure
 } = goalSlice.actions

export default goalSlice.reducer