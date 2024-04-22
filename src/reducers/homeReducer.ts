import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface HomeState {
  isLoading:boolean,
  error:string,
  backAccountId:number,
  backAccounts:BankAccount[],
  transactionType:string,
  date:string,
  range:string,
  transactions:Transaction[],
  pagination:PaginationResponse
}

const initialState: HomeState = {
    isLoading:false,
    backAccountId:-1,
    error:'',
    backAccounts:[],
    transactionType:"INCOME",
    date:"",
    range:"month",
    transactions:[],
    pagination:{
      content: [],
      empty: true,
      first: true,
      last: false,
      number: 0,
      numberOfElements: 0,
      pageable: {
        offset: 0,
        pageNumber: 0,
        pageSize: 0,
        paged: false,
        sort: {
          empty: true,
          sorted: false,
          unsorted: true,
        },
        unpaged: false,
      },
      size: 0,
      sort: {
        empty: true,
        sorted: false,
        unsorted: true,
      },
      totalElements: 0,
      totalPages: 0
    }
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
    },
    setRange:(state,action:PayloadAction<string>) =>{
      state.range = action.payload
    },


    getTransactionsRequest: (state) => {
      state.isLoading = true,
      state.error = ''
    },
    getTransactionsSuccess: (state,action: PayloadAction<Transaction[]>) => {
        state.isLoading = false,
        state.transactions = action.payload,
        state.error = ''
    },
    getTransactionsFailure: (state,action: PayloadAction<string>) => {
        state.isLoading = false,
        state.error = action.payload
    },

    getPaginationRequest: (state) => {
      state.isLoading = true,
      state.error = ''
    },
    getPaginationSuccess: (state,action: PayloadAction<PaginationResponse>) => {
        state.isLoading = false,
        state.pagination = action.payload,
        state.error = ''
    },
    getPaginationFailure: (state,action: PayloadAction<string>) => {
        state.isLoading = false,
        state.error = action.payload
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { getBankAccountsRequest,getBankAccountsSuccess,getBankAccountsFailure,
    setBankAccountId,setTransactionType,setDate,
  getTransactionsRequest,getTransactionsSuccess,getTransactionsFailure,
  setRange,getPaginationRequest,getPaginationSuccess,getPaginationFailure } = homeSlice.actions

export default homeSlice.reducer