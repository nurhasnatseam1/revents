import React,{useState,useEffect,Fragment, useCallback} from 'react';
import {connect} from 'react-redux';
import {compose } from 'redux';
import {firestoreConnect} from 'react-redux-firebase';
import {Image,Segment,Header,Divider,Grid,Button} from 'semantic-ui-react';



import CropperInput from './CropperInput';
import {uploadProfileImage,deletePhoto,setMainPhoto} from '../../userActions';
import {toastr} from 'react-redux-toastr';
import UserPhotos from './UserPhotos';
import DropzoneInput from './DropezoneInput';


const query=({auth})=>{
      return [
            {collection:'users',doc:auth.uid,subcollection:[{collection:'photos'}],storeAs:'photos'}
      ]
}


const mapState=state=>({
      auth:state.firebase.auth,
      profile:state.firebase.profile,
      photos:state.firestore.ordered.photo,
      loading:state.async.loading,
})

const actions={uploadProfileImage,deletePhoto,setMainPhoto}



const PhotosPage=({uploadProfileImage,photos,profile,deletePhoto,setMainPhoto,loading})=>{
      const [files,setFiles]=useState([])
      const [cropResult,setCropResult]=useState('')
      const [image,setImage]=useState(null)


      useEffect(()=>{
            return()=>{
                  files.forEach(file=>URL.revokeObjectURL(file.preview));
                  URL.revokeObjectURL(cropResult)
            }
      },[files,cropResult])

      const handleCancelCrop=useCallback(()=>{
            setFiles([]);
            setImage(null);
            setCropResult('');
      },[])

      const handleUploadImage=useCallback(async ()=>{
            try{
                  await uploadProfileImage(image,files[0].name);
                  handleCancelCrop();
                  toastr.success('Success','Photo has been uploaded')
            }catch(error){
                  toastr.error('Oops','Something went wrong')
            }
      },[image,files,handleCancelCrop,uploadProfileImage])





      const handleSetMainPhoto=useCallback(async photo=>{
            try{
                  await setMainPhoto(photo);
            }catch(error){
                  toastr.error('Oops,error.message')
            }
      },[setMainPhoto])


      const handleDeletePhoto=useCallback(async photo=>{
            try{
                  await deletePhoto(photo)
            }catch(error){
                  toastr.error('Opps',error.message)
            }
      },[deletePhoto])


      return (
            <Segment>
                  <Header dividing size='large' content='Your photos'></Header>
                  <Grid>
                        <Grid.Row>
                              <Grid.Column width={4}>
                                    <Header color='teal' sub content='Step1-- add photo'/>
                                    <DropzoneInput setFiles={setFiles}/>
                              </Grid.Column>
                              <Grid.Column width={1}/>
                              <Grid.Column width={4}>
                                    <Header sub content='Step2-- resize photo'/>
                                    {files.length>0 &&(
                                          <CropperInput imagePreview={files[0].preview} setCropResult={setCropResult} setImage={setImage}/>
                                    )}
                              </Grid.Column>
                              <Grid.Column width={1}/>
                              <Grid.Column width={4}>
                                    <Header sub color='teal' content='Step3-- Preview and upload'></Header>
                                    {files.length>0 && (
                                          <Fragment>
                                                <Image src={cropResult} style={{minHeight:'200px',minWidth:'200px'}}/>
                                                <Button.Group >
                                                      <Button onClick={handleUploadImage} loading={loading} style={{width:'100px'}} positive icon='check'/>
                                                      <Button onClick={handleCancelCrop} disabled={loading} style={{width:'100px'}} positive icon='close'/>
                                                </Button.Group>
                                          </Fragment>
                                    )}
                              </Grid.Column>
                        </Grid.Row>
                  </Grid>
                  <Divider/>
                  <UserPhotos photos={photos} profile={profile} deltePhoto={handleDeletePhoto} setMainPhoto={handleSetMainPhoto} loading={loading}/>
            </Segment>
      )
}


export default compose(
      connect(mapState,actions),
      firestoreConnect(auth=>query(auth))
)(PhotosPage)