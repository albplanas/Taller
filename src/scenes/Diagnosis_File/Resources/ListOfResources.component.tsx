/**
 * This example demonstrates how simply could be composed List Item
 * with classic layouts like icon at the left, forward button at the right, etc.
 *
 * IMPORTANT: To use Icon component make sure to follow this guide:
 * https://akveo.github.io/react-native-ui-kitten/docs/guides/icon-packages
 */

import React, { useEffect } from 'react';
import {
  Layout,Text, Button
} from '@ui-kitten/components';
import Carouselexample from "../../../components/Carousel"

// .components
import  { ModeEdit_Off } from "./ModeEdit_Off.component"
import {ModeEdit_On} from "./ModeEdit_On.component";
import {TopNavigationResources} from "./TopNavigator.component";


import { default as customColor } from '../../../styles/color.json';
import { AppRoute } from '../../../navigation/app-routes';



// Main Component
export const ListOfResources = (props) => {

  const [item, setItem] = React.useState(null);
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
        seteditNOavailable(newItem===null?true:newItem.mechanic===props.userName?false:true);
       
    }, [props.itemselect]);




const onPressCamera=()=>{

                      props.navigation.navigate(AppRoute.CAMERA, {
                                                from : 'diagnosis',
                                                idSelect:props.enablelist.map(e=>e.idSelect)[props.itemselect],
                                                IdMaintenance:item==null?null:item.IdMaintenance
                                                  })
  }


  return (
    <Layout style={{height:'100%',flex:1,width:"100%"}} >

      <TopNavigationResources subtitle={item==null?"":item.mechanic+" / "+ item.date}
                              idSelect={item==null?null:item.idSelect}
                              IdMaintenance={item==null?null:item.IdMaintenance}
                              onPressCamera={onPressCamera}
                              navigation={props.navigation}
                              edit={edit}
                              setEdit={setEdit}
                              onDelete={props.onDelete}
                              editNOavailable={editNOavailable}
                              UPDATE_Clock_LIST={props.UPDATE_Clock_LIST}
                              Clock_List={props.Clock_List}
                              FeaturesList={props.FeaturesList}
                              item={item}
                              type={props.type}

      />
      {
          edit===false?
                            < ModeEdit_Off  description={item===null?"":item.description}
                                            explanation={item===null?"":item.explanation}
                                            pieces={"NO Found"}
                            />:
                            <ModeEdit_On    description={description} setdescription={setdescription} 
                                            explanation={explanation} setExplanation={setExplanation}
                                            type={props.type}
                                            pieces={pieces}           setPieces={setPieces}/>
      }

     <Text style={{marginTop:10,marginLeft:10}}>{"Pictures\t\t( " +props.pictureArray.length+ " )"}</Text>


      <Carouselexample 
                                                    imgList={props.pictureArray}  
                                                    onDelete_Picture={props.onDelete_Picture}
                                                    vertical={false}
                                                    pagination={false}
                                                    deleteDisable={editNOavailable}
                                                    Dimensions={{
                                                      itemWidth:600,
                                                      sliderWidth:750,
                                                      imgWidth:450,
                                                      sliderHeight:320,
                                                      itemHeight:320,
                                                      imgHeight:320
                                                    }}/> 

      {props.pictureArray.length===0?<Button  style={{backgroundColor:customColor.purple,width:200,
                                                      alignSelf:"center",marginBottom:200}} 
                                              size="giant" 
                                              onPress={onPressCamera}
                                              >Add Picture</Button>:null}                                              
        
    </Layout>
  );
};


  












