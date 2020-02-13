import React, { Component } from 'react';
import {
Button,
  Popover,
  Text,Layout,Icon
} from '@ui-kitten/components';
import { StyleSheet} from 'react-native';
import {Button_With_Animation} from "./Button_withAnimation"
import {TrashAltIcon} from "../assets/icons"
const PopoverContent = () => (
    <Layout style={styles.popoverContent} level={"3"}>
      <Layout style={styles.itemPopOver} level={"3"}>
          <Icon name='edit-2-outline' width={24} height={24} fill='#3366FF' />
          <Text> Notes Button:       You can add some notes that you consider relevant to this service order.</Text>
      </Layout>
      <Layout style={styles.itemPopOver} level={"3"}>
          <Icon name='camera' width={24} height={24} fill='#3366FF' />
          <Text> Camera Button:    You can add some pictures that you consider relevant to this service order.</Text>
      </Layout>
      <Layout style={styles.itemPopOver}level={"3"} >
          <Icon name='paper-plane' width={24} height={24} fill='#3366FF' />
          <Text> SEND Button:       When everything is done you can use this button to open the service order.</Text>
      </Layout>
    </Layout>
  );
  
  const Delete_Confirmation = (Delete,cancel) => (
    <Layout style={styles.popoverContent} level={"3"}>
      <Layout style={styles.itemPopOver} level={"3"}>
          <Text category="h4">Confirmation</Text>
      </Layout>
      <Layout style={styles.itemPopOver} level={"3"}>
          <Text category="h6">Do you really want to delete this Item?</Text>

         
      </Layout>
      <Layout style={styles.itemPopOverButtons} level={"3"}>
        <Button status={"basic"} style={{marginRight:20}} onPress={()=>cancel()}>Cancel</Button>
        <Button status={"danger"} onPress={()=>{
          Delete();
          cancel();
          }}>Delete</Button>
      </Layout>
      
    </Layout>
  );


export const Button_With_POPOVER = (props) => {

    const [visible, setVisible] = React.useState(false);
  
    const togglePopover = () => {
      setVisible(!visible);
    };
    const renderIcon = (style) => (
        <Icon
          {...style}
          name={props.iconName}
          onPress
        />
      );
  
    return (
      <Popover
        visible={visible}
        content={props.content==="delete"?Delete_Confirmation(props.onPress,togglePopover):PopoverContent()}
        onBackdropPress={togglePopover}
        style={{margin:30}}>
       <Button status={props.status}
                style={{maxHeight:300, margin:20}}  
                appearance={props.appe} 
                onPress={togglePopover} 
                icon={props.iconName===null?TrashAltIcon:renderIcon}>{props.ButtonName}</Button>
    
      </Popover>
    );
  };
  

  const styles = StyleSheet.create({
    container: {
        minHeight: 50,
        marginLeft:5
      },
      itemPopOver:{
        
        flex: 1,
        flexDirection: 'row',
        marginBottom:25
      },
      button: {
        margin: 8,
      },
      itemPopOverButtons:{
      justifyContent:"center",
        flex: 1,
        padding:10,
        flexDirection: 'row',
        minWidth:300
      },
      popoverContent: {
        justifyContent: 'center',
        alignItems: "center",
        padding: 24,
      },
  });
