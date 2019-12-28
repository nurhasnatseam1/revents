import {createReducer} from '../../app/common/utils/reducerUtils'
import {CREATE_EVENT,FETCH_EVENTS,DELETE_EVENT, UPDATE_EVENT} from './eventConstants';




const initialState=[]


const createEvent=(state,payload)=>{
      return [...state,payload.event]
}

const updateEvent=(state,payload)=>{
   return   [ ...state.filter(event=>event.id !== payload.event.id),payload.event]
}


const deleteEvent=(state,payload)=>{
 return [...state.filter(event=>event.id!==payload.event)]
}


const fetchEvents=(state,payload)=>{
      return [...payload.events]
}





export default createReducer(initialState,{
      [CREATE_EVENT]:createEvent,
      [FETCH_EVENTS]:fetchEvents,
      [DELETE_EVENT]:deleteEvent,
      [UPDATE_EVENT]:updateEvent,
})