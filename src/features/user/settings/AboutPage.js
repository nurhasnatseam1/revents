import React from 'react';
import {Button,Divider,Form,Header,Segment} from 'semantic-ui-react';
import {Field,reduxForm} from 'redux-form';
import RadioInput from '../../../app/common/form/RadioInput';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import PlaceInput from '../../../app/common/form/PlaceInput';
import SelectInput from '../../../app/common/form/SelectInput';



const interests=[
      {key:'drinks',text:"Drinks",value:'drinks'},
      {key:'culture',text:"Drinks",value:'culture'},
      {key:'film',text:"Drinks",value:'film'},
      {key:'food',text:"Drinks",value:'food'},
      {key:'music',text:"Drinks",value:'music'},
      {key:'travel',text:"Drinks",value:'travel'},
]

const AboutPage=({pristine,submitting,handleSubmit,updateProfile})=>{
      return(
            <Segment>
                  <Header dividing size='large' content='about me'>

                  </Header>
                  <p>complete you profile to get the most out of this site</p>
                  <Form onSubmit={handleSubmit(updateProfile)}>
                        <Form.Group inline>
                              <Field name='status' component={RadioInput} type='radio' value="single" label='Single'/>
                              <Field name='status' component={RadioInput} type='radio' value="relationship" label='relationship'/>
                              <Field name='status' component={RadioInput} type='radio' value="married" label='married'/>
                        </Form.Group>
                        <Divider/>
                        <label>Tell us about yoruself</label>
                        <Field name='about' component={TextArea} placeholder='About me'/>
                        <Field name='interests' component={SelectInput} options={interests} value="interests" multiple={true} placeholder='select your interests'/>
                        <Field width={8} name='occupation' type='text' component={TextInput} placeholder='occupation'/>
                        <Field with={8} name='origin' options={{types:['(regions)']}} component={PlaceInput} placeholder="country of origin"/>

                        <Divider/>
                        <Button disabled={pristine||submitting} size='large' positive content='Update profile'/>

                  </Form>
            </Segment>
      )
}


export default reduxForm({
      form:'userProfile',
      enableReinitialize:true,
      destroyOnUnmount:false
})(AboutPage)