import React, { Component } from 'react';
import {Segment,Item,Icon,List,Button,Label} from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';
import {Link} from 'react-router-dom';
import {format} from 'date-fns';
import {ObjectToArray} from '../../../app/common/utils/helpers';


class EventListItem extends Component{
      render(){
            const { event } = this.props;
            return(
                  <Segment.Group>
                        <Segment>
                              <Item.Group>
                                    <Item>
                                          <Item.Content>
                                                <Item.Image size='tiny' circular src={event.hostPhotoURL}/>
                                                <Item.Header as={Link} to={`/events/${event.id}`}>{event.title}</Item.Header>
                                                <Item.Description >Hosted by<Link to={`/profile/${event.hostUid}`}>{event.hostedBy}</Link></Item.Description>
                                                {event.cancelled && (
                                                      <Label style={{top:'-40px'}} ribbon='right' color='red' content='this event has been cancelled'/>
                                                )}
                                          </Item.Content>
                                    </Item>
                              </Item.Group>
                        </Segment>
                        <Segment>
                              <span>
                                    <Icon name='clock'></Icon>
                                    {format (event.date.toDate(),'dd LLL YYY')} at {' '}
                                    {format (event.date.toDate(),'h:m a')} |
                                    <Icon name='marker' />{event.venue}
                              </span>
                        </Segment>
                        <Segment clearing>
                                                <span>{event.description}</span>
                                                <Button as={Link} to={`/events/${event.id}`} color='teal' floated='right' context="View"/>
                        </Segment>
                  </Segment.Group>
            )
      }
}


export default EventListItem;