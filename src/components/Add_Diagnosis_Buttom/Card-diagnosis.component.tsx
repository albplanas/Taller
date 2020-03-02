import React ,{useEffect,useState} from 'react';
import { ScrollView, Alert } from 'react-native';
import {
  Card,
  Layout,
  Text,
  ButtonGroup,
  Button,
  Spinner
} from '@ui-kitten/components';
import {Full_List} from "./feautures-list.component"
import {CloseCircleIcon,Save_Icon} from "../../assets/icons"







const Header = (props) => {

  const onPressBack=()=>{
    //console.log( props.allowUpdate)
                          props.allowUpdate? Alert.alert(
                          'Check Explanation', 'Any Change made and not saved will be missed, Please Click on Go Back to check any green button on the list, the other way Click on Go Forward to continue',
                          [{ text: 'Go Back', onPress: () => console.log('Cancel Pressed'), style: 'cancel',
                          }, {text: 'Forward', onPress: () => props.onClose()}],{cancelable: false},):
                          Alert.alert(
                            'COMPLETE FIELDS REQUIREDS', 'YOU MUST COMPLETE ALL OF TEXT BOX BEFORE YOU UPLOAD DATA',
                            [{ text: 'GO TO TEXT BOX', onPress: () => console.log('Cancel Pressed'), style: 'cancel',
                            },],{cancelable: false},)
                          }
  return <Layout style={{flexDirection:"row"}}>
                            <Layout style={{justifyContent:"center",marginLeft:20}}>
                            <Text status="info" category="h3" style={{textAlign:"center",}} >Features  </Text>
                            </Layout>
                            <Layout style={{width:660}}>  
                                <Button appearance="ghost"  status ="danger" style={{width:140,alignSelf:"flex-end"}} icon={CloseCircleIcon}        
                                          onPress={onPressBack}
                                ></Button>
                            </Layout>

                  </Layout>
      
    } 







export const CardDiagnosis =(props)=> 
                    <Card style={{width:800,height:600,marginLeft:240,marginTop:100}} 
                                            header={()=><Header allowUpdate={props.allowUpdate} onClose={props.onClose}/>}  status='success'
                                      >
                          <Full_List {...props}/>
                             
                  </Card>



