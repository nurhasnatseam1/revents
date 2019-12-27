import React, { useCallback } from 'react';
import  {useDropzone} from 'react-dropzone';
import {Icon,Header} from 'semantic-ui-react';



const DropzoneInput=({setFiles})=>{
      const onDrop=useCallback(acceptedFiles=>{
            setFiles(acceptedFiles.map(file=>({...file,preview:URL.createObjectURL(file)})))
      },[setFiles])

      const {getRootProps,getInputProps,isDragActive}=useDropzone({
            onDrop,nultiple:false,accept:'image/*'
      })

      return (
            <div {...getRootProps} className={'dropzone '+(isDragActive && 'dropzoe--isActive')}>
                  <input {...getInputProps()}/>
                  <Icon name='upload' size='huge'/>
                  <Header content='Drop image here'/>
            </div>
      )
}


export default DropzoneInput;