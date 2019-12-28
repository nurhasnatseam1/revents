import React ,{Component, Fragment} from 'react';
import EventDashboard from '../../features/events/EventDashboard';
import Navbar from '../../features/nav/Navbar/NavBar';
import {Container} from './semantic-ui-react';
import {Route,Switch,withRouter} from 'react-router-dom';
import HomePage from '../../features/home/HomePage';



import eventDetailedPage from '../../features/events/EventDetailed/EventDetailedPage';
import PeopleDashboard from '../../features/user/PeopleDashboard/peopleDashboard';
import UserDetailedPage from '../../features/user/UserDetailed/UserDetailedPage';
import SettingsDashboard from '../../features/user/settings/SettignsDashboard';
import EventForm from '../../features/events/EventForm';
import ModalManager from '../../features/models/ModalManager';
import {UserIsAuthenticated} from '../../features/auth/AuthWrapper';



class App extends Component{
      render(){
            return(
                  <Fragment>
                        <ModalManager/>
                              <Route exact path='/' component={HomePage}/>
                              <Route path='/(.+)' render={()=>(
                                    <Fragment>
                                          <NavBar>
                                                <Container className='main'>
                                                      <Switch key={this.props.location.key}>
                                                            <Route exact path='/events' component={EventDashboard}/>
                                                            <Route exact path='/events/:id' component={EventDetailedPage}/>
                                                            <Route path='/people' component={UserIsAuthenticated(PeopleDashboard)}/>
                                                            <Route path='/people/:id' component={UserIsAuthenticated(UserDetailedPage)}/>
                                                            <Route path='settings' component={UserIsAuthenticated(SettingsDashboard)}/>
                                                            <Route path={['/createEvent','/manage/:id']} component={UserIsAuthenticated(EventForm)}/>
                                                      </Switch>
                                                </Container>
                                          </NavBar>
                                    </Fragment>
                              )}/>
                  </Fragment>
            )
      }
}