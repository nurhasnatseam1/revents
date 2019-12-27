import React from 'react';
import {Segment,Grid,Header,List,Item,Icon} from 'semantic-ui-react';


import {format} from 'date-fns';


const UserDetailedDescription=({profile})=>{
      return(
            <Grid.Column>
                  <Segment>
                        <Grid columns={2}>
                              <Grid.Column width={10}>
                                    <Header icon='smile' content='About Display Name'/>
                                    <p>
                                          I am a: <strong>{profile.occupation||'tbn'}</strong>
                                    </p>
                                    <p>Original from <string>{profile.origin||'tbn'}</string></p>
                                    <p>Member since:{' '}
                                          <strong>
                                                {profile.createAt && format(profile.createAt.toDate(),'dd lll yyy')}
                                          </strong>
                                    </p>

                              </Grid.Column>
                              <Grid.Column>
                                    <Grid.Column width={6}>
                                          <Header icon='heart outline' content='Interests'></Header>
                                          <List>
                                                {profile.interests?(profile.interests.map((interest,index)=>
                                                      (
                                                           <Item key={index}>
                                                                 <Icon name='heart'/>
                                                      <Item.content >{interest}</Item.content>
                                                           </Item> 
                                                      )
                                                )):
                                                      <p>No interests</p>
                                                }
                                          </List>
                                    </Grid.Column>

                              </Grid.Column>
                        </Grid>
                  </Segment>
            </Grid.Column>
      )
}


export default UserDetailedDescription;