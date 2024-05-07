import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface BudgetsState {
  isLoading:boolean,
  error:string,
  message:string,
  budgets:Budget[]
}

const initialState: BudgetsState = {
    isLoading:false,
    error:'',
    message:'',
    budgets:[]
}

export const budgetSlice = createSlice({
  name: 'budgets',
  initialState,
  reducers: {
    addBudgetRequest: (state) => {
      state.isLoading = true,
      state.error = ''
    },
    addBudgetSuccess: (state,action: PayloadAction<string>) => {
        state.isLoading = false,
        state.message = action.payload,
        state.error = ''
    },
    addBudgetFailure: (state,action: PayloadAction<string>) => {
        state.isLoading = false,
        state.error = action.payload
    },

    getBudgetsRequest: (state) => {
        state.isLoading = true,
        state.error = ''
      },
    getBudgetsSuccess: (state,action: PayloadAction<Budget[]>) => {
        state.isLoading = false,
        state.budgets = action.payload,
        state.error = ''
    },
    getBudgetsFailure: (state,action: PayloadAction<string>) => {
        state.isLoading = false,
        state.error = action.payload
    },

    updateBudgetRequest: (state) => {
        state.isLoading = true,
        state.error = ''
    },
    updateBudgetSuccess: (state,action: PayloadAction<string>) => {
        state.isLoading = false,
        state.message = action.payload,
        state.error = ''
    },
    updateBudgetFailure: (state,action: PayloadAction<string>) => {
        state.isLoading = false,
        state.error = action.payload
    },

    deleteBudgetRequest: (state) => {
        state.isLoading = true,
        state.error = ''
    },
    deleteBudgetSuccess: (state,action: PayloadAction<string>) => {
        state.isLoading = false,
        state.message = action.payload,
        state.error = ''
    },
    deleteBudgetFailure: (state,action: PayloadAction<string>) => {
        state.isLoading = false,
        state.error = action.payload
    },

  },
})

// Action creators are generated for each case reducer function
export const { addBudgetRequest,addBudgetSuccess,addBudgetFailure,
    getBudgetsRequest,getBudgetsSuccess,getBudgetsFailure,
    updateBudgetRequest,updateBudgetSuccess,updateBudgetFailure,
    deleteBudgetRequest,deleteBudgetSuccess,deleteBudgetFailure
 } = budgetSlice.actions

export default budgetSlice.reducer