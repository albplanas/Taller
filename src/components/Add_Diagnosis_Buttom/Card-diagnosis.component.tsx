import React from 'react';
import { ScrollView, Alert } from 'react-native';
import {
  Card,
  Layout,
  Text,
  ButtonGroup,
  Button
} from '@ui-kitten/components';
import {Full_List} from "./feautures-list.component"
import {CloseCircleIcon,Save_Icon} from "../../assets/icons"



const Header = (props) => {

  return (
  
  <Layout style={{flexDirection:"row"}}>
            <Layout style={{justifyContent:"center",marginLeft:20}}>
                <Text status="info" category="h3" style={{textAlign:"center",}} >Features</Text>
            </Layout>
            <Layout style={{flexDirection:"row",justifyContent:"center",width:300,marginLeft:330}}>
                <Button appearance="ghost"  status ="success" style={{width:150}} icon={Save_Icon}        onPress={()=>{props.onClose();console.log("CLICK")}}></Button>
                <Button appearance="ghost" status ="danger"  style={{width:150}} icon={CloseCircleIcon}  onPress={()=>{Alert.alert(
                                                                                                                                                        'Discard Changes',
                                                                                                                                                        'Are you really sure that you want throw away the changes made so far?',
                                                                                                                                                        [{
                                                                                                                                                            text: 'Cancel',
                                                                                                                                                            onPress: () => console.log('Cancel Pressed'),
                                                                                                                                                            style: 'cancel',
                                                                                                                                                          },
                                                                                                                                                          {text: 'Throw Away', onPress: () => props.onClose()},
                                                                                                                                                        ],
                                                                                                                                                        {cancelable: false},
                                                                                                                                                      )}}/>

          </Layout>

  </Layout>
      );
    } 







export const CardDiagnosis =(props)=> <Card style={{width:800,height:600,marginLeft:240,marginTop:100}} header={()=><Header {...props}/>}  status='success'>

                  

                      <ScrollView style={{marginBottom:80}} >
                          <Full_List {...props}/>
                      </ScrollView>

                  
                  </Card>




