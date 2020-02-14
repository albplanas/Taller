import React,{useState,useEffect} from 'react';
import {
  CheckBox,
  Layout,
  ButtonGroup ,
  Button,
  ListItem
} from '@ui-kitten/components';

import {EditIcon_1,Camera_Icon,InfoIcon} from "../../assets/icons"

import {StyleSheet} from "react-native"
import {TextArea} from "../TextArea/TextArea"
  
  const ListItemModal = (props) => {
  
    const [checked, setChecked] = React.useState(props.Checked);
  
    const onCheckBoxCheckedChange = (index) => {

      var arr=props.checkedList.filter(x=>x+""!==props.id+"");
      
      checked?props.setCheckedList(arr):props.setCheckedList(arr.concat(props.id))
      setChecked(!checked);
    };
  
    const renderAccessory = (style, index) => (
      <CheckBox
        style={style}
        checked={checked}
        onChange={onCheckBoxCheckedChange}
      />
    );

    const renderEditElements = (style, index) => (
      <Layout>
                <Layout style={{flexDirection:"row"}}>
                    <Button appearance="ghost" disabled={!checked}status="warning" icon={Camera_Icon}/>
              </Layout>

    </Layout>
    );
  
    return (
  
       <ListItem
        title={props.name}
        style={{padding:20}}
        titleStyle={{fontSize:20}}
        accessory={renderEditElements}
        icon={renderAccessory}
      />
    );
  };
  
  
export  const Full_List=(props)=>{

  var listOfFeatures=props.elem.Subarr.sort((a,b)=> a.Description > b.Description?1:b.Description > a.Description ?-1:0)
                    .map(el=>{
                                var checkedL=props.checkedList.filter(x=>x===el.SubId).length>0?true:false
                                return <Layout>
                                          <ListItemModal name={el.Description} 
                                                      id={el.SubId} 
                                                      checkedList={props.checkedList} 
                                                      setCheckedList={props.setCheckedList} 
                                                      Checked={checkedL}/>
                                             <BoxText checked={checkedL}/>               
                                        </Layout>
                              })
    return(
      <Layout style={{justifyContent: 'center',}}>
  
      {listOfFeatures}
  
  
      </Layout>
    )
  } 


const BoxText=(props)=>{

  const [textDes,setTextDes] =useState("");
  const [textExp,setTextExp] =useState("");
  return    props.checked?
                            <Layout>
                              <TextArea text={textDes} 
                                  setText={setTextDes}
                                  placeholder="Describe the issue"
                                  validation={false}
                                  width={732} 
                                  caption={"This field is required"}
                                  label="Description"
                                  level={"3"}   
                              />
                              <TextArea text={textExp} 
                                  setText={setTextExp}
                                  placeholder="Try to explain what happen"
                                  validation={false}
                                  caption={"This field is required"}
                                  label="Explanation"
                                  width={732} 
                                  level={"3"}   
                              />
                            </Layout> :null
  
}