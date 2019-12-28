import React from 'react';
import {connect} from 'react-redux';
import {Form,Segment,Button,Label,Divider} from 'semantic-ui-react';
import {reduxForm,Field} from 'redux-form';
import {combineValidators,isRequired} from 'revalidate';
import TextInput from '../../../app/common/form/TextInput';
import {registerUser} from '../authActions';
import SocialLogin from '../SocialLogin/SocilaLogin';


const actions={registerUser}



const validate=combineValidators({
      displayName:isRequired('displayName'),
      email:isRequired('email'),
      password:isRequired('password')
})


const RegisterForm=({handleSubmit,registerUser,error,invalid,submitting})=>{
      return (
            <Form size='large' autoComplete='off' onSubmit={handleSubmit(registerUser)}>
                  <Segment>
                        <Field name='displayName' type='text' component={TextInput} placeholder='Known as'></Field>
                        <Field name='email' type="text" component={TextInput} placeholder='Password'></Field>
                        {error && <Label basic color="red">{error}</Label>}
                        <Button disabled={invalid||submitting} fluid size='large' color='teal'>Register</Button>
                        <Divider horizontal>or</Divider>
                        <SocialLogin></SocialLogin>
                  </Segment>
            </Form>
      )
}


export default connect(null,actions)(reduxForm({form:'registerForm',validate})(RegisterForm))