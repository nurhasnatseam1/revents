import { createReducer } from "../../app/common/utils/reducerUtils"
import { ASYNC_ACTION_START, ASYNC_ACTION_FINISH, ASYNC_ACTION_ERROR } from "./asyncConstants"
import { asyncActionStart, asyncActionFinish } from "./asyncAction"

const initialState={loading:false,elementName:null}



const asyncActionStarted=(state,payload)=>{
      return {
            ...state,
            loading:true,
            elementName:payload
      }
}

const asyncActionFinished=(state,payload)=>{
      return {
            ...state,
            loading:false,
            elementName:null
      }
}

const asyncActionError=(state,payload)=>{
      return {
            ...state,
            loading:false,
            elementName:null
      }
}


export default createReducer(initialState,{
      [ASYNC_ACTION_START]:asyncActionStart,
      [ASYNC_ACTION_FINISH]:asyncActionFinish,
      [ASYNC_ACTION_ERROR]:asyncActionError,
})