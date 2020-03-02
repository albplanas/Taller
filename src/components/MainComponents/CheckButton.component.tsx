import React ,{useEffect}from 'react';
import { CheckBox } from '@ui-kitten/components';


/*****PROPS*********
 * 
 * label :string
 * initial value : bool
 *
 ********************/

export const CheckboxComponent = (props) => {

  const [checked, setChecked] = React.useState(false);

  const onCheckedChange = (isChecked) => {
    setChecked(isChecked);
    props.setThisValue(isChecked)
  };
  useEffect(()=>{
    setChecked(props.initialValue)
  },[])
  return (
    <CheckBox
      checked={checked}
      onChange={onCheckedChange}
      text={props.label}
      style={{padding:8,paddingVertical:12}}
      textStyle={props.textStyle}
    />
  );
};