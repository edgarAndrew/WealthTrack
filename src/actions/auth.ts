import { AppDispatch } from "../store";
import { registerRequest,registerSuccess,registerFailure } from "../reducers/authReducer";
import axios,{isAxiosError} from "axios";
import '../axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

type RegisterHandler = (dispatch: AppDispatch,
    firstname:string,lastname:string,email:string,password:string) => void;

export const handleRegister: RegisterHandler = async(dispatch,firstname,lastname,email,password) => {
    dispatch(registerRequest())
    try{
      const {data} = await axios.post("/auth/register",{firstname,lastname,email,password})
      AsyncStorage.setItem("token",data.token)
      dispatch(registerSuccess())
    }
    catch(error){
      if(isAxiosError(error)){
        if(error.response?.status === 409)
          dispatch(registerFailure("Email already exists"))
        else
          dispatch(registerFailure("Internal Server Error"))
      }
    }
  };