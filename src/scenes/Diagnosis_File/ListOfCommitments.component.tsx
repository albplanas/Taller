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
import { StyleSheet  } from 'react-native';

import {InfoIcon,Info_Icon} from "../../assets/icons"


export const ListOfCommitments = (props) => {



  const renderItemIcon = (style) => (
    <Icon {...style} name='person'/>
  );

  const renderItem = ({ item, index }) => {

    const onPress=()=>props.setItemselect(index);

    const renderItemAccessory = (style) =>  <Button style={style} status ="info"  icon ={InfoIcon} onPress={onPress}> Info</Button>
console.log(props.itemselect)
    return (

        <ListItem
          title={`${item.title} ${index + 1}`}
          titleStyle={props.itemselect===index?styles.titleselect:null}
          description={`${item.description} ${index + 1}`}
          style={props.itemselect===index?styles.select:null}
          icon={renderItemIcon}
          accessory={renderItemAccessory}
        />
      );
  }
  

  return (
    <>
    <CardHeader
    title="History's Commitments"
    titleStyle={{fontSize:16}}
    description='By Mechanics'
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
    titleselect:{
        color:'#007bff'
    }
  });
  











