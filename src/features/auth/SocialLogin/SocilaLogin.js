import React from 'react';
import {Button,Icon} from 'semantic-ui-react';
import { connect } from 'react-redux';
import {socialLogin} from '../authActions';


const actions={socialLogin}

const SocialLogin=({socialLogin})=>{
      return (
            <div>
                  <Button onClick={()=>socialLogin('facebook')} type='button' style={{marginBottom:'10px'}} fluid color='facebook'>
                        <Icon name='facebook'/> login with facebook
                  </Button>
                  <Button onClick={()=>socialLogin('google')} type='button' style={{marginBottom:'10px'}} fluid color='google'>
                        <Icon name='google plus'/> login with google
                  </Button>
            </div>
      )
}


export default connect(null,actions)(SocialLogin)