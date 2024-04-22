import { AppDispatch } from "../store";
import { getBankAccountsRequest,getBankAccountsSuccess,getBankAccountsFailure,
    setBankAccountId,getTransactionsRequest,getTransactionsSuccess,getTransactionsFailure,
  getPaginationRequest,getPaginationSuccess,getPaginationFailure } from "../reducers/homeReducer";
import axios,{isAxiosError} from "axios";
import '../axios'

type getBankAccountsHandler = (dispatch: AppDispatch) => void;
type getAllTransactionsHandler = (dispatch: AppDispatch,type:string,date:string,range:string,page:number)=>void
type getCategoryTransactionsHandler = (dispatch: AppDispatch,type:string,date:string,range:string)=>void

export const getBankAccounts: getBankAccountsHandler = async(dispatch) => {
    dispatch(getBankAccountsRequest())
    try{
      const {data} = await axios.get("/bank-accounts/my-accounts")
      dispatch(getBankAccountsSuccess(data))
      dispatch(setBankAccountId(data[0].id))
    }
    catch(error){
      if(isAxiosError(error)){
        console.log(error)
        dispatch(getBankAccountsFailure("Something went wrong"))
      }
    }
  };

export const getAllTransactions: getAllTransactionsHandler = async(dispatch,type:string,date:string,range:string,page:number) => {
    dispatch(getPaginationRequest())
    try{
      if(range == 'day'){
        const [day,month,year] = [date.split('/')[1],date.split('/')[0],date.split('/')[2]]
        const {data} = await axios.get(`/transactions?day=${day}&month=${month}&year=${year}&type=${type}&page=${page}&size=3`)
        //console.log(data)
        dispatch(getPaginationSuccess(data))
      }else if(range == 'month'){
        const [month,year] = [date.split('/')[0],date.split('/')[2]]
        const {data} = await axios.get(`/transactions?month=${month}&year=${year}&type=${type}&page=${page}&size=3`)
        //console.log(data)
        dispatch(getPaginationSuccess(data))
      }else{
        const [year] = [date.split('/')[2]]
        const {data} = await axios.get(`/transactions?year=${year}&type=${type}&page=${page}&size=3`)
        //console.log(data)
        dispatch(getPaginationSuccess(data))
      }
    }
    catch(error){
      if(isAxiosError(error)){
        console.log(error)
        dispatch(getTransactionsFailure("Something went wrong"))
      }
    }
  };

  export const getCategoryTransactions: getCategoryTransactionsHandler = async(dispatch,type:string,date:string,range:string) => {
    dispatch(getTransactionsRequest())
    try{
      if(range == 'day'){
        const [day,month,year] = [date.split('/')[1],date.split('/')[0],date.split('/')[2]]
        const {data} = await axios.get(`/transactions?day=${day}&month=${month}&year=${year}&type=${type}&category=true`)
        dispatch(getTransactionsSuccess(data))
      }else if(range == 'month'){
        const [month,year] = [date.split('/')[0],date.split('/')[2]]
        const {data} = await axios.get(`/transactions?month=${month}&year=${year}&type=${type}&category=${true}`)
        dispatch(getTransactionsSuccess(data))
      }else{
        const [year] = [date.split('/')[2]]
        const {data} = await axios.get(`/transactions?year=${year}&type=${type}&category=true`)
        dispatch(getTransactionsSuccess(data))
      }
    }
    catch(error){
      if(isAxiosError(error)){
        console.log(error.message)
        dispatch(getTransactionsFailure("Something went wrong"))
      }
    }
  };