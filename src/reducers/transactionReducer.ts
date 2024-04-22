import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface TransactionState {
  isLoading:boolean,
  error:string,
  message:string
}

const initialState: TransactionState = {
    isLoading:false,
    error:'',
    message:''
}

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    addTransactionRequest: (state) => {
      state.isLoading = true,
      state.error = ''
    },
    addTransactionSuccess: (state,action: PayloadAction<string>) => {
        state.isLoading = false,
        state.message = action.payload,
        state.error = ''
    },
    addTransactionFailure: (state,action: PayloadAction<string>) => {
        state.isLoading = false,
        state.error = action.payload
    },
    
    
  },
})

// Action creators are generated for each case reducer function
export const { addTransactionRequest,addTransactionSuccess,addTransactionFailure } = transactionSlice.actions

export default transactionSlice.reducer