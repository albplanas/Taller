/**
 * IMPORTANT: To use Icon component make sure to follow this guide:
 * https://akveo.github.io/react-native-ui-kitten/docs/guides/icon-packages
 */

import React from 'react';
import {
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {ArrowLeft_Icon} from "../../assets/icons"
const BackIcon = (style) => (
  <ArrowLeft_Icon {...style} size={40} color={"white"}/>
);


const BackAction = (props) => (
  <TopNavigationAction {...props} icon={BackIcon}/>
);



export const TopNavigationDiagnosis = (props) => {

  const onBackPress = () => {
      props.navigation.goBack();
  };

  const renderLeftControl = () => (
    <BackAction onPress={onBackPress}/>
  );


  return (
    <TopNavigation
      title={props.title}
      subtitle={props.subtitle}
      alignment="center"
      titleStyle={{paddingTop:10,marginTop:12,fontSize:32,color:"white"}}
      subtitleStyle={{marginBottom:10,paddingTop:10,fontSize:20,color:"#f8f9fa"}}
      leftControl={renderLeftControl()}
      style={{backgroundColor:"#007bff",paddingBottom:10,height:70}}
    />
  );
};