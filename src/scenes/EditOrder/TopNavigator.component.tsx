import React ,{useEffect} from 'react';
import {
  Layout,
  Text,
  Spinner,
  Button,
  ListItem 
} from '@ui-kitten/components';

import { Upload_Icon,Close_Icon} from '../../assets/icons';















export const TopNavigationComponent = (props) => (
  <Layout level="4" style={{minHeight:122,justifyContent: 'center',padding:10}}>
    <Layout style={{ justifyContent: 'center',alignItems: 'center',marginBottom:5}} 
            level="4"
            >
      <Text category="h6" status={"warning"}>EDIT SERVICE ORDER </Text>
      <Text category="h1">EQUIPMENT :   {props.route.params.item.cod} </Text>
    </Layout>
    {
      props.Refreshing===true?
      <Loading text={"Refreshing ...."}/>
      :    <Layout style={{ flexDirection: 'row',justifyContent: 'center',}} level="4">
       
              <Button style={{margin:8,minWidth:200}} 
                      size='giant' 
                      icon ={ Close_Icon}
                      status="danger"
                      onPress={()=>{props.navigation.goBack()}}
                      >Continue Later</Button>
                      
              <Button style={{margin:8,minWidth:200}} 
                      status="success" 
                      size='giant' 
                      icon ={Upload_Icon}
                      onPress={()=>props.Send_Data()}>
                        EDIT ORDER
              </Button>
          </Layout>
    }

  </Layout>
);
 

export const Loading =(props)=>{
  return <Layout style={{flexDirection: 'row',
  width:350,
  alignSelf:"center",
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',}}>
          <ListItem 
                      title={props.text}
                      
                      style={{width:200,alignSelf:"center"}}           
          />
          <Spinner size='giant' status='info'/>
          </Layout>
  
  

}

