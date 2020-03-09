import React  from 'react';
import {
  CheckBox,
  List,
  ListItem,
} from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

import {default as color} from "../../../styles/color.json"
import {ArrowRight_Icon} from "../../../assets/icons"





export const Listing = (props) => {


  const renderIcon=()=><ArrowRight_Icon size={32} color={color.primary}/>




  const renderItem = ({ item, index }) => {


    const onPressBox=()=>props.changeCheckBox(index)
    const onPress=()=>{props.setSelect(index)}

    const renderItem = (style) => (
      <CheckboxCase  check={item.check}
                      disabled={item.activity==="enable"?false:true}
                      setChecked={onPressBox}/>
    );
    return (
      <ListItem
        onPress={onPress}
        title={item.Description}
        titleStyle={[{fontSize:24,marginLeft:15,marginBottom:5},{color:props.select===index?color.gray_800:color.gray_200}]}
        description={(item.check===true && item.activity==="enable")?
                      (item.description.length===0||item.explanation.length===0)?
                      "Please, complete the description and explanation to upload the description successfully"
                      :"":""
                    }
        descriptionStyle={{color:color.red,fontSize:15}}
        icon={renderItem}
        style={props.select===index?styles.selected:styles.unselected}
        accessory={props.select===index?renderIcon:null}
      />
    );
  }

  return (
    <List
      data={props.data}
      renderItem={renderItem}
    />
  );
};



 const styles = StyleSheet.create({
        container: {
          flex: 1,
          flexDirection: 'row',
          marginTop:1
          },
        layout: {
          justifyContent: 'center',
          alignItems: 'center'
        },
        selected:{
          minWidth:500,
          marginVertical:2,
          paddingVertical:15,
          backgroundColor:color.gray_200,
        },
        unselected:{
          minWidth:500,
          marginVertical:2,
          paddingVertical:15,
          backgroundColor:color.gray_800,
        },

});



const CheckboxCase = (props) => {

  const onCheckedChange = (isChecked) => {
    props.setChecked(isChecked);
  };
  return (
    <CheckBox
      checked={props.check}
      disabled={props.disabled}
      onChange={onCheckedChange}
    />
  );
};





