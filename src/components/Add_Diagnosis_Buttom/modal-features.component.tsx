import React,{useState,useEffect} from 'react';
import {Modal} from 'react-native';

import {CardDiagnosis} from "./Card-diagnosis.component"
import {
  Layout,
  Button
} from '@ui-kitten/components';











export const ModalFeatures =(props)=> {
  const [checkedList,setcheckedList]=useState([])
  const [modalVisible,setmodalVisible]=useState(false)
  

  useEffect(()=>{

    setcheckedList(Array.isArray(props.listChecked)?props.listChecked:[])
  },[modalVisible])
 
  return <Layout>
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => { alert('Modal has been closed.');}}>

                    <CardDiagnosis            checkedList={checkedList} 
                                              setCheckedList={(val)=>setcheckedList(val)}
                                              elem={props.elem}
                                              onClose={() => {
                                                console.log("modalVisible",modalVisible)
                                                                setmodalVisible(false)}}
                                              modalVisible={modalVisible}
                                              />     
                      
                   
                    
                  </Modal>

                  <Button 
                       appearance='outline' style={{minWidth:100}} size='medium' 
                       onPress={() => setmodalVisible(true)}
                   >{props.title}</Button>
                  
                  
                </Layout>
            }


