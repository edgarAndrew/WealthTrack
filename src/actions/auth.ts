import { AppDispatch } from "../store";
import { registerRequest,registerSuccess,registerFailure,
  loginRequest,loginSuccess,loginFailure,
  loadUserRequest,loadUserSuccess,loadUserFailure
 } from "../reducers/authReducer";
import axios,{isAxiosError} from "axios";
import '../axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

type RegisterHandler = (dispatch: AppDispatch,firstname:string,lastname:string,email:string,password:string) => void;
type LoginHandler = (dispatch: AppDispatch,email:string,password:string) => void;
type LoadUserHandler = (dispatch: AppDispatch) => void;

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

  export const loginUser: LoginHandler = async(dispatch,email,password) => {
    dispatch(loginRequest())
    try{
      const {data} = await axios.post("/auth/login",{email,password})
      AsyncStorage.setItem("token",data.token)
      dispatch(loginSuccess())
    }
    catch(error){
      if(isAxiosError(error)){
        if(error.response?.data.message){
          dispatch(loginFailure(error.response?.data.message))
        }
        else
          dispatch(loginFailure(error.message))
      }
    }
  };

  export const loadUser: LoadUserHandler = async(dispatch) => {
    dispatch(loadUserRequest())
    try{
      const token = await AsyncStorage.getItem("token")
      if(!token)
        throw new Error()
      const {data} = await axios.get("/auth/load")
      dispatch(loadUserSuccess())
    }catch(error){
      // backend throws error if you send expired token with any request, so remove it
      dispatch(loadUserFailure("JWT token missing/expired , please login"))
      AsyncStorage.removeItem("token")
    }
  };