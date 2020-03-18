import React from 'react';
import { StyleSheet,ScrollView, Alert,Image } from 'react-native';
import {
  ListItem,
  Icon,
  List,
  Avatar, Button
} from '@ui-kitten/components';
import {Img_Src} from "../../assets/iconArrays.js"
import {AppRoute} from "../../navigation/app-routes"
import {default as color} from "../../styles/color.json"
import {Sign_Diag_SO,Read} from "../../SQL/SendSOData/Diagnosis_Service_Order"




const Icon_Done = () => (
  <Icon name='done-all-outline' width={32} height={32} fill={color.green}/>
);
const Icon_Available = (props) => (
  <Icon onPress={props.onPress} name='file-text-outline' width={32} height={32} fill={color.indigo}/>
);
const Icon_Info = (props) => (
  <Icon onPress={props.onPress} name='folder-add-outline' width={32} height={32} fill={color.yellow}/>
);

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
                                                                 // console.log(item) 
                                                                  props.navigation!==undefined?
                                                                  props.navigation.navigate(AppRoute.SIGNATURE,
                                                                                            {       
                                                                                                  name: item.SubTitle+ "  IS DONE 😎",
                                                                                                  callback:()=>{
                                                                                                                  Sign_Diag_SO(item.idDiagnosis,1,props.Refresh)
                                                                                                                }
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
                                           

                                            const icon=()=><Avatar style={styles.avatar}  source={src.src}/>   
                                              
                                            return <ListItem
                                                                                  title={item.Title}
                                                                                  titleStyle={{fontSize:20,marginBottom:5,color:item.orderclosed!==undefined?"#f0ad4e":"white"}}
                                                                                  status="primary"
                                                                                  description={item.SubTitle}
                                                                                  descriptionStyle={{fontSize:16,color:item.orderclosed!==undefined?"#665B33":"#868e96"}}
                                                                                  onPress={onPress}
                                                                                  accessory={
                                                                                                props.type==="diagnosis" || item.orderclosed===undefined?
                                                                                                                      Icon_Info:
                                                                                                                      item.orderclosed===true?
                                                                                                                      Icon_Done:
                                                                                                                      ()=><Icon_Available onPress={onSign}
                                                                                                                      />
                                                                                                                                          }
                                                                                  icon={icon}
                                                                                  key={"review_diag_"+item.SubTitle+index}
                                                                                  style={{marginLeft:0,paddingHorizontal:0}}
                                                                                />
                                                
                                                  };


          
       
  
        return     <List
                          data={props.data}
                          renderItem={renderItem}
                         style={{maxHeight:340,paddingHorizontal:0}}
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
  
  
  
  
  
  
  
  