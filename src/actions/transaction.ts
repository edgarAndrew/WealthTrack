import { AppDispatch } from "../store";
import { addTransactionRequest,addTransactionSuccess,addTransactionFailure } from "../reducers/transactionReducer";
import axios,{isAxiosError} from "axios";
import '../axios'

type addTransactionHandler = (dispatch: AppDispatch,bankAccountId:number,amount:number,type:string,category:string,budget:boolean)=>void

export const addTransaction: addTransactionHandler = async(dispatch,bankAccountId:number,amount:number,type:string,category:string,budget:boolean) => {
    dispatch(addTransactionRequest())
    try{
      const {data} = await axios.post("/transactions",{bankAccountId,amount,type,category,budget})
      dispatch(addTransactionSuccess(data.message))
    }
    catch(error){
      if(isAxiosError(error)){
        console.log(error)
        dispatch(addTransactionFailure("Something went wrong"))
      }
    }
  };