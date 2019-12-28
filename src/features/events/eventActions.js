import {toastr} from 'react-redux-toastr';
import {createNewEvent} from '../../app/common/utils/helpers';
import firebase from '../../app/config/firebase';
import {FETCH_EVENTS} from './eventConstants';
import {asyncActionStart,asyncActionFinish,asyncActionError} from '../async/asyncAction';
import { firestore } from 'firebase';



export const createEvent=event=>async (dispatch,getState,{getFirebase,getFirestore})=>{
      const firestore=getFirestore()
      const firebase=getFirebase()
      const user=firebase().auth.currentUser;
      const photoURL=getState().firebase.profile.photoURL;;
      const newEvent=createNewEvent(user,photoURL,event)

      try{
            let createdEvent=await firestore.add('events',newEvent)
            await firestore.set(`event_attendee/${createEvent.id}_${user.udi}`,{
                  eventId:createdEvent.id,
                  userUid:user.uid,
                  eventDate:event.date,
                  host:true ,
            })
            toastr.success('Success',"Event has been created")
            return createdEvent;
      }catch(error){
            toastr.error('Oops','Something went wrong')
      }
}



export const updateEvent=event=>async (dispatch,getState,{getFirebase,getFirestore})=>{
      const firestore=getFirestore()
      try{
            dispatch(asyncActionStart())
            let eventDocRef=firestore.collection('events').doc(event.id)
            let dateEqual=getState().firestore.ordered.events[0].date.isEqual(event.date)
            if(!dateEqual){
                  let batch=firestore.batch();
                  batch.update(eventDocRef,event)
                  let eventAttendeeRef=firestore.collection('event_attendee')
                  let eventAttendeeQuery=await eventAttendeeRef.where('eventID','==',event.id)
                  let eventAttendeeQuerySnap=eventAttendeeQuery.get()
                  for(let i=0;i<eventAttendeeQuerySnap.docs.length;i++){
                        let eventAttendeeDocRef=firestore.collection('event_attendee').doc(eventAttendeeQuerySnap.docs[i].id);
                        batch.update(eventAttendeeDocRef,{eventDate:event.date})
                  }

            }else{
                  await eventDocRef.update(event)
            }
            dispatch(asyncActionFinish())
            toastr.success('Success','Event has been updated')
      }catch(error){
            dispatch(asyncActionError)
            toastr.error('Error',"Something went wrong")
      }
}


export const cancelToggle=(cancelled,eventId)=>async (dispatch,getState,{getFirebase,getFirestore})=>{
      const firestore=getFirestore()
      const firebase=getFirebase()

      const message=cancelled? 'Are you sure you want to cacel the event?':'This will reactivate the event are you sure';
      try{
            toastr.confirm(message,{onOk:async()=>{
                  await firestore.update(`events/${eventId}`,{
                        cancelled:cancelled
                  })
            }})
      }catch(error){
            toastr.error('Error',error)
      }
}



export const getEventsForDashboard=lastEvent=>async (dispatch,getState,{getFirebase,getFirestore})=>{
      let today=new Date()
      const fierstore=getFirestore()
      const eventsRef=firestore.collection('events')
      try{
            dispatch(asyncActionStart())
            let startAfter=lastEvent&&(await firestore.collection('events').doc(lastEvent.id).get())
            let query;
            lastEvent? (query=eventsRef.where('date','>=',today).orderBy('date').startAfter(startAfter).limit(2))
            :(query=eventsRef.where('date','>=',today)).orderBy('date').limit(2)

            let querySanp=await query.get()
            if(querySanp.docs.length===0){
                  dispatch(asyncActionFinish())
                  return querySanp;
            }


            let events=[];
            for(let i=0;i<querySanp.docs.length;i++){
                  let evt={...querySanp.docs[i].data(),id:querySanp.docs.id}
                  events.push(evt)
            }

            dispatch({type:FETCH_EVENTS,payload:{events}})
            dispatch(asyncActionFinish())
            return querySanp
      }catch(error){
            console.log(error)
            dispatch(asyncActionError())
      }
}


export const addEventComment=(eventId,values,parentId)=>async (dispatch,getState,{getFirebase,getFirestore})=>{
      const firebase=getFirebase()
      const firestore=getFirestore()
      const user=firebase.auth().currentUser;
      const profile=getState().firebase.profile
      let newComment={
            parentId:parentId,
            displayName:profile.displayName,
            photoURl:profile.photoURl||'/assets/user.png',
            uid:user.uid,
            text:values.comment,
            date:Date.now()
      }
      try{
            await firebase.push(`event_chat/${eventId}`,newComment)
      }catch(error){
            console.log(error)
            toastr.error('Oops','Problem adding comment')
      }

}