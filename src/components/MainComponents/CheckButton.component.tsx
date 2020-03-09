import React ,{useEffect}from 'react';
import { CheckBox } from '@ui-kitten/components';


/*****PROPS*********
 * 
 * label :string
 * initial value : bool
 *
 ********************/

export const CheckboxComponent = (props) => {

  const onCheckedChange = (isChecked) => {
    props.setThisValue(isChecked)
  };

  return (
    <CheckBox
      key={"key_"+props.label}
      checked={props.value}
      onChange={onCheckedChange}
      text={props.label}
      style={{padding:8,paddingVertical:12}}
      textStyle={props.textStyle}
    />
  );
};