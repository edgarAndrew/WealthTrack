import { AppDispatch } from "../store";
import { 
    addBankAccountRequest,addBankAccountSuccess,addBankAccountFailure,
    deleteBankAccountRequest,deleteBankAccountSuccess,deleteBankAccountFailure,
    getBankAccountsRequest,getBankAccountsSuccess,getBankAccountsFailure
 } from "../reducers/bankReducer";
import axios,{isAxiosError} from "axios";
import '../axios'

type getBankAccountsHandler = (dispatch:AppDispatch)=>void
type addBankAccountHandler = (dispatch: AppDispatch,accountNumber:string,initialBalance:number)=>void
type deleteBankAccountHandler = (dispatch: AppDispatch,id:number)=>void

export const getBankAccounts: getBankAccountsHandler = async(dispatch) => {
    dispatch(getBankAccountsRequest())
    try{
      const {data} = await axios.get("/bank-accounts/my-accounts")
      dispatch(getBankAccountsSuccess(data))
    }
    catch(error){
      if(isAxiosError(error)){
        console.log(error.response?.data)
        dispatch(getBankAccountsFailure(error.response?.data.details))
      }
    }
  };

export const addBankAccount: addBankAccountHandler = async(dispatch,accountNumber:string,initialBalance:number) => {
    dispatch(addBankAccountRequest())
    try{
      const {data} = await axios.post("/bank-accounts",{accountNumber,initialBalance})
      dispatch(addBankAccountSuccess(data.message))
    }
    catch(error){
      if(isAxiosError(error)){
        console.log(error.response?.data)
        dispatch(addBankAccountFailure(error.response?.data.message))
      }
    }
  };

  export const deleteBankAccount: deleteBankAccountHandler = async(dispatch,id:number) => {
    dispatch(deleteBankAccountRequest())
    try{
      const {data} = await axios.delete(`/bank-accounts?id=${id}`)
      dispatch(deleteBankAccountSuccess(data.message))
    }
    catch(error){
      if(isAxiosError(error)){
        console.log(error.response?.data)
        dispatch(deleteBankAccountFailure(error.response?.data.message))
      }
    }
  };
  

