import React from 'react';
import { StyleSheet,ScrollView, } from 'react-native';
import {
  Card,
  CardHeader,
  Layout
} from '@ui-kitten/components';
import {Full_List} from "./feautures-list.component"




const Header = () => (
  <CardHeader title='FEATURES'/>
);







export const CardDiagnosis =(props)=> (
            <Layout style={styles.cardLayout}>

            <Card style={styles.card} header={Header}  status='success'>

            

                <ScrollView style={{marginBottom:80}} >
                    <Full_List {...props}/>
                </ScrollView>

            
            </Card>


        </Layout>
    );





const styles = StyleSheet.create({
   
      card: {
        marginVertical: 8,
      },
      cardLayout:{
        width:'60%',
        marginLeft:'20%',
        maxHeight:'85%'
      },
  });