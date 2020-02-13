import React from 'react';
import { StyleSheet  } from 'react-native';
import {
  Layout,
  Card,
  CardHeader,
  Button
} from '@ui-kitten/components';
import { Images_Icon} from '../../../assets/icons';
import {AppRoute} from "../../../navigation/app-routes"
import {LeftList,CenterList} from "./List"



export const CardLayout=(props)=>{
    return  <Layout style={[styles.layout,{padding:1,maxWidth:props.width,minHeight:450,maxHeight:450}]} level='4'>
                <Card style={[styles.card,{width:'100%'}]} header={()=>props.type==="corner"?<HeaderCard icon={props.iconHead} title={props.title}/>:<HeaderCenterCard icon={props.iconHead} {...props}/>} status='success'>
                    <Layout style={styles.rowContainer}>
                            {props.type==="corner"?<LeftList data={props.data} setData={(obj)=>{props.setData(obj)}}/>:<CenterList  {...props}/>}
                    </Layout>
                </Card>
            </Layout>
}


const HeaderCard=(props)=>{
    return <CardHeader title={props.title}>
              <Button icon={props.icon} 
                      appearance="ghost" size="giant"  textStyle={{fontSize:20,fontFamily:"sans-serif-thin",color:"white"}}  >
                      {props.title}
              </Button>
            </CardHeader>
  }
  const HeaderCenterCard=(props)=>{

                var id=props.route.params.item.IdMaintenance

    return <CardHeader title={props.title}>
              <Button icon={props.icon} 
                      appearance="ghost" size="giant"  textStyle={{fontSize:20,fontFamily:"sans-serif-thin",color:"white"}}  >
                      {props.title}
              </Button>
              <Button icon={()=><Images_Icon color={"purple"}/>}
                                status="info" 
                                style={{maxWidth:150,marginLeft:450}}
                                onPress={()=>{props.navigation.navigate(AppRoute.CAMERA, {
                                                  from : 'edit_SO',
                                                  cod:id
                                                })}} iconName={"camera"}> NEW !</Button> 
            </CardHeader>
  }
  
  



const styles = StyleSheet.create({
            tabContainer: {
                    minHeight: 600,
            },
            container: {
                    flex: 1,
            },

            layout: {
                    flex: 1,
                    justifyContent: "flex-start",
                    alignItems: 'center',
            },

            card: {
            },

            rowContainer: {
                    flexDirection: 'row',
            },

});


