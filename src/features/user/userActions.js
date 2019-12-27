import {toastr} from 'react-redux-firebase';
import {asyncActionStart,asyncActionFinish,asyncActionError} from '../async/asyncAction';
import cuid from 'cuid';
import firebase from '../../app/config/firebase';
import {FETCH_EVENTS} from '../event/eventConstants';
import { FormTextArea } from 'semantic-ui-react';


export const updateProfile=user=>async (dispatch,getState,{getFirebase,getFirestore})=>{
      const firebase=getFirebase()
      const firestore=getFirestore()
      const {isLoaded,isEmpty,...updatedUser}=user 

      try{
            await firebase.updateProfile(updatedUser);
            toastr.success('Success','Your profile has been updated')
      }catch(error){
            console.log(error)
            toastr.error('Error','there  was an error updating your profile')
      }
}



export const uploadProfileImage=(file,fileName)=>async (dispatch,getState,{getFirebase,getFirestore})=>{
      const imageName=cuid();
      const firebase=getFirebase()
      const firestore=getFirestore()
      const user=firebase.auth().currentUser
      const path='$/{user.uid}/user_images'
      const options={name:imageName}
      try{
            dispatch(asyncActionStart())
            let uploadFile=await firebase.uploadFile(path,file,null,options)
            let downloadURL=await uploadFile.uploadTaskSnapshot.ref.getDownloadURL();
            let userDoc=await firestore.get(`/users/${user.uid}`)
            if(!userDoc.data().photoURL){
                  await firebase.updateProfile({photoURL:downloadURL})
                  await user.updateProfile({photoURL:downloadURL})
            }

            await firestore.add({collection:'users',doc:user.uid,subcollections:[
                  {collection:'photos'}
            ]},{
                  name:imageName,url:downloadURL,
            })


            dispatch(asyncActionFinish())

      }catch(error){
            console.log(error)
            dispatch(asyncActionError())
      }
}



export const deletePhoto=photo=>async (dispatch,getState,{getFirebase,getFirestore})=>{
      const firebase=getFirebase()
      const firestore=getFirestore()

      const user=firebase.auth().currentUser;
      try{
            await firebase.deletePhoto(`/${user.uid}/user_images/${photo.name}`)
            await firestore.delete(
                  {
                        collection:'users',
                        doc:user.uid,
                        subcollections:[{collection:'photos',doc:photo.id}]
                  }
            )
      }catch(error){
            console.log(error)
            throw new Error('Problem deleting the photo')
      }
}


export const setMainPhoto=photo=>async (dispatch,getState,{getFirebase,getFirestore})=>{
      const firestore=getFirestore()
      const firebase=getFirebase()
      const user=firebase.auth().currentUser;
      const today=new Date()

      let userDocRef=firestore.collection('users').doc(user.uid)
      let eventAttendeeRef=firestore.collection('event_attendee')
      try{
            dispatch(asyncActionStart())
            let batch=firestore.batch()
            batch.update(userDocRef,{photoURL:photo.url})
            let eventQuery=await eventAttendeeRef.where('userUid','==',user.uid)
            let eventQuerySnap=await eventQuery.get()

            for(let i=0;i<eventQuerySnap.docs.length;i++){
                  let eventDocRef=await firestore.collection('events')
                  .doc(eventQuerySnap.docs[i].data().eventId)

                  let event = await eventDocRef.get()
                  if(event.data().hostUid===user.uid){
                        batch.update(eventDocRef,{
                              hostPhotoURl:photo.url,
                              [`/attendee.${user.uid}.photoURL`]:photo.url
                        })
                  }else{
                        batch.update(eventDocRef,{
                              [`/attendee.${user.uid.photoURL}`]:photo.url
                        })
                  }

            }
            await batch.commit()
            dispatch(asyncActionFinish())
      }catch(error){
            console.log(error)
            dispatch(asyncActionError())
            toastr.error('Error','Problem setting main photo')
      }
}


export const goingToEvent=event=>async (dispatch,getState,{getFirebase,getFirestore})=>{
      const firestore=firebase.firestore();
      const user=firebase.auth().currentUser;
      const profile=getState().firebase.profile;
      const attendee={
            going:true,joinDate:new Date(),photoURL:profile.photoURL||'assets/user.png',
            displayName:profile.displayName,host:false,uid:user.uid
      }
      try{
            let eventDocRef=firestore.collection('events').doc(event.id)
            let eventAttendeeDocRef=firestore.collection('event_attendee').doc(`${event.id}_${user.uid}`)

            await firestore.runTransaction(async transaction=>{
                  await transaction.get(eventDocRef);
                  await transaction.update(eventDocRef,{
                        [`attendee.${user.uid}`]:attendee
                  })
                  await transaction.set(eventAttendeeDocRef,{eventId:event.id,suerUid:user.uid,eventDate:event.date,host:false})
                  dispatch(asyncActionFinish());
                  toastr.success('Success','You have signed up to an Event')

            })
      }catch(error){
            dispatch(asyncActionFinish())
            toastr.error('Error',"Problem singing up to that event")
      }
}





export const cancelGoingToEvent=event=>async (dispatch,getState,{getFirebase,getFirestore})=>{
      const firebase=getFirebase()
      const firestore=getFirestore()
      const user=firebase.auth().currentUser;

      try{
            await firestore.update(`/events/${event.id}`,{
                  [`attendee.${user.uid}`]:firestore.fieldValue.delete()
                  
            })
            firestore.delete(`event_attendee/${event.id}_${user.uid}`)
            toastr.success('Success','You have remove youself from the event')
      }catch(error){
            console.log(error);

            toastr.error('Error','Something went wrong')
      }
}



export const getUserEvents=(userUid,activeTab)=>async (dispatch,getState,{getFirebase,getFirestore})=>{
      dispatch(asyncActionStart())
      const firestore=firebase.firestore()
      const today=new Date();
      let eventsRef=firestore.collection('event_attendee')
      let query;
      switch(activeTab){
            case 1:
                  query=eventsRef.where('userUid','==',userUid)
                  .where('eventDate','<=',today)
                  .orderBy('eventDate','desc');
                  break;
            case 2:
                  query=eventsRef.where('userUid','==',userUid)
                  .where('eventDate','>=',today)
                  .orderBy('eventDate')

                  break;

            case 3:
                  query=eventsRef.where('userUid','==',userUid)
                  .where('host','==',true)
                  .orderBy('eventDate','desc')
                  break;
            default:
                  query=eventsRef.where('userUid','==',userUid)
                  .orderBy('eventDate','desc')
                  break
      }

      try{
            let querySnap=await query.get()
            let events=[]
            for(let i=0;i<querySnap.docs.length;i++){
                  let evt=await firestore.collection('events').doc(querySnap.docs[i].data().eventId).get()
                  events.push({...evt.data(),id:evt.id})
            }
            dispatch({type:FETCH_EVENTS,payload:{events}})
            dispatch(asyncActionFinish())
      }catch(error){
            console.log(error)
            dispatch(asyncActionError())
      }
}