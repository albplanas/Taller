import React,{useState,useEffect} from 'react';
import {Modal, ToastAndroid} from 'react-native';

import {CardDiagnosis} from "./Card-diagnosis.component"
import {
  Layout,
  Button
} from '@ui-kitten/components';











export const ModalFeatures =(props)=> {
  const [checkedList,setcheckedList]=useState([])
  const [originalList,setOriginalList]=useState([])
  const [modalVisible,setmodalVisible]=useState(false)
  const [allowUpdate,setallowUpdate]=useState(true)
  useEffect(()=>{
    //console.log("ModalFeatures")
    setcheckedList(Array.isArray(props.listChecked)?props.listChecked:[])
    setOriginalList(Array.isArray(props.listChecked)?props.listChecked:[])
    setallowUpdate(props.listChecked.filter(e=>e.IDCatEquip===props.route.params.item.IDCatEquip).filter(e=>(e.description.length===0||e.explanation.length===0)).length===0)
  },[modalVisible])
 
  const onPressModal=() => setmodalVisible(true)
  const onClose=() => {
    const newArr=checkedList.filter(e=>e.IDCatEquip===props.route.params.item.IDCatEquip)
    const filteredOriginal=originalList.filter(e=>e.IDCatEquip===props.route.params.item.IDCatEquip)
            if(JSON.stringify(filteredOriginal)!==JSON.stringify(newArr)){
             
              
              ToastAndroid.showWithGravityAndOffset(
                'Refreshing Data ... Create the new diagnosis folder can take a few seconds!',
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
                25,
                50,
              );
              props.onUpdate_DIAGNOSIS(newArr);
            }
            
          setmodalVisible(false)
  }

  return <Layout>
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                   >

                    <CardDiagnosis            checkedList={checkedList} 
                                              idmechanic={props.idmechanic}
                                              setCheckedList={setcheckedList}
                                              IDCatEquip={props.route.params.item.IDCatEquip}
                                              equipmentCod={props.route.params.item.cod}
                                              elem={props.elem}
                                              allowUpdate={allowUpdate}
                                              onClose={onClose}
                                              modalVisible={modalVisible}
                                              />     
                      
                   
                    
                  </Modal>

                  <Button  appearance='outline' style={{minWidth:100}} size='medium' 
                       onPress={onPressModal}
                   >{props.title}</Button>
                  
                  
                </Layout>
            }

