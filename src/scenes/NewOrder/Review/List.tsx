import React from 'react';
import { StyleSheet,ScrollView, Alert } from 'react-native';
import {
  Layout,
  Text,
  ListItem,
  Avatar
} from '@ui-kitten/components';
import { TrashButton } from '../../../assets/icons';
import {Img_Src} from "../../../assets/iconArrays.js"
import {AppRoute} from "../../../navigation/app-routes"






 export  const ListChanges = (props) => {

 
      
      const renderItem = props.data.map(item => {

                                               const GoHead=()=>{ 
                                                                    console.log("props.navigation",props.navigation) 
                                                                    props.navigation!==undefined?
                                                                                                  props.navigation.navigate(AppRoute.DIAGNOSIS_FILE,
                                                                                                                            {
                                                                                                                                  item:item,
                                                                                                                                  DiagnosisArrayOriginal:[1],
                                                                                                                                  idmechanic:props.idmechanic,
                                                                                                                            }):null}
                                             const   onPress=()=>Alert.alert(
                                                                                item.SubTitle+" Edition",
                                                                                'If yo want to edit this diagnosis press Edit, in other way press Cancel',
                                                                                [ {
                                                                                    text: 'Cancel',
                                                                                    onPress: () => console.log('Cancel Pressed'),
                                                                                
                                                                                  },
                                                                                  {text: 'OK', onPress: () => GoHead(),style: 'destructive'},
                                                                                ],
                                                                                {cancelable: false},
                                                                              )
                                            const src=Img_Src[item.categoryId-1]
                                   
                                            const icon=()=><Avatar style={styles.avatar} size='large' source={src.src}/>                                  
                                                            return <ListItem
                                                                                  title={item.Title}
                                                                                  status="primary"
                                                                                  description={item.SubTitle}
                                                                                // icon={props.iconSet()[1]}
                                                                                  onPress={onPress}
                                                                                  accessory={props.iconSet()[1]}
                                                                                icon={icon}
                                                                                />
                                                
                                                  });


          
       
  
        return (
  
          <Layout style={[styles.rowLayout,{marginBottom:140}]}>
            <ScrollView style={{width:'100%'}}>
              {renderItem.length===0?
                    <Text status="warning" category="h5" style={{textAlign:"center", marginBottom:5}} >----------------</Text>
                    :renderItem}
            </ScrollView>
          
      </Layout>
         
        );
  };



  const styles = StyleSheet.create({

    rowLayout: {
      width:'100%',
      marginBottom:80,
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatar: {
      margin: 8,
      width:64,
      height:64,
      backgroundColor:'#ADD8E6'
    },
  });
  
  
  
  
  
  
  
  