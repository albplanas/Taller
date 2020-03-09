import React from 'react';
import { StyleSheet,ScrollView, Alert,Image } from 'react-native';
import {
  ListItem,
  List,
  Avatar, Button
} from '@ui-kitten/components';
import {Img_Src} from "../../assets/iconArrays.js"
import {AppRoute} from "../../navigation/app-routes"






 export  const ListChanges = (props) => {

 
      
      const renderItem = ({ item, index }) => {

                                            const GoHead=()=>{ 
                                                                   // console.log("props.navigation",props.navigation) 
                                                                    props.navigation!==undefined?
                                                                                                  props.navigation.navigate(AppRoute.DIAGNOSIS_FILE,
                                                                                                                            {
                                                                                                                                  item:item,
                                                                                                                                  DiagnosisArrayOriginal:[1],
                                                                                                                                  idmechanic:props.idmechanic,
                                                                                                                                  type:props.type
                                                                                                                            }):null}
                                            const GoSignature=()=>{ 
                                                                  // console.log("props.navigation",props.navigation) 
                                                                  props.navigation!==undefined?
                                                                  props.navigation.navigate(AppRoute.SIGNATURE,
                                                                                            {
                                                                                                  item:item,
                                                                                                  DiagnosisArrayOriginal:[1],
                                                                                                  idmechanic:props.idmechanic,
                                                                                            }):null}                                                                                                         
                                             const   onSign=()=>Alert.alert(
                                                                                item.SubTitle+"  Close Diagnosis",
                                                                                'If you want to close this diagnosis press Signature, in other way press Cancel',
                                                                                [ {
                                                                                    text: 'Cancel',
                                                                                    onPress: () => console.log('Cancel Pressed'),
                                                                                
                                                                                  },
                                                                                  {text: 'Signature', onPress: () => GoSignature(),style: 'destructive'},
                                                                                ],
                                                                                {cancelable: false},
                                                                              )
                                          const   onPress=()=>Alert.alert(
                                                                                item.SubTitle+" Edition",
                                                                                'If yo want to edit this diagnosis press Edit, in other way press Cancel',
                                                                                [ {
                                                                                    text: 'Cancel',
                                                                                    onPress: () => console.log('Cancel Pressed'),
                                                                                
                                                                                  },
                                                                                  {text: 'Edit', onPress: () => GoHead(),style: 'destructive'},
                                                                                ],
                                                                                {cancelable: false},
                                                                              )                                  
                                            const src=Img_Src[item.categoryId-1];
                                            const buttonSign=()=><Button appearance="outline" onPress={onSign} icon={props.iconSet()[1]} />

                                            const icon=()=><Avatar style={styles.avatar}  source={src.src}/>   
                                                                        
                                            return <ListItem
                                                                                  title={item.Title}
                                                                                  titleStyle={{fontSize:20,marginBottom:5}}
                                                                                  status="primary"
                                                                                  description={item.SubTitle}
                                                                                  descriptionStyle={{fontSize:16}}
                                                                                  onPress={onPress}
                                                                                  accessory={
                                                                                                props.type==="diagnosis"?null
                                                                                                                      :item.signed===true?
                                                                                                                                            props.iconSet()[2]:buttonSign
                                                                                                                                          }
                                                                                  icon={icon}
                                                                                  key={"review_diag_"+item.SubTitle+index}
                                                                                />
                                                
                                                  };


          
       
  
        return     <List
                          data={props.data}
                          renderItem={renderItem}
                         style={{maxHeight:340}}
                        />
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
      backgroundColor:'white'
    },
    headerImage: {
      flex: 1,
      height: 100,
      width:100,
      alignSelf:"center",
      marginBottom:5
     
      
    }
  });
  
  
  
  
  
  
  
  