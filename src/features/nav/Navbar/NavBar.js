import React, { Fragment, Component } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';
import { withFirebase } from 'react-redux-firebase';
import { connect } from 'react-redux';
import {openModal} from '../../modals/modalAction';


const mapState=(state)=>({
      auth:state.firebase.auth,
      profile:state.firebase.profile,
})


const actions={openModal}

class NavBar extends Component{
      handleSignIn=()=>{
            this.props.openModal('LoginModal')
      }
      handleRegister=()=>{
            this.props.openModal('RegisterModal')
      }
      handleSignOut=()=>{
            this.props.firebase.logout();
            this.props.history.push('/')
            console.log('attempt to sign out')
      }


      render(){
            const {auth,profile}=this.props;
            const authenticated=auth.isLoaded && !auth.isEmpty;
            console.log(this.props)
            return (
                  <Menu inverted fixed='top'>
                        <Container>
                              <Menu.Item as={NavLink} exact to='/' header>
                                    <img src='assets/logo.png' alt='logo'/> Re- vents
                              </Menu.Item>
                              <Menu.Item as={NavLink} exact to ='/events' onClick={()=>this.props.history.push('/events')}  name='Events'></Menu.Item>
                              {authenticated && (
                                    <Fragment>
                                          <Menu.Item as={NavLink} to='/people'    name='People'></Menu.Item>
                                          <Menu.Item>
                                                <Button as ={Link} to='/createEvent' floated='right' positive inverted content='ceate event'></Button>
                                          </Menu.Item>
                                    </Fragment>
                              )}

                              {authenticated ? (<SignedInMenu signout={this.handleSignOut} profile={profile} auth={auth} />):
                                          <SignedOutMenu signIn={this.handleSignIn} register={this.handleRegister}/>
                              }
                        </Container>
                  </Menu>
            )
      }
}

export default withRouter(withFirebase(connect(mapState,actions)(NavBar)))