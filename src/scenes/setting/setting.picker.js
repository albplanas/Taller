import AsyncStorage from '@react-native-community/async-storage';
//This is an example code to understand Switch// 
import React,{useEffect} from 'react';
//import react in our code. 
import { StyleSheet ,View,Alert} from 'react-native';
import {
  Card,
  CardHeader,
  Select
} from '@ui-kitten/components';





//import all the components we are going to use. 
export const PickerSetting =(props)=>{

  const [userName, setUserName] = React.useState(null);
  const [data,setData]=React.useState([]);

  useEffect(() => {
        setUserName({text:props.userName?props.userName:null});
        setData(props.list.map(e=>{
                            return { text: e.short_name }
                          }))
  },[props.userName,props.list])


    return (
              <Card style={props.styles.card}  
                    header={()=><CardHeader  title={userName===null?"SELECT USER":userName.text===null?"SELECT USER":'USER  :  '+userName.text}/>} 
                    status={props.status}>


                          <Select
                                    style={styles.select}
                                    data={data}
                                    status='warning'
                                    placeholder='Select who are using this device'
                                    selectedOption={userName}
                                    onSelect={(val)=>{setUserName(val)
                                                      funct(val,props.onUpdate_Settings)}}
                                  />
              </Card>


    );  
  } 



  const funct=(val,onUpdate_Settings)=>{
      
  var  storeData = async (value) => {
      try {
        await AsyncStorage.setItem('userName', value.text);
       
      } catch (e) {
          Alert.alert(e)
      }
    }
    onUpdate_Settings(val.text);
    storeData(val);
   
  }

  const styles = StyleSheet.create({
    select: {
      margin: 8,
    },
    controlContainer: {
      borderRadius: 4,
      margin: 8,
      backgroundColor: '#3366FF',
    },
  });