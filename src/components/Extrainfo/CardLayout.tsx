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
    return  <Layout style={[styles.layout,{padding:5,minHeight:450,maxHeight:600}]} level='2'>
                <Card style={[styles.card,{width:props.width}]} header={()=><HeaderCard actionHeaderLeft={props.actionHeaderLeft}icon={props.iconHead} description={props.description} title={props.title}/>} status='success'>
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
  },
});