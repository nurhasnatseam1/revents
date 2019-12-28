import React,{Component} from 'react';
import {Modal,Button,Divider} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {closeModal,openModal} from './modalAction';
import {withRouter} from 'react-router';

const actions={closeModal,openModal}



class UnauthModal extends Component{
      handleCloseModal=()=>{
            if(this.props.location.pathname.includes('/events')){
                  this.props.closeModal();
            }else{
                  this.props.history.goBack()
                  this.props.closeModal()
            }
      }

      render(){
            return(
                  <Modal size="mini" open={true} onClose={this.handleCloseModal}>
                        <Modal.Header>You need to be signed in to do that!</Modal.Header>
                        <Modal.Description>
                              <p>please either login or register to do this kind of activity in this site</p>
                              <Button.Group widths={4}>
                                    <Button fluid color='teal' onClick={()=>openModal('LoginModal')}>
                                          Login
                                    </Button>
                                    <Button.or/>
                                    <Button fluid positive onClick={()=>closeModal('RegisterModal')}>
                                          Register
                                    </Button>
                              </Button.Group>
                              <Divider></Divider>
                              <div style={{textAlign:'center'}}>
                                    <p>Or click cancel to continue as a guest</p>
                                    <Button onClick={this.handleCloseModal}>Close</Button>
                              </div>
                        </Modal.Description>
                  </Modal>
            )
      }
}


export default withRouter(connect(null,actions)(UnauthModal))