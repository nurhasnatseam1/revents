import {MODAL_CLOSE,MODAL_OPEN} from './modalAction';


export const openModal=(modalType,modalProps)=>({
      type:MODAL_OPEN,
      payload:{
            modalType,
            modalProps
      }
})



export const closeModal=(modalType,modalProps)=>(
      {
            type:MODAL_CLOSE,
      }
)