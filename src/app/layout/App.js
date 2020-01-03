import React ,{Component, Fragment} from 'react';
import EventDashboard from '../../features/events/EventDashboard/EventDashboard';
import Navbar from '../../features/nav/Navbar/NavBar';
import {Container} from 'semantic-ui-react';
import {BrowserRouter as Router,Route,Switch,withRouter} from 'react-router-dom';
import HomePage from '../../features/home/HomePage';



import EventDetailedPage from '../../features/events/EventDetailed/EventDetailedPage';
import PeopleDashboard from '../../features/user/PeopleDashboard/peopleDashboard';
import UserDetailedPage from '../../features/user/UserDetailed/UserDetailedPage';
import SettingsDashboard from '../../features/user/settings/SettingsDashboard';
import EventForm from '../../features/events/EventForm/EventForm';
import ModalManager from '../../features/modals/modalManager';
import {UserIsAuthenticated} from '../../features/auth/authWrapper';



class App extends Component{
      render(){
            return(
                  <Fragment>
                        <ModalManager/>
                              <Route exact path='/' component={HomePage}/>
                              <Route path='/(.+)' render={()=>(
                                    <Fragment>
                                          <Navbar/>
                                                <Container className='main'>
                                                      <Router>
                                                      <Switch key={this.props.location.key}>
                                                            <Route exact path='/events' component={EventDashboard}/>
                                                            <Route exact path='/events/:id' component={EventDetailedPage}/>
                                                            <Route path='/people' component={UserIsAuthenticated(PeopleDashboard)}/>
                                                            <Route path='/people/:id' component={UserIsAuthenticated(UserDetailedPage)}/>
                                                            <Route path='settings' component={UserIsAuthenticated(SettingsDashboard)}/>
                                                            <Route path={['/createEvent','/manage/:id']} component={UserIsAuthenticated(EventForm)}/>
                                                      </Switch>
                                                      </Router>
                                                </Container>
                                    </Fragment>
                              )}/>
                  </Fragment>
            )
      }
}

export default withRouter(App);
