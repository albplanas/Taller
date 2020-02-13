import React,{Component,PureComponent} from 'react';
import { View,Modal,ToastAndroid } from 'react-native';

import {CardDiagnosis} from "./Card-diagnosis.component"
import {
  Layout,
  Spinner,
  Button
} from '@ui-kitten/components';


import AsyncStorage from '@react-native-community/async-storage';


import {LoaderIcon,Calendar_Icon} from "../../assets/icons"




var storeData = async (key,value) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (e) {
    alert("Something was wrong: "+e)
  }
}








export class ModalFeatures extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      index:0,
      checkedList:[]
    };
    this.setModalVisible=this.setModalVisible.bind(this);
    this.onUpdate=this.onUpdate.bind(this)
    this.setCheckedList=this.setCheckedList.bind(this)
  }
  UNSAFE_componentWillMount(){
    this.setState({
      checkedList:Array.isArray(this.props.listChecked)?this.props.listChecked:[]
    })
}

UNSAFE_componentWillReceiveProps(nextProps){
    if(nextProps.listChecked!==this.state.checkedList){
        this.setState({
          checkedList:Array.isArray(nextProps.listChecked)?nextProps.listChecked:[]
        })
    }
}

            setCheckedList(val){
              this.setState({
                checkedList:val
              })
            }  

            setModalVisible(visible) {
              this.setState({modalVisible: visible});
            }

          onUpdate=()=>{
            var arr =this.state.checkedList;
            var orig= this.props.origen;

            if(orig==="diagnosis"){
              storeData("diagnosis_List",JSON.stringify(arr));
              this.props.onUpdate_DIAGNOSIS!==undefined?this.props.onUpdate_DIAGNOSIS('diagnosis_List',arr):null
            }
            else if(orig==="editOrder"){
              //storeData("SO_diagnosis_List",JSON.stringify(arr));
            
              
              this.props.onUpdate_DIAGNOSIS!==undefined?this.props.onUpdate_DIAGNOSIS('SO_diagnosis_List',arr):null
            }
 
          }
        
            render() {
             //console.log("render",this.props)
             
              return (
                <View style={{marginTop: 22}}>
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                      alert('Modal has been closed.');
                    }}>
                    <View style={{height:'100%',backgroundColor:'rgba(0, 0, 0, 0.7)',paddingTop:100,paddingBottom:100}}>
                    
                    
                    <Layout style={{marginTop:10,marginLeft:'40%',width:'20%'}}>
                            <Button 
                              status="danger"
                              onPress={() => {
                                this.setModalVisible(!this.state.modalVisible);
                                this.onUpdate();
                                ToastAndroid.showWithGravity(
                                  'Saving Changes ...',
                                  ToastAndroid.LONG,
                                  ToastAndroid.CENTER,
                                );
                              }}
                           
                            >CLOSE</Button>
                            
                      </Layout>
                      
                      <CardDiagnosis  checkedList={this.state.checkedList} 
                                      setCheckedList={(val)=>this.setCheckedList(val)}
                                      elem={this.props.elem}/>     
                      
                    </View>
                    
                  </Modal>

                  <Button 
                      appearance='outline'
                      style={{minWidth:100}}
                       size='medium' 
                       onPress={() => {
                      this.setModalVisible(true);
                    }} 
                   >{this.props.title}</Button>
                  
                  
                </View>
              );
            }
          }


