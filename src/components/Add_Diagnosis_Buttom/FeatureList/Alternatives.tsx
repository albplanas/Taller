import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Avatar,
  Layout,Text,Divider
} from '@ui-kitten/components';
const logo_0=require("../../../assets/nonSelectDiagnosis.png")
const logo_1=require("../../../assets/unselectItem.png")
import {TextArea} from "../../MainComponents/TextArea"
import {default as color} from "../../../styles/color.json"

const Alternative_1 = () => (
  <Layout style={styles.container}>
       <Text category="h3" style={{alignSelf:"center"}} status={"warning"}>MARK the box to edit the Diagnosis Content</Text>
       <Avatar style={[styles.avatar,{alignSelf:"center"}]} size='giant' source={logo_1}/>
      
  </Layout>
);

const Alternative_0 = () => (
    <Layout style={styles.container}>
         <Text category="h3" style={{alignSelf:"center"}} status={"danger"}>Select the diagnosis that best fit with your issue</Text>
         <Avatar style={[styles.avatar,{alignSelf:"center"}]} size='giant' source={logo_0}/>
        
    </Layout>
  );
const Alternative_3 = (props) => (
    <Layout style={styles.container3}>
                <Text category="h3" style={{alignSelf:"center"}} status={"warning"}>NON-EDITABLE Diagnosis</Text>
         <Divider/>
                <Text category="h5"style={{marginVertical:10}}>Description :</Text>
                <Text>{props.item.description}</Text>
                <Divider style={{backgroundColor:color.gray_400,height:1,width:600}}/>
                <Text category="h5"style={{marginVertical:10}}>Explanation :</Text>
                <Text>{props.item.explanation}</Text>
        
    </Layout>
  );

const Alternative_4 = (props) => (
    <Layout style={styles.container3}>
                <Text category="h3" style={{alignSelf:"center"}} status={"warning"}>Diagnosis Board</Text>
         <Divider/>
                <Text category="h5"style={{marginVertical:10}}>Description :</Text>
                <TextArea               text={props.item.description} 
                                        setText={props.setDescription}
                                        placeholder="Describe the issue"
                                        validation={props.item.description.length>0?true:false}
                                        width={600} 
                                        caption={"This field is required"}
                                        label=""
                                        level={"1"}   
                              />
                <Divider style={{backgroundColor:color.gray_400,height:1, marginVertical:10,width:600}}/>
                <Text category="h5"style={{marginVertical:10}}>Explanation :</Text>
                <TextArea text={props.item.explanation} 
                                        setText={props.setExplanation}
                                        placeholder="Explain the issue"
                                        validation={props.item.explanation.length>0?true:false}
                                        width={600} 
                                        caption={"This field is required"}
                                        label=""
                                        level={"1"}   
                              />
        
    </Layout>
  );

 export const Display =(props)=>{

    const setDescription=(value)=>props.setText("description",value,props.select);
    const setExplanation=(value)=>props.setText("explanation",value,props.select);
  
        return  props.item===null || props.item===undefined?<Alternative_0/>:
                props.item.activity!=="enable"?<Alternative_3 {...props}/>   :
                props.item.check===false?  <Alternative_1/> :
                                            <Alternative_4 setDescription={setDescription} 
                                                            item={props.item}
                                                            setExplanation={setExplanation}/>         
  }
  
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 8,
    width:740
  },
  avatar: {
    margin: 8,
    width:400,
    height:400,
    marginTop:30
  },
  container3: {
    alignItems: "flex-start",
    padding: 60,
    width:740
  },
});