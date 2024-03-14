import { AppDispatch } from "../store";
import { getBankAccountsRequest,getBankAccountsSuccess,getBankAccountsFailure,
    setBankAccountId } from "../reducers/homeReducer";
import axios,{isAxiosError} from "axios";
import '../axios'

type getBankAccountsHandler = (dispatch: AppDispatch) => void;

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