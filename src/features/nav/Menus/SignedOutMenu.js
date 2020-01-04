import React from 'react';
import { Menu, Button } from 'semantic-ui-react';



const SignedOutMenu=({signIn,register})=>{
      return(
            <Menu.Item position='right'>
                  <Button basic inverted content='login' onClick={signIn} >SignIn</Button>
                  <Button basic inverted style={{marginLeft:'.5em'}} content='register' onClick={register} >Register</Button>
            </Menu.Item>
      )
}


export default SignedOutMenu;