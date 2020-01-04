import React from 'react';
import { Menu, Image, Dropdown } from "semantic-ui-react"
import { Link } from 'react-router-dom';
import {logout} from '../../auth/authActions';

const SignedInMenu=({signout,profile,auth})=>{
      return (
            <Menu.Item position='right'>
                  <Image avatar spaced='right' src={profile.photoUrl||'/assets/user.png'}/>
                  <Dropdown pointing='top left' text={profile.displayName}>
                        <Dropdown.Menu>
                              <Dropdown.Item text="Create Event" icon="plus"/>
                              <Dropdown.Item text="MY Event" icon="calender"/>
                              <Dropdown.Item text="MY network" icon="users"/>
                              <Dropdown.Item as={Link} to={`/profile/${auth.uid}`} text="MY profile" icon="user"/>
                              <Dropdown.Item as={Link} to={`/settings`}text="Settings" icon="settings"/>
                              <Dropdown.Item onClick={signout}text="Sign out" icon="power"/>
                        </Dropdown.Menu>
                  </Dropdown>
            </Menu.Item>
      )
}


export default SignedInMenu;