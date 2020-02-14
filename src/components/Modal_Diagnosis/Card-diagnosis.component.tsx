import React from 'react';
import { StyleSheet,ScrollView, Text, } from 'react-native';
import {
  Card,
  CardHeader,
  Layout,
  Button
} from '@ui-kitten/components';
import {Full_List} from "./feautures-list.component"
import {CloseCircleIcon} from "../../assets/icons"



const Header = (props) => (
  <CardHeader title="">
    <Layout style={{flex:1,flexDirection:"row"}} >
          <Button appearance="ghost" icon={CloseCircleIcon} onPress={props.onClose}></Button>
    </Layout>
    </CardHeader>
);







export const CardDiagnosis =(props)=> (
            <Layout style={styles.cardLayout}>

                  <Card header={()=><Header onClose={props.onClose}/>}  status='success'>

                  

                      <ScrollView style={{marginBottom:80}} >
                          <Full_List {...props}/>
                      </ScrollView>

                  
                  </Card>


        </Layout>
    );





const styles = StyleSheet.create({
   
      cardLayout:{
        width:'60%',
        marginLeft:'20%',
      },
  });