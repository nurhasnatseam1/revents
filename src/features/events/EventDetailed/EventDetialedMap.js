import React from 'react';
import {Segment,Icon} from 'semantic-ui-react';
import GoogleMapReact from 'google-map-react';



const Marker=()=><Icon name='marker' size='big' color='red' ></Icon>

const EventDetailedMap=({Lat,Lng})=>{
      const zoom=14
      return (
            <Segment  attached='bottom' style={{padding:0}}>
                  <div style={{height:'300px',width:'100%'}}>
                        <GoogleMapReact bootstrapURLKeys={{key:'some key go to docs'}} defaultCenter={{Lat,Lng}} defaultZoom={zoom} >go to docs to get key
                        <Marker Lat={Lat} Lng={Lng} />
                        </GoogleMapReact>
                  </div>
            </Segment>
      )
}