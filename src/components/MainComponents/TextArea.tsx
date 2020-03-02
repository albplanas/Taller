import React, { useEffect,useState } from 'react';
import { StyleSheet  } from 'react-native';
import {
  Layout,Input
} from '@ui-kitten/components';

export const TextArea =(props)=>{

          
          return <Layout style={props.styles} level={props.level}>
                 <Input
                            multiline={true}
                            numberOfLines={4}
                            style={{width:props.width!==undefined?props.width:300,margin: 8,}}
                            placeholder={props.placeholder}
                            value={props.text}
                            onChangeText={props.setText}
                            status={props.validation!==null && props.validation!==undefined ? props.validation===true? 'success' : 'danger':""}
                            caption={props.validation!==null && props.validation!==undefined ? props.validation===true?  'Look Great' : props.caption:""}
                            size="large"
                            label={props.label}
                            autoCorrect={false}
                 />
          </Layout>
  
        }


  
      
  
  
  
    
  const styles = StyleSheet.create({

  });