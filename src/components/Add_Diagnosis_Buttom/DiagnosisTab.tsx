import React, { Component } from 'react';
import { StyleSheet  } from 'react-native';
import {
  Layout,
} from '@ui-kitten/components';



import {MultiCard} from "./modal-diagnosis-selector.componet"
import {diagnosisFeatures} from "../../scenes/EditServiceOrder/Mechanics/auxiliarFunc"
//import {storeData} from "../globalJSFunctions"


export const DiagnosisChart =(props)=>{


          
          return <Layout style={[styles.tabContainer,{marginBottom:300}]}>
                  <MultiCard  
                              featureTree={diagnosisFeatures(props.FeaturesList)} 
                              listChecked={props.DiagnosisArrayOriginal}
                              {...props}
                              onUpdate_DIAGNOSIS={(pro,val)=>{
                                props.setDiagnosisArrayOriginal(val);
                                props.onUpdate_DIAGNOSIS(pro,val);
                              }}
                              origen={"diagnosis"}
                  />
          </Layout>
  
        }
  
  
      
  
  
  
    
  const styles = StyleSheet.create({
    tabContainer: {
      minHeight: 600,
    },
  });