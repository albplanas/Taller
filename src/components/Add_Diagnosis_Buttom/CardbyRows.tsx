import React ,{Fragment}from 'react';
import { StyleSheet ,Image} from 'react-native';
import {
  Card,
  Divider,
  Text
} from '@ui-kitten/components';


import {Img_Src} from "../../assets/iconArrays.js"
import { AppRoute } from '../../navigation/app-routes';
import {GetDataFeatures} from "../../globalFunc_Use/constructionModel"




export const CardsRow=(props)=><Fragment>
                           {
      props.arrList.map(
        (item,i)=> {


          const srcArr=Img_Src.filter(x=>x.IDSysScheme===item.Id)
          const src=srcArr.length>0?srcArr[0].src:"";


          const gotoFeature=()=>props.navigation.navigate(AppRoute.FEATURES_LIST,{
                                                                                    subtitle:"Equipment : "+props.item.cod+"  /  "+item.Title,
                                                                                    updateFunction:(newItems)=>props.updateFunction(newItems)
                                                                                    ,featuresArr:GetDataFeatures( item ,props.item,
                                                                                                                        props.diagnosis_List,
                                                                                                                        props.route.params.idmechanic,
                                                                                                                        props.route.params.IdMaintenance)
                                                                                                                    })


                                    return (<Card style={styles.card_features} 
                                                  key={"card_features"+item.Id+"_"+i}  
                                                  status='success'
                                                  onPress={gotoFeature}
                                                  >
                                                
                                                  <Image
                                                      style={styles.headerImage}
                                                      source={src}
                                                    />
                                                    <Divider style={{marginVertical:8}}/>
                                                    <Text style={{textAlign:"center"}}>{item.Title}</Text>

                                            </Card>)
                                            } 
            )}
                        </Fragment>





const styles = StyleSheet.create({
  card_features:{
    width:195,
    marginTop:10
  },

  headerImage: {
    flex: 1,
    height: 100,
    width:100,
    alignSelf:"center",
    marginBottom:5
   
    
  }
});


