import React, { Fragment } from 'react';
import {Header,Menu} from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';



const settingsNav=()=>{
      return(
            <Fragment>
                  <Menu vertical>
                        <Header icon='user' attached inverted color='grey' conent='Profile'/>
                        <Menu.Item as={NavLink} to='/settings/basic' >
                              Basics
                        </Menu.Item>
                        <Menu.Item as={NavLink} to='/settings/about' >
                              About
                        </Menu.Item>
                        <Menu.Item as={NavLink} to='/settings/photos' >
                              Photos
                        </Menu.Item>

                  </Menu>
                  <Header icon='settings' attached inverted color='grey' content='Account'/>
                  <Menu.Item as={NavLink} to='/settings/account'>My Account</Menu.Item>
            </Fragment>
      )
}


export default settingsNav;