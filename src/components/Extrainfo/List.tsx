import React from 'react';
import { StyleSheet,ScrollView, Alert } from 'react-native';
import {
  ListItem,
  List,
  Avatar,
  Layout
} from '@ui-kitten/components';

import {CheckboxComponent} from "../MainComponents/CheckButton.component" 
import { InputComponent }  from "../MainComponents/Input.component"




 export  const ListChanges = (props) => {

 
      
      const renderItem = ({ item, index }) => {

                                             const   onPress=()=>{}
                          
                                   
                                                                            
                                            return  item.type==="checkbox"?
                                                                            <CheckboxComponent {...item}/>:
                                                    item.type==="inputtext"?                         
                                                                            <InputComponent {...item}/>:
                                                  
                                                  
                                                  
                                                   <Layout/>
                                                
                                                  };


          
       
  
        return     <List
                          data={props.data}
                          renderItem={renderItem}
                          style={{maxHeight:340}}
                        />
  };







  const styles = StyleSheet.create({

    rowLayout: {
      width:'100%',
      marginBottom:80,
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatar: {
      margin: 8,
      width:64,
      height:64,
      backgroundColor:'#ADD8E6'
    },
  });
  
  
  
  
  
  
  
  