import { AppDispatch } from "../store";
import { 
    addGoalRequest,addGoalFailure,addGoalSuccess,
    getGoalsSuccess,getGoalsRequest,getGoalsFailure,
    updateGoalRequest,
    updateGoalSuccess,
    updateGoalFailure,
    deleteGoalRequest,
    deleteGoalSuccess,
    deleteGoalFailure
 } from "../reducers/goalReducer";
import axios,{isAxiosError} from "axios";
import '../axios'

type getGoalsHandler = (dispatch:AppDispatch)=>void
type addGoalHandler = (dispatch: AppDispatch,name:string,targetAmount:number,startDate:string,endDate:string)=>void
type updateGoalHandler = (dispatch: AppDispatch,id:number,name:string,targetAmount:number,endDate:string)=>void
type deleteGoalHandler = (dispatch: AppDispatch,id:number)=>void
type addMoneyHandler = (dispatch: AppDispatch,goalId:number,amount:number)=>void

export const getGoals: getGoalsHandler = async(dispatch) => {
    dispatch(getGoalsRequest())
    try{
      const {data} = await axios.get("/goals")
      dispatch(getGoalsSuccess(data))
    }
    catch(error){
      if(isAxiosError(error)){
        console.log(error.response?.data)
        dispatch(getGoalsFailure("Something went wrong"))
      }
    }
  };

export const addGoal: addGoalHandler = async(dispatch,name:string,targetAmount:number,startDate:string,endDate:string) => {
    dispatch(addGoalRequest())
    try{
      const {data} = await axios.post("/goals",{name,targetAmount,startDate,endDate})
      dispatch(addGoalSuccess(data.message))
    }
    catch(error){
      if(isAxiosError(error)){
        console.log(error.response?.data)
        dispatch(addGoalFailure(error.response?.data.message))
      }
    }
  };

  export const updateGoal: updateGoalHandler = async(dispatch,id:number,name:string,targetAmount:number,endDate:string) => {
    dispatch(updateGoalRequest())
    try{
      const {data} = await axios.put(`/goals?id=${id}`,{name,targetAmount,endDate})
      dispatch(updateGoalSuccess(data.message))
    }
    catch(error){
      if(isAxiosError(error)){
        console.log(error.response?.data)
        dispatch(updateGoalFailure(error.response?.data.message))
      }
    }
  };

  export const deleteGoal: deleteGoalHandler = async(dispatch,id:number) => {
    dispatch(deleteGoalRequest())
    try{
      const {data} = await axios.delete(`/goals?id=${id}`)
      dispatch(deleteGoalSuccess(data.message))
    }
    catch(error){
      if(isAxiosError(error)){
        console.log(error.response?.data)
        dispatch(deleteGoalFailure(error.response?.data.message))
      }
    }
  };

  export const addMoneyToGoal: addMoneyHandler = async(dispatch,goalId:number,amount:number) => {
    dispatch(updateGoalRequest())
    try{
      const {data} = await axios.patch("/goals/add-money",{goalId,amount})
      dispatch(updateGoalSuccess(data.message))
    }
    catch(error){
      if(isAxiosError(error)){
        console.log(error.response?.data)
        dispatch(updateGoalFailure(error.response?.data.message))
      }
    }
  };

  

