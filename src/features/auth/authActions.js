import {SubmissionError,reset} from 'redux-form';
import {closeModal} from '../modals/modalAction';
import {toastr} from 'react-redux-toastr';



export const login=creds=>async (dispatch,getState,{getFirebase,getFirestore})=>{
      const firebase=getFirebase()
      try{
            await firebase.auth().signInWithEmailandPassword(creds.email,creds.password)
            dispatch(closeModal())
      }catch(error){
            console.log(error)
            throw new SubmissionError({_error:error.message})
      }
}



export const registerUser=user=>async (dispatch,getState,{getFirebase,getFirestore})=>{
      const firebase=getFirebase()
      const firestore=getFirestore()

      try{
            let createUser=await firebase.auth().createUserWithEmailAndPassword(user.email,user.password)
            console.log(createUser)
            await createUser.user.updateProfile({displayName:user.displayName})

            let newUser={displayName:user.displayName,createdAt:firestore.FieldValue.serverTimeStam()}
            await firestore.set(`/users/${user.uid}`,{...newUser})
            dispatch(closeModal())
      }catch(error){
            console.log(error)
            throw new SubmissionError({
                  _error:error.message
            })
      }
}


export const socialLogin=selectedProvider=>async (dispatch,getState,{getFirebase,getFirestore})=>{
      const firebase=getFirebase()
      const firestore=getFirestore()

      try{
            const user =await firebase.login({provider:selectedProvider,type:'popup'})
            if(user.additionalUserInfo.isNewUser){
                  await firestore.set(`/users/${user.uid}`,{
                        displayName:user.profile.displayName,
                        photoURL:user.profile.avatarUrl,
                        createdAt:firestore.FieldValue.serverTimeStamp()
                  })
            }
            dispatch(closeModal())
      }catch(error){
            console.log(error)
      }
}


export const updatePassword=creds=>{
      return async (dispatch,getState,{getFirebase,getFirestore})=>{
            const firebase=getFirebase()
            const user=firebase.auth.currentUser;
            try{
                  await user.updatePassword(creds.password1);
                  await dispatch(reset('account'))
                  toastr.success('Success','Your password has been updated')
            }catch(error){
                  throw new SubmissionError({
                        _error:error.message
                  })
            }
      }
}


export const logout=creds=> async (dispatch,getState,{getFirebase,getFirestore})=>{
      const firebase=getFirebase();
      try{
            await firebase.auth.logout();
            dispatch(reset('account'))
      }catch(error){
            toastr.error('Error','there was an error logging out')
      }
}