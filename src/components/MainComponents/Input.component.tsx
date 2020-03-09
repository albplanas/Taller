import React,{useEffect} from 'react';
import { Input } from '@ui-kitten/components';





/*****PROPS*********
 * 
 *     placeholder = string
 *     caption = string
 *     initialValue = string
 *     setThisValue = function
 *
 ********************/

const isNumber=/([0-9]|['.'])$/g

export const InputComponent = (props) => {


  const setThisValue=(val)=>{

      val.length>0?
                      props.justNumber===true ? 
                                                  isNumber.test(val) ?  props.setThisValue(val)  : null  
                                                  :props.setThisValue(val)
                      :props.setThisValue(val)
   
  }


  return (
    <Input
      placeholder={props.placeholder}
      status={props.value && props.value.length > 0 ? 'success' : 'danger'}
      caption={props.value && props.value.length > 0 ? '' : props.caption}
      value={props.value}
      label={props.label}
      style={{padding:8,paddingVertical:12}}
      textStyle={props.textStyle}
      onChangeText={setThisValue}
      icon={props.icon}
    />
  );
};