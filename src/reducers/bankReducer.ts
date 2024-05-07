import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface BankState {
  isLoading:boolean,
  error:string,
  message:string,
  bankAccounts:BankAccount[],
  bankAccountId:number
}

const initialState: BankState = {
    isLoading:false,
    error:'',
    message:'',
    bankAccounts:[],
    bankAccountId:-1
}

export const bankSlice = createSlice({
  name: 'bank',
  initialState,
  reducers: {
    getBankAccountsRequest: (state) => {
        state.isLoading = true,
        state.error = ''
      },
    getBankAccountsSuccess: (state,action: PayloadAction<BankAccount[]>) => {
        state.isLoading = false,
        state.bankAccounts = action.payload,
        state.error = ''
    },
    getBankAccountsFailure: (state,action: PayloadAction<string>) => {
        state.isLoading = false,
        state.error = action.payload
    },

    addBankAccountRequest: (state) => {
      state.isLoading = true,
      state.error = ''
    },
    addBankAccountSuccess: (state,action: PayloadAction<string>) => {
        state.isLoading = false,
        state.message = action.payload,
        state.error = ''
    },
    addBankAccountFailure: (state,action: PayloadAction<string>) => {
        state.isLoading = false,
        state.error = action.payload
    },

    deleteBankAccountRequest: (state) => {
        state.isLoading = true,
        state.error = ''
    },
    deleteBankAccountSuccess: (state,action: PayloadAction<string>) => {
        state.isLoading = false,
        state.message = action.payload,
        state.error = ''
    },
    deleteBankAccountFailure: (state,action: PayloadAction<string>) => {
        state.isLoading = false,
        state.error = action.payload
    },

    setBankAccountId:(state,action:PayloadAction<number>) =>{
      state.bankAccountId = action.payload
  },

  },
})

// Action creators are generated for each case reducer function
export const { addBankAccountRequest,addBankAccountSuccess,addBankAccountFailure,
    getBankAccountsRequest,getBankAccountsSuccess,getBankAccountsFailure,
    deleteBankAccountRequest,deleteBankAccountSuccess,deleteBankAccountFailure,
    setBankAccountId
 } = bankSlice.actions

export default bankSlice.reducer