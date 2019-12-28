import React, { Fragment } from 'react';
import {Segment,Image,Item,Header,Button} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {format} from 'date-fns';


const eventImageStyle={
      filter:'brightness(30%)'

}


const eventImageTextStyle={
      position:'absolute',
      bottom:'5%',
      left:'5%',
      width:'100%',
      height:'auto',
      color:'white',
};

const EventDetailedHeader=({event,isHosting,isGoing,goingToEvent,cancelGoingToEvent,loading,authenticated,openModal})=>{
      return(
            <Segment>
                  <Segment basic attached='top' style={{padding:0}}>
                        <Image src={`/assets/category/Images/${event.category.jpg}`} fluid style={eventImageStyle}/>
                        <Segment basic style={eventImageTextStyle}>
                              <Item.Group>
                                    <Item>
                                          <Item.Content>
                                                <Header size='huge' content={event.title} style={{color:'white'}}/>
                                                <p>{event.date && format(event.date.toDate,'dd LLL YYY')}</p>
                                                <p>hosted by {' '} <strong><Link to={`/profile/${event.hostUid}`} style={{color:'white'}}></Link>{event.hostedBy}</strong></p>
                                          </Item.Content>
                                    </Item>
                              </Item.Group>
                        </Segment>
                  </Segment>
                  <Segment attached='bottom' clearing>
                        {!isHosting && (
                              <Fragment>
                                    {isGoing && (
                                          <Button onClick={()=>cancelGoingToEvent(event)}>cancel my place</Button>
                                    )}
                                     {!isGoing && (
                                          <Button onClick={()=>goingToEvent(event)}>JOIN THIS EVENT</Button>
                                    )}
                                    {!isGoing && !authenticated && (
                                          <Button onClick={()=>openModal('UnauthModal')}>JOIN THIS EVENT</Button>
                                    )}
                              </Fragment>
                        )}
                        {isHosting && (
                        <Button as={Link} to={`/event/${event.id}`} color='orange' floated='right'>Manage Event</Button>                    
                        )}
                  </Segment>
            </Segment>
      )
}


export default EventDetailedHeader;