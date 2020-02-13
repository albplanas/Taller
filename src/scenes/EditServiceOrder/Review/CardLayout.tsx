import React from 'react';
import { StyleSheet} from 'react-native';
import {
  Layout,
  Card,
  Text,
  Button,
  CardHeader,
} from '@ui-kitten/components';


import {ListChanges} from "./List";

export const CardLayout=(props)=>{
    return  <Layout style={[styles.layout,{padding:5,minHeight:450,maxHeight:450}]} level='4'>
                <Card style={[styles.card,{width:"100%"}]} header={()=><HeaderCard icon={props.iconHead} description={props.description} title={props.title}/>} status='success'>
                    <Layout style={styles.rowContainer}>
                        <ListChanges {... props}/>
                    </Layout>
                </Card>
            </Layout>
}

export const HeaderCard=(props)=>{
return <CardHeader title={props.title}  >
          <Button icon={props.icon} 
                  appearance="ghost" size="giant"  textStyle={{fontSize:20,fontFamily:"sans-serif-thin",color:"white"}}  >
                  {props.title}
                  
          </Button>
        {props.description===undefined?null:<Text category="c1" status="warning">{"( "+props.description+" )"}</Text>} 
        </CardHeader>
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  layout: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: 'center',
  },

  card: {
    marginVertical: 8,
  },

  rowContainer: {
    flexDirection: 'row',
  },
});