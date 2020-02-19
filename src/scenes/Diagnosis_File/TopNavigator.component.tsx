/**
 * IMPORTANT: To use Icon component make sure to follow this guide:
 * https://akveo.github.io/react-native-ui-kitten/docs/guides/icon-packages
 */

import React from 'react';
import {
  Icon,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

const BackIcon = (style) => (
  <Icon {...style} name='arrow-back'/>
);

const EditIcon = (style) => (
  <Icon {...style} name='edit'/>
);

const MenuIcon = (style) => (
  <Icon {...style} name='more-vertical'/>
);

const BackAction = (props) => (
  <TopNavigationAction {...props} icon={BackIcon}/>
);

const EditAction = (props) => (
  <TopNavigationAction {...props} icon={EditIcon}/>
);

const MenuAction = (props) => (
  <TopNavigationAction {...props} icon={MenuIcon}/>
);

export const TopNavigationDiagnosis = (props) => {

  const onBackPress = () => {
      props.navigation.goBack();
  };

  const renderLeftControl = () => (
    <BackAction onPress={onBackPress}/>
  );

  const renderRightControls = () => [
    <EditAction/>,
    <MenuAction/>,
  ];

  return (
    <TopNavigation
      title={props.title}
      subtitle={props.subtitle}
      alignment="center"
      titleStyle={{paddingTop:10,marginTop:12,fontSize:32,color:"white"}}
      subtitleStyle={{marginBottom:10,paddingTop:10,fontSize:20,color:"#f8f9fa"}}
      leftControl={renderLeftControl()}
      rightControls={renderRightControls()}
      style={{backgroundColor:"#007bff",paddingBottom:10,height:70}}
    />
  );
};