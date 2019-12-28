import React from 'react';
import {Feed } from 'sematic-ui-react';
import {Link} from 'react-router-dom';
import {formatDistance} from 'date-fns';

class EventActivityItem extends React.Component{
      renderSummery=activity=>{
            switch(activity.type){
                  case 'new_event':
                        return (
                              <div>
                                    <Feed.User as={Link} to={{pathName:'/profile/'+activity.hostUid}}>
                                          {activity.hostedBy}
                                    </Feed.User>{' '} is hosting {' '}
                                    <Link to={{pathName:'/event/'+activity.eventId}}>{activity.title}</Link>
                              </div>
                        )
                  case 'cancelledEvent':
                        return (
                              <div>
                                    <Feed.User as={Link} to={{pathName:'/profile/'+activity.hostUid}}>
                                          {activity.hostedBy}
                                    </Feed.User>{' '} has cancelled {' '}
                                    <Link to={{pathName:'/event/'+activity.eventId}}>{activity.title}</Link>
                              </div>
                        )
                  default:return;
            }
      }

      render(){
            const {activity}=this.props
            return(
                  <Feed.Event>
                        <Feed.Label>
                              <img src={activity.photoURL||'assets/user.png'} alt=''/>
                        </Feed.Label>
                        <Feed.Content>
                              <Feed.Summary>{this.renderSummary(activity)}</Feed.Summary>
                              <Feed.date>
                                    {formatDistance(activity.timestamp&& activity.timestamp.toDate(),Date.now())}
                              </Feed.date>
                        </Feed.Content>

                  </Feed.Event>
            )
      }
}


export default EventActivityItem;