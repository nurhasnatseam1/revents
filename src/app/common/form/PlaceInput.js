import React from 'react';
import PlaceAutoComplete from 'react-places-autocomplete';
import {Form,Label,Segment,List} from 'semantic-ui-react';




const PlaceInput=({
    input:{value,onChange,onBlur},
    width,options,placeholder,onSelect,
    meta:{touched,error}
})=>{
    return(
        <PlaceAutoComplete value={value} onChange={onChange} searchOptions={options} onSelect={onSelect}>
            {
                ({getInputProps,suggestions,getSuggestionItemProps,loading})=>{
                    return(
                        <Form.Field error={touched && error}>
                        <input placeholder={placeholder} {...getInputProps({placeholder,onBlur})} />
                        {touched && error && (
                            <Label basic color='red'>{error}</Label>
                        )}
                        {suggestions.lengeth>0&&(
                            <Segment style={{marginTop:0,position:'absolute',zIndex:1000,width:'100%'}}>
                                <List selection >
                                    {suggestions.map(suggestion=>(
                                        <List.Item {...getSuggestionItemProps(suggestion)}>
                                            <List.Header>
                                                {suggestions.formattedSuggestion.secondaryText}
                                            </List.Header>
                                            <List.Description>
                                                {suggestions.formattedSuggestion.secondaryText}
                                            </List.Description>
                                        </List.Item>
                                    ))}
                                </List>
                            </Segment>

                        )}
                        </Form.Field>
                    )
                }
            }
        </PlaceAutoComplete>
    )
}

export default PlaceInput;