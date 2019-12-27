import React from 'react';
import { Menu, Button } from 'semantic-ui-react';



const signedOutMenu=({signedIn,register})=>{
      return(
            <Menu.Item position='right'>
                  <Button basic inverted content='login' onClick={signedIn} >SignId</Button>
                  <Button basic inverted style={{marginLeft:'.5em'}}content='register' onClick={register} >Register</Button>
            </Menu.Item>
      )
}


export default signedOutMenu;