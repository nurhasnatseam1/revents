import React from 'react';
import {Form,Label,Select} from 'semantic-ui-react';


const SelectInput=({input,type,placeholder,multiple,options,meta:{touched,error}})=>{
    return (
        <Form.Field error={error && touched}>
            <Select options={options} value={input.value||null} multiple={multiple} placeholder={placeholder} onSelect={(e,data)=>input.onChange(data.value)} ></Select>
    {touched && error (<Label basic color="red">{error}</Label>)}
        </Form.Field>
    )
}

export default SelectInput;