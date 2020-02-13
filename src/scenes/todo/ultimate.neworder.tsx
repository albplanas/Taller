/**
 * IMPORTANT: To use Icon component make sure to follow this guide:
 * https://akveo.github.io/react-native-ui-kitten/docs/guides/icon-packages
 */

import React, { Component ,PureComponent} from 'react';
import {
  TopNavigation,
  Layout,
} from '@ui-kitten/components';
import { StyleSheet} from 'react-native';
import {Button_With_Animation} from "../../components/Button_withAnimation"
import {Button_With_POPOVER} from "../../components/Button_withPopOver"

import { AppRoute } from '../../navigation/app-routes';


export const TopNav = (props) => {




  const renderRightControls = () => [
    
    <Button_With_Animation status={"warning"} appe={'ghost'} onPress={()=>{props.navigation.navigate(AppRoute.CAMERA, {
      from : 'diagnosis',
    })}} iconName={"camera"}/>,
    <Button_With_Animation   appe={'default'} status={"primary"} onPress={()=>alert("ok")} iconName={null} textName={"SEND"}/>,
  ];

  return (
    <Layout style={styles.container}>
    <TopNavigation
      title='PLACE A NEW SERVICE ORDER'
      rightControls={renderRightControls()}
     
    />
    
    </Layout>
  );
};



const styles = StyleSheet.create({
  container: {
    minHeight: 50,
    marginLeft:5
  },
  containerCamera: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});






