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



export const InputComponent = (props) => {

  const [value, setValue] = React.useState('');
  const isNotEmpty = value && value.length > 0;

  const setThisValue=(val)=>{
    setValue(val);
    props.setThisValue(val)
  }

  useEffect(()=>{
    setValue(props.initialValue)
  },[])

  return (
    <Input
      placeholder={props.placeholder}
      status={isNotEmpty ? 'success' : 'danger'}
      caption={isNotEmpty ? '' : props.caption}
      value={value}
      label={props.label}
      style={{padding:8,paddingVertical:12}}
      textStyle={props.textStyle}
      onChangeText={setThisValue}
      icon={props.icon}
    />
  );
};