import React from 'react';
import { StyleSheet} from 'react-native';
import {
  Layout,
  Card,
  Text,
  Button,
  CardHeader,
} from '@ui-kitten/components';
import {PlusIcon } from '../../assets/icons';

import {ListChanges} from "./List";

/***
 * 
 * ************   PROPS       *************
 * width
 * actionHeaderLeft
 * iconHead
 * description
 * title
 * {...props}
 *  */

export const CardLayout=(props)=>{
    return  <Layout style={[styles.layout,{padding:5,paddingRight:0,minHeight:450,maxHeight:500}]} level='2'>
                <Card style={[styles.card,{width:410,paddingHorizontal:0}]} header={()=><HeaderCard actionHeaderLeft={props.actionHeaderLeft}icon={props.iconHead} description={props.description} title={props.title}/>} status='success'>
                    <Layout style={styles.rowContainer}>
                        <ListChanges {... props}/>
                    </Layout>
                </Card>
            </Layout>
}

const HeaderCard=(props)=>{

          return <CardHeader title={props.title}  >
                          <Button icon={props.icon} 
                                  appearance="ghost" status={"basic"} size="giant"  textStyle={{fontSize:20,fontFamily:"sans-serif-thin",}}  >
                                  {props.title}
                                  
                          </Button>
                      
                        {props.description===undefined?null:<Text category="c1" status="warning">{"( "+props.description+" )"}</Text>} 
                          <Button icon={PlusIcon} 
                                                      status="primary" 
                                                      size="large" 
                                                      style={{marginLeft: 'auto',marginRight:18,borderRadius:30,width:60,height:60}} 
                                                      onPress={props.actionHeaderLeft}/>
                        
                  </CardHeader>
          }

const styles = StyleSheet.create({

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
    paddingHorizontal:0
  },
});