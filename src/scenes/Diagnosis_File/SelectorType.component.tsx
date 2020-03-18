import React ,{useEffect} from 'react';

import {DiagnosisFileScreen} from "./diagnosisFile.component";
import {EditFileScreen} from "./EditdiagnosisFile.component"





export const SelectorScreen =(props)=>{

 

/******************* STATE TO SUBMIT *******************/
  



 return props.type==="diagnosis"? <DiagnosisFileScreen        
                                                          language={props.language}
                                                          userName={props.userName}
                                                          FeaturesTruck={props.FeaturesTruck}
                                                          FeaturesList={props.FeaturesList}
                                                          MechanicList={props.MechanicList}
                                                          navigation={props.navigation}
                                                          route={props.route}
                                                          imgList={props.imgList}
                                                          onUpdate_LIST={props.onUpdate_LIST}
                                                          diagnosis_List={props.diagnosis_List}
                                                          onUpdate_DIAGNOSIS={props.onUpdate_DIAGNOSIS}
                                                          truckid_Diagnosis={props.truckid_Diagnosis}
                                                          Opened_S_O={props.Opened_S_O}
                                                          UPDATE_Clock_LIST={props.UPDATE_Clock_LIST}
                                                          ExtraInfo_Diagnosis={props.ExtraInfo_Diagnosis}
                                                          Clock_List={props.Clock_List}
                                      />:<EditFileScreen 
                                                          language={props.language}
                                                          userName={props.userName}
                                                          FeaturesTruck={props.FeaturesTruck}
                                                          FeaturesList={props.FeaturesList}
                                                          MechanicList={props.MechanicList}
                                                          navigation={props.navigation}
                                                          route={props.route}
                                                          imgList={props.imgList}
                                                          onUpdate_LIST={props.onUpdate_LIST}
                                                          diagnosis_List={props.diagnosis_List_SO}
                                                          onUpdate_DIAGNOSIS={props.onUpdate_DIAGNOSIS_SO}
                                                          truckid_Diagnosis={props.truckid_Diagnosis}
                                                          Opened_S_O={props.Opened_S_O}
                                                          UPDATE_Clock_LIST={props.UPDATE_Clock_LIST}
                                                          ExtraInfo_Diagnosis={props.ExtraInfo_Diagnosis_SO}

                                                          Clock_List={props.Clock_List}/>
}








