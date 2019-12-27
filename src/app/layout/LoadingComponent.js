import React,{Component} from 'react';
import {Dimmer,Loader} from 'semantic-ui-react';


const LoadingComponent=({inverted=true})=>{
      return (
            <Dimmer inverted={inverted} active="true">
                  <Loader content='loading ... '></Loader>
            </Dimmer>
      )
}


export default LoadingComponent;