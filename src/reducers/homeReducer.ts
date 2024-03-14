import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface HomeState {
  isLoading:boolean,
  error:string,
  backAccountId:number,
  backAccounts:BankAccount[],
  transactionType:string,
  date:string
}

const initialState: HomeState = {
    isLoading:false,
    backAccountId:-1,
    error:'',
    backAccounts:[],
    transactionType:"INCOME",
    date:""
}

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    getBankAccountsRequest: (state) => {
      state.isLoading = true,
      state.error = ''
    },
    getBankAccountsSuccess: (state,action: PayloadAction<BankAccount[]>) => {
        state.isLoading = false,
        state.backAccounts = action.payload,
        state.error = ''
    },
    getBankAccountsFailure: (state,action: PayloadAction<string>) => {
        state.isLoading = false,
        state.error = action.payload
    },
    setBankAccountId:(state,action:PayloadAction<number>) =>{
        state.backAccountId = action.payload
    },
    setTransactionType:(state,action:PayloadAction<string>) =>{
      state.transactionType = action.payload
    },
    setDate:(state,action:PayloadAction<string>) =>{
      state.date = action.payload
    }
    
  },
})

// Action creators are generated for each case reducer function
export const { getBankAccountsRequest,getBankAccountsSuccess,getBankAccountsFailure,
    setBankAccountId,setTransactionType,setDate } = homeSlice.actions

export default homeSlice.reducer