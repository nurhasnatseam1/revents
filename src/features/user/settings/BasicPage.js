import React ,{Component} from 'react';
import {Segment,Form,Header,Divider,Button} from 'semantic-ui-react';
import {Field,reduxForm} from 'redux-form';
import DateInput from '../../../app/common/form/DateInput';
import PlaceInput from '../../../app/common/form/PlaceInput';
import TextInput from '../../../app/common/form/RadioInput';


import {addYears} from 'date-fns';
import RadioInput from '../../../app/common/form/RadioInput';


class BasicPage extends Component{
      render(){
            const { pristine, submitting, handleSubmit, updateProfile } = this.props;
            return(
                  <Segment>
                        <Header dividing size='large' content='Basic'/>
                        <Form onSubmit={handleSubmit(updateProfile)}>
                              <Field width={8} name='displayName' type='text' component={TextInput} placeholder="known as"/>
                              <Form.Group>
                                    <Field name='gender' type='radio' value='male' label='Male' component={RadioInput} />
                                    <Field name='gender' type='radio' value='female' label='Female' component={RadioInput}/>

                              </Form.Group>
                              <Field width={8} name='dateofBirth' component={DateInput} dateFormat='dd LLL YYY' showYearDropdown={true}
                              showMonthDropdown={true} dropdownMode='select' placeholder='Date of birth' maxDate={addYears(new Date(),-18)}
                              />

                              <Field name='city' placeholder='Home Town' options={{types:["(cities)"]}} label='Female' component={PlaceInput} width={8}/>
                              <Divider/>
                              <Button disabled ={pristine||submitting} size='large' positive content="Update Profile"/>

                        </Form>
                  </Segment>
            )
      }
}


export default reduxForm({
      form:'userProfile',
      enableReInitialize:true,
      destroyOnUnmount:false,
})(BasicPage)