import AsyncStorage from '@react-native-community/async-storage';
import {difference_A_B} from "./helperFunc"
import React from 'react';
import { Alert,ToastAndroid } from 'react-native';




function  deleteLabor(id,oldArr,onUpdate_EDIT_SO){

  var f=oldArr.filter(e=>e.localId!==id)

  
        var storeData = async () => {
              try {
              await AsyncStorage.setItem("SO_MechanicLabor_OffLine", JSON.stringify(f))
              ToastAndroid.showWithGravityAndOffset(
                'The Item has been deleted !!!',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
              )
              } catch (e) {
              alert("Something was wrong: "+e)
              }
          }
          storeData();
          onUpdate_EDIT_SO("SO_MechanicLabor_OffLine",f)
    }

    function  storageLabor(val,oldArr,onUpdate_EDIT_SO,Clean){

                var f=[val].concat(oldArr)

                
            var storeData = async () => {
                    try {
                    await AsyncStorage.setItem("SO_MechanicLabor_OffLine", JSON.stringify(f))
                    Clean();
                    } catch (e) {
                    alert("Something was wrong: "+e)
                    }
                }
                storeData();
                onUpdate_EDIT_SO("SO_MechanicLabor_OffLine",f)
    }



  function  storageDiagnosis(val,id,oldArr,origArr,onUpdate_EDIT_SO){
    
    var f=oldArr.filter(d=>d.IdMaintenance===id).length>0?
                                                                                    oldArr.map(x=>{
                                                                                        
                                                                                        return x.IdMaintenance===id?{
                                                                                                                          IdMaintenance:id,
                                                                                                                          plus:difference_A_B(val,origArr),
                                                                                                                          cancel:difference_A_B(origArr,val),
                                                                                                                          snap: val
                                                                                                                      }:x

                                                                                    }):oldArr.concat({
                                                                                                                                    IdMaintenance:id,
                                                                                                                                    plus:difference_A_B(val,origArr),
                                                                                                                                    cancel:difference_A_B(origArr,val),
                                                                                                                                    snap: val
                                                                                                                                })

    
   var storeData = async () => {
        try {
          await AsyncStorage.setItem("SO_Diagnosis_OffLine", JSON.stringify(f))
          ToastAndroid.showWithGravityAndOffset(
            'The Diagnosis list has been updated!!!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          )
        } catch (e) {
          alert("Something was wrong: "+e)
        }
      }
      storeData();
      onUpdate_EDIT_SO("SO_Diagnosis_OffLine",f)
}


function PrepareData(arr) {


    var IdArr=[...new Set(arr.map(e=>e.idMaintenanceLabor))];
    
    
    return IdArr.map(id=>{
       var pieces=arr.filter(x=>x.idMaintenanceLabor===id).map(p=>{
           return {
                        idcodpieces:p.idcodpieces,
                        Pieces:p.Pieces,
                        qty:p.qty
                    }})

        var elem=  arr.filter(x=>x.idMaintenanceLabor===id)[0]     
        
     return    {
                    idMaintenanceLabor:id,
                    name: elem.short_name,
                    date: elem.date!==null?elem.date.date.slice(0,10):null,
                    diagnosis:[],
                    activity:[],
                    hrs:elem.hours,
                    notes:elem.note,
                    pieces:pieces,
                    idMechanics:elem.idMechanics,
                    IdMaintenance:elem.IdMaintenance
                }            
    })

}

function diagnosisFeatures(FeaturesList){
    var Idtitles=FeaturesList.map(e=>e.Id);
  
    var IdArray=[...new Set(Idtitles)];
    return IdArray.map(n=>{
    
                        var ElemB=FeaturesList.filter(ml=>ml.Id===n);
                      
                          return {
                            Title:ElemB[0].Title,
                            Id:n,
                            Subarr:ElemB.map(elem=>{
                                return {
                                  SubId:elem.SubId,
                                  Description:elem.Description
                                }
                            })
                        }
                      })
}


function makeNotes(diagnostic,activity,pieces){

      var d =diagnostic.map(e=>e.text+" ( "+e.Title+" ), ").join("");
      var a =activity.map(e=>e.text+", ").join("");
      var p =pieces.map(e=>e.text+", ").join("")
      return "DIAGNOSES INVOLVED : " + d +
             ".*. ACTIVITY INVOLVED : "+a+
             ".*. PIECES INVOLVED : "+p+" .*.*."
}

function DescomposeNotes(notes){
  //console.log(notes.split(".*. ACTIVITY INVOLVED") )
  var diagnosis=notes===undefined ? "---":
                                          notes.split(".*. ACTIVITY INVOLVED").length === 1 ? 
                                          "---" : notes.split(".*. ACTIVITY INVOLVED")[0].split("DIAGNOSES INVOLVED : ");
  var activity= notes===undefined ? "---":
                                          notes.split(".*. PIECES INVOLVED :").length === 1 ? 
                                          "---" : notes.split(".*. PIECES INVOLVED")[0].split(".*. ACTIVITY INVOLVED : ");
  var pieces= notes===undefined ? "---":
                                          notes.split(".*.*.").length === 1 ? 
                                          "---" : notes.split(".*.*.")[0].split(".*. PIECES INVOLVED : "); 
          return {
            diagnosis   :diagnosis.length>1?diagnosis[1]:"No Apply",
            activity    :activity.length>1?activity[1]:"No Apply",
            pieces      :pieces.length>1?pieces[1]:"No Apply"
          }
}

  export{
    storageDiagnosis,
    PrepareData,
    diagnosisFeatures,
    storageLabor,
    makeNotes,
    DescomposeNotes,
    deleteLabor
  } 