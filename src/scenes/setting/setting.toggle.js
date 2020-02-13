
//This is an example code to understand Switch// 
import React,{useEffect} from 'react';
//import react in our code. 
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Card,
  CardHeader,
  Text,
  Toggle
} from '@ui-kitten/components';

//import all the components we are going to use. 

var  storeData = async (key,value) => {
  try {
    await AsyncStorage.setItem(key, value);
   
  } catch (e) {
      Alert.alert(e)
  }
}

export const SwitchSetting =(props)=>{

    const [checked, setChecked] = React.useState(false);

    useEffect(() => {
 
      setChecked(props.param===true?true:false);
      },[props.param,props.header])

    return (
      <Card style={props.styles.card}  
            header={()=><CardHeader  title={props.header==='LENGUAGE'?'LANGUAGE':'THEME'}/>} 
            status={props.status}>

      <Text status='basic'>   {props.lang?props.text.eng:props.text.spa}   </Text>
      <Toggle
                  style={stylesToggle.toggle}
                  text={props.header==="LENGUAGE"? props.param?"ENGLISH":"ESPANOL":
                        props.header==="THEME"?    props.param?"DARK":"LIGHT":
                        ""}
                  status={props.status}
                  checked={checked}
                  onChange={(val)=>{
                                       
                                          storeData(props.header==="LENGUAGE"?"language":"theme", props.header==="LENGUAGE"? val?"ENGLISH":"ESPANOL":
                                                      props.header==="THEME"?    val?"DARK":"LIGHT":
                                                      "")
                                          props.onUpdate_Settings(val)
                                          setChecked(val)
                                        }}
    
      />
    </Card>


    );  
  } 



const stylesToggle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  toggle: {
    margin: 4,
  },
  controlContainer: {
    borderRadius: 4,
    margin: 4,
    backgroundColor: '#3366FF',
  },
});