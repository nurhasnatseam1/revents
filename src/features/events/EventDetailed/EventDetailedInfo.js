import React, { useState } from 'react';
import {Segment,Grid,Icon,Button} from 'semantic-ui-react';
import EventDetailedMap from './EventDetailedMap';
import {format} from 'date-fns';


const EventDetailedInfo=({event})=>{
      const [isMapOpen,showMapToggle] =useState(false)
      return (
            <Segment.Group>
                  <Segment attached='top'>
                        <Grid>
                              <Grid.Column width={1}>
                              <Icon size='large' color='teal' name='Info'></Icon>
                              </Grid.Column>
                              <Grid.Column width={15}>
                              <p>{event.description}</p>
                              </Grid.Column>
                        </Grid>
                  </Segment>
                  <Segment attached>
                        <Grid verticalAlign='middle'>
                              <Grid.Column width={1}>
                                    <Icon name='calender' size='large' color='teal'></Icon>
                              </Grid.Column>
                              <Grid.Column width={15}>
                                    {event.date && (
                                    <span>{format(event.date.toDate(),'EEE do LLL')} at {format(event.date.toDate()),'h:mm a'}</span>
                                    )}
                              </Grid.Column>
                        </Grid>
                  </Segment>
                  <Segment attached>
                        <Grid VerticalAlign='middle'>
                        <Grid.Column width={1}>
                              <Icon name='marker' size='large' color='teal'></Icon>
                        </Grid.Column>
                        <Grid.Column width={11}>
                                    <span>{event.venue}</span>
                        </Grid.Column>
                        <Grid.Column width={4}>
                                    <Button onClick={()=>showMapToggle(!isMapOpen)} color="teal" size='tiny' content={isMapOpen?'Hide map':'show map'}></Button>
                        </Grid.Column>
                        </Grid>
                  </Segment>
                  {!isMapOpen && (
                        <EventDetailedMap lat={event.venueLatLng.Lat} lng={event.venueLatLng.Lng}/>
                  )}

            </Segment.Group>

      )
}