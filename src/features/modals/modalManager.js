import React,{Component} from 'react';
import {connect} from 'react-redux';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import UnauthModal from './UnauthModal';



const modalLookup={LoginModal,RegisterModal,UnauthModal}

const mapState=(state,ownProps)=>({
      currentModal:state.modals
})


const modalManager=({currentModal})=>{
      let renderedModal;
      if (currentModal){
            const {modalType,modalProps}=currentModal;
            const ModalComponent=modalLookup[modalType]
            renderedModal=<ModalComponent {...modalProps}></ModalComponent>
      }

      return renderedModal
}