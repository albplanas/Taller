import React ,{useState,useEffect} from 'react';
import { StyleSheet  } from 'react-native';
import {
  Layout,
} from '@ui-kitten/components';



import {MultiCard} from "./modal-diagnosis-selector.componet"
import {diagnosisFeatures} from "../../scenes/EditServiceOrder/Mechanics/auxiliarFunc"



//import {storeData} from "../globalJSFunctions"


export const DiagnosisChart =(props)=>{

  const [listChecked, setListChecked] = useState([]);


useEffect(() => {
                //console.log("DiagnosisChart")
                setListChecked(props.DiagnosisArrayOriginal.map(e=>{return {
                  activity:'disable',
                  feature: e
                }}).concat(props.DiagnosisArrayEdition.map(e=>{return {
                  ...e,
                  activity:'enable',
                
                }}))
              )

         },[props.DiagnosisArrayOriginal,props.DiagnosisArrayEdition]);
       const   onUpdate_DIAGNOSIS = (val)=>props.uploadData(val) ;
       
       
          return <Layout style={[styles.tabContainer,{marginBottom:300}]}>
                  <MultiCard  
                              featureTree={diagnosisFeatures(props.FeaturesList)} 
                              listChecked={listChecked}
                              idmechanic={props.idmechanic}
                              {...props}
                              onUpdate_DIAGNOSIS={onUpdate_DIAGNOSIS}
                  />
          </Layout>
  
        }
  
  
      
  
  
  
    
  const styles = StyleSheet.create({
    tabContainer: {
      minHeight: 600,
    },
  });