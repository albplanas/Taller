/**
 * This example demonstrates how simply could be composed List Item
 * with classic layouts like icon at the left, forward button at the right, etc.
 *
 * IMPORTANT: To use Icon component make sure to follow this guide:
 * https://akveo.github.io/react-native-ui-kitten/docs/guides/icon-packages
 */

import React, { useEffect } from 'react';
import {
  Layout,
} from '@ui-kitten/components';
import Carouselexample from "../../../components/Carousel"

// .components
import  { ModeEdit_Off } from "./ModeEdit_Off.component"
import {ModeEdit_On} from "./ModeEdit_On.component";
import {TopNavigationResources} from "./TopNavigator.component";
import AsyncStorage from '@react-native-community/async-storage';
import {ToastAndroid} from "react-native"

var storeData = async (key,value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      alert("ERROR","Something was wrong: "+e)
    }
  }

// Main Component
export const ListOfResources = (props) => {

  const [item, setItem] = React.useState(null);
  const [pictureArray,setpictureArray] = React.useState([]);
  const [edit,setEdit]=React.useState(false);
  const [editNOavailable,seteditNOavailable]=React.useState(true);
//EditFeatures
  const [description, setdescription] = React.useState("");
  const [explanation, setExplanation] = React.useState("");
  const [pieces, setPieces] = React.useState([]);




 useEffect(() => {
      var newItem=props.enablelist[props.itemselect]===undefined?null:props.enablelist[props.itemselect]
        setItem(newItem);   
        //EditFeatures
        setdescription(newItem===null?"":newItem.description);
        setExplanation(newItem===null?"":newItem.explanation);
        setPieces([]);
        setEdit(false)
        seteditNOavailable(false);

    }, [props.itemselect]);


const onUpload_Picture=(arr)=>props.onUpdate_DIAGNOSIS("pictures_Diagnosis",arr)

const onDelete=()=>{
    var newList=props.diagnosis_List.filter(e=>e.idSelect!==item.idSelect);
    ToastAndroid.showWithGravityAndOffset(
      'This report is being eliminated 🗑🗑🗑!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
    props.onUpdate_DIAGNOSIS("diagnosis_List",newList);
    storeData("diagnosis_List",newList)
}




  return (
    <Layout style={{height:'100%',flex:1,width:"100%"}} >

      <TopNavigationResources subtitle={item==null?"":item.mechanic+" / "+ item.date}
                              idSelect={item==null?null:item.idSelect}
                              IdMaintenance={item==null?null:item.IdMaintenance}
                              navigation={props.navigation}
                              edit={edit}
                              setEdit={setEdit}
                              onDelete={onDelete}
                              editNOavailable={editNOavailable}
                              UPDATE_Clock_LIST={props.UPDATE_Clock_LIST}
                              Clock_List={props.Clock_List}
                              FeaturesList={props.FeaturesList}
                              item={item}

      />
      {
          edit===false?
                            < ModeEdit_Off  description={item===null?"":item.description}
                                            explanation={item===null?"":item.explanation}
                                            pieces={"NO Found"}
                            />:
                            <ModeEdit_On    description={description} setdescription={setdescription} 
                                            explanation={explanation} setExplanation={setExplanation}
                                            pieces={pieces}           setPieces={setPieces}/>
      }
     
      <Carouselexample 
                                                    imgList={props.pictureArray}  
                                                    onUpload_Picture={onUpload_Picture}
                                                    vertical={false}
                                                    label="pictures_Diagnosis"
                                                    pagination={false}
                                                    Dimensions={{
                                                      itemWidth:500,
                                                      sliderWidth:750,
                                                      imgWidth:450,
                                                      sliderHeight:220,
                                                      itemHeight:220,
                                                      imgHeight:220
                                                    }}/> 
        
    </Layout>
  );
};


  












