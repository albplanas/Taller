/**
 * This example demonstrates how simply could be composed List Item
 * with classic layouts like icon at the left, forward button at the right, etc.
 *
 * IMPORTANT: To use Icon component make sure to follow this guide:
 * https://akveo.github.io/react-native-ui-kitten/docs/guides/icon-packages
 */

import React from 'react';
import {
  Button,
  Icon,
  CardHeader,
  List,
  ListItem,
} from '@ui-kitten/components';
import { StyleSheet ,ToastAndroid } from 'react-native'; 

import {Add_User_Icon,FileSignature_Icon,DoneAllIcon} from "../../assets/icons"









export const ListOfCommitments = (props) => {
  
  const AddLabor_Button=()=><Button onPress={()=>{
                                                      
                                                      ToastAndroid.showWithGravityAndOffset(
                                                        'New labor was added!',
                                                        ToastAndroid.LONG,
                                                        ToastAndroid.CENTER,
                                                        25,
                                                        50,
                                                      );
                                                    }} 
                                    appearance="ghost" 
                                    icon={()=><Add_User_Icon  fill="#007bff"/>}/>

  const renderItemIcon = (style) => (
    <Icon {...style} name='person'/>
  );



  const renderItem = ({ item, index }) => {

    const onPress=()=>props.setItemselect(index);
    const renderItemAccessory = (style) => (
     <Button appearance="ghost" onPress={()=>console.log("fg")} icon={item.signed===true?DoneAllIcon:FileSignature_Icon}/>
    );
  
    return (

        <ListItem
          title={item.mechanic}
          titleStyle={props.itemselect===index?styles.titleselect:null}
          description={item.date}
          style={props.itemselect===index?styles.select:null}
          accessory={renderItemAccessory}
          icon={renderItemIcon}
          onPress={onPress}
        />
      );
  }
  

  return (
    <>
    <CardHeader
                title="History's Commitments"
                titleStyle={{fontSize:16}}
                description='By Mechanics'
                icon={AddLabor_Button}
              />
    <List
        style={{minWidth:500}}
      data={props.enablelist}
      renderItem={renderItem}
    />
    </>
  );
};


const styles = StyleSheet.create({
    select: {
      backgroundColor: "#212529",
      
    },
    buttonGroup:{
      margin:8
    },
    titleselect:{
        color:'#ffc107'
    }
  });
  











