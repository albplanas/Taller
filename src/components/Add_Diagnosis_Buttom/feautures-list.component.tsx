import React,{useState,useEffect} from 'react';
import {
  CheckBox,
  Layout,
  ButtonGroup ,
  Button,
  ListItem
} from '@ui-kitten/components';

import {EditIcon_1,Camera_Icon,InfoIcon} from "../../assets/icons"

import {StyleSheet,Alert,ToastAndroid} from "react-native"
import {TextArea} from "../MainComponents/TextArea"











  
  const ListItemModal = (props) => {
   
    const [checked, setChecked] = React.useState(false);
    const [textDes,setTextDes] =useState("");
    const [textExp,setTextExp] =useState("");
    const [openSave,setOpenSave]=useState(false);

    const OpenRequest=()=>{
      
              const idmechanic=props.idmechanic.length>0?props.idmechanic[0].IdEmployee:null;
              const arrSimilar=props.checkedList.filter(x=>x.activity==='enable' ).filter(x=>x.feature+""===props.id+"" || x.IDCatEquip===props.IDCatEquip );
              const IdMaintenance=arrSimilar.length===0?parseFloat(Math.random()*1000000+"").toFixed(0):arrSimilar[0].IdMaintenance
              const arr=props.checkedList.filter(x=>x.feature+""!==props.id+"" || x.IDCatEquip!==props.IDCatEquip || x.idmechanic!==idmechanic);

            // console.log("PROPS",props.equipmentCod)
              
              var d= new Date;
              var newObject={
                                IdMaintenance:IdMaintenance,
                                idmechanic:idmechanic,
                                signed:true,
                                feature:props.id,
                                categoryId:props.categoryId,
                                idSelect:parseFloat(Math.random()*1000000+"").toFixed(0),
                                IDCatEquip:props.IDCatEquip,
                                equipmentCod:props.equipmentCod,
                                activity: "enable",
                                description:textDes,
                                explanation:textExp,
                                date:d.toISOString().slice(0,10)
                              }

            //  console.log("newObject",newObject)
              !checked?props.setCheckedList(arr):props.setCheckedList(arr.concat(newObject))
    }


    const onCheckBoxCheckedChange = (index) => {
      setChecked(!checked);
    };

    useEffect(()=>{

      setChecked(props.Checked);

      var elem=Array.isArray(props.objElem)?props.objElem.length>0?props.objElem:null:null;

      setTextDes(elem===null?"":elem[0].description===undefined?"":elem[0].description);
      setTextExp(elem===null?"":elem[0].explanation===undefined?"":elem[0].explanation);

    },[])
  
    const renderAccessory = (style, index) => (
      <CheckBox
        style={style}
        checked={checked}
        onChange={onCheckBoxCheckedChange}
        disabled={props.disabled}
        key={"diagnosis_checkBox"+props.id+index}
      />
    );

    const renderEditElements = (style, index) => (
              <Layout style={{flexDirection:"row"}}>
                    <Button appearance="ghost" disabled={!checked } status="warning" icon={Camera_Icon}/>
              </Layout>
    );
const setText=()=>{

  OpenRequest();
  setOpenSave(false);
  ToastAndroid.showWithGravityAndOffset(
                                          'Saving data ...',
                                          ToastAndroid.SHORT,
                                          ToastAndroid.CENTER,
                                          25,
                                          50,
                                        );
}
    return (
  <Layout>
       <ListItem
        title={props.name}
        style={{padding:10}}
        titleStyle={{fontSize:20}}
        accessory={renderEditElements}
        icon={renderAccessory}
      />
       <BoxText   show={checked && !props.disabled}
                  textDes={textDes}
                  setTextDes={setTextDes}
                  setTextExp={setTextExp}
                  openSave={openSave}
                  setOpenSave={setOpenSave}
                  setText={setText}
                  textExp={textExp} 
                  />   
  </Layout>    
    );
  };
  
  
export  const Full_List=(props)=>{
 
  var listOfFeatures=props.elem.Subarr
                    .map(el=>{
                                var arr=props.checkedList.filter(x=>x.feature===el.SubId)
                                var checkedL=arr.length>0?true:false
                                var disabled=arr.length>0?arr[0].activity==='enable'?false:true:false
                             // console.log(props.elem)
                                return <ListItemModal 
                                                      name={el.Description}
                                                      IDCatEquip={props.IDCatEquip}
                                                      equipmentCod={props.equipmentCod}
                                                      idmechanic={props.idmechanic} 
                                                      id={el.SubId} 
                                                      categoryId={props.elem.Id}
                                                      objElem={arr}
                                                      checkedList={props.checkedList} 
                                                      setCheckedList={props.setCheckedList} 
                                                      Checked={checkedL}
                                                      disabled={ disabled} 
                                                      />
                              })
    return(
      <Layout style={{justifyContent: 'center',}}>
  
      {listOfFeatures}
  
  
      </Layout>
    )
  } 


const BoxText=(props)=>{

  
  const [show,setShow]=useState(false);
  useEffect(()=>{
              setShow(props.show)
            },[props.show])
const setTextDF=(val)=>{props.setTextDes(val); props.setOpenSave(true)}
const setTextEF=(val)=>{props.setTextExp(val); props.setOpenSave(true)}
const onPress=()=>{
              props.textDes.length===0?Alert.alert(
                                                      'Check Description', 'In Order to save thoses comments you have to complete the description text box',
                                                      [ {text: 'OK', onPress: () => console.log('OK Pressed')},],{cancelable: false},
                                                    ):
              props.textExp.length===0?Alert.alert(
                                                      'Check Explanation', 'In Order to save thoses comments you have to complete the explanation text box',
                                                      [ {text: 'OK', onPress: () => console.log('OK Pressed')},],{cancelable: false},
                                                    ):props.setText()
                                                                                                                  
                                                                                                                }
  return    show?
                            <Layout style={{alignItems:"center"}} level="2">
                              <TextArea text={props.textDes} 
                                        setText={setTextDF}
                                        placeholder="Describe the issue"
                                        validation={props.textDes.length>0?true:false}
                                        width={732} 
                                        caption={"This field is required"}
                                        label="Description"
                                        level={"3"}   
                              />
                              <TextArea text={props.textExp} 
                                  setText={setTextEF}
                                  placeholder="Try to explain what happen"
                                  validation={props.textExp.length>0?true:false}
                                  caption={"This field is required"}
                                  label="Explanation"
                                  width={732} 
                                  level={"3"}   
                              />
                              {props.openSave?<Button status="info" style={{maxWidth:200,alignItems:"center",marginVertical:8}} size="large" 
                                onPress={onPress}        
                              > Save Changes</Button>:null}
                              
                            </Layout> :null
  
}