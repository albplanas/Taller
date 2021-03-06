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
  Layout,
  Spinner,
} from '@ui-kitten/components';
import { StyleSheet ,ToastAndroid } from 'react-native'; 

import {Add_User_Icon,FileSignature_Icon,DoneAllIcon} from "../../assets/icons"
import {AppRoute} from "../../navigation/app-routes"

import {default as color } from "../../styles/color.json"








export const ListOfCommitments = (props) => {
  
  const AddLabor_Button=()=><Button onPress={()=>{
                                                      props.AddLabor();
                                                      ToastAndroid.showWithGravityAndOffset(
                                                        'New labor was added!',
                                                        ToastAndroid.LONG,
                                                        ToastAndroid.TOP,
                                                        25,
                                                        50,
                                                      );
                                                    }} 
                                    appearance="outline" 
                                    icon={()=><Add_User_Icon  fill="#007bff"/>}/>

  const renderItemIcon = (style) => (
    <Icon {...style} name='person'/>
  );
  const renderItemIconDB = (style) => (
    <Icon {...style} name='layers-outline' fill={color.orange}/>
  );


  const renderItem = ({ item, index }) => {

    const onPress=()=>props.setItemselect(index);
    const onSign=()=>props.navigation.navigate(AppRoute.SIGNATURE,{name:"Approve Labor's hours",callback:()=>console.log("callback")})
    const renderItemAccessory = (style) => (
      <Layout>
             { props.type==="edit"? <Button appearance="ghost" onPress={onSign} status="warning" icon={item.signed===true?DoneAllIcon:FileSignature_Icon}/>:null}
     </Layout>
    );
  
    return (

        <ListItem
          title={item.mechanic}
          titleStyle={props.itemselect===index?styles.titleselect:null}
          description={item.date}
          style={[props.itemselect===index?styles.select:null,{marginTop:2}]}
          accessory={renderItemAccessory}
          icon={item.orderclosed!==undefined?renderItemIconDB:renderItemIcon}
          onPress={onPress}
        />
      );
  }
  
const Spi = ()=><Layout style={{marginRight:20}}><Spinner /></Layout>
  return (
    <>
    <CardHeader
                title="History's Commitments"
                titleStyle={{fontSize:16}}
                description='By Mechanics'
                icon={AddLabor_Button}
                accessory={props.spin===true?Spi:null}
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
  











