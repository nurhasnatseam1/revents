import React from 'react';
import {Segment,Grid,Button} from 'semantic-ui-react';
import {Link} from 'react-router-dom';





const UserDetailedSideBar=({isCurrentUser})=>{
      return (
            <Grid.Column width={4}>
                  <Segment>
                        {isCurrentUser?(
                              <Button as={Link} to='/settings' color='teal' fluid basic content='Edit profile'/>
                        ):(
                              <Button color='teal' fluid basic content='Follow User'></Button>
                        )
                        }
                  </Segment>
            </Grid.Column>
      )
}

export default UserDetailedSideBar;