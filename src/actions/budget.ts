import { AppDispatch } from "../store";
import { addBudgetRequest,addBudgetSuccess,addBudgetFailure,
    updateBudgetRequest,updateBudgetSuccess,updateBudgetFailure,
    getBudgetsRequest,getBudgetsSuccess,getBudgetsFailure,
    deleteBudgetRequest,deleteBudgetSuccess,deleteBudgetFailure
 } from "../reducers/budgetReducer";
import axios,{isAxiosError} from "axios";
import '../axios'

type getBudgetsHandler = (dispatch:AppDispatch)=>void
type addBudgetHandler = (dispatch: AppDispatch,name:string,startAmount:number)=>void
type updateBudgetHandler = (dispatch: AppDispatch,id:number,name:string,startAmount:number)=>void
type deleteBudgetHandler = (dispatch: AppDispatch,id:number)=>void

export const getBudgets: getBudgetsHandler = async(dispatch) => {
    dispatch(getBudgetsRequest())
    try{
      const {data} = await axios.get("/budgets/my-budgets")
      dispatch(getBudgetsSuccess(data))
    }
    catch(error){
      if(isAxiosError(error)){
        console.log(error.response?.data)
        dispatch(getBudgetsFailure("Something went wrong"))
      }
    }
  };

export const addBudget: addBudgetHandler = async(dispatch,name:string,startAmount:number) => {
    dispatch(addBudgetRequest())
    try{
      const {data} = await axios.post("/budgets",{name,startAmount})
      dispatch(addBudgetSuccess(data.message))
    }
    catch(error){
      if(isAxiosError(error)){
        console.log(error.response?.data)
        dispatch(addBudgetFailure(error.response?.data.message))
      }
    }
  };

  export const updateBudget: updateBudgetHandler = async(dispatch,id:number,budgetName:string,budgetLimit:number) => {
    dispatch(updateBudgetRequest())
    try{
      const {data} = await axios.put(`/budgets?id=${id}`,{budgetName,budgetLimit})
      dispatch(updateBudgetSuccess(data.message))
    }
    catch(error){
      if(isAxiosError(error)){
        console.log(error.response?.data)
        dispatch(updateBudgetFailure(error.response?.data.message))
      }
    }
  };

  export const deleteBudget: deleteBudgetHandler = async(dispatch,id:number) => {
    dispatch(deleteBudgetRequest())
    try{
      const {data} = await axios.delete(`/budgets?id=${id}`)
      dispatch(deleteBudgetSuccess(data.message))
    }
    catch(error){
      if(isAxiosError(error)){
        console.log(error.response?.data)
        dispatch(deleteBudgetFailure(error.response?.data.message))
      }
    }
  };