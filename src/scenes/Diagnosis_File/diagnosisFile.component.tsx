import React ,{useEffect} from 'react';
import { StyleSheet  } from 'react-native';
import {
  Layout,
  Text,
  Button
} from '@ui-kitten/components';

import { Upload_Icon,Close_Icon,DoneAllIcon,} from '../../assets/icons';

//import {varModel} from "../EditServiceOrder/constructionModel"
//import {ReviewChanges} from "./Review/ReviewChanges"
import {TopNavigationDiagnosis} from "./TopNavigator.component"
import {ListOfCommitments} from "./ListOfCommitments.component"











export const DiagnosisFileScreen =(props)=>{



/******************* STATE TO SUBMIT *******************/
  

const [itemselect, setItemselect] = React.useState(0);
const [item, setItem] = React.useState(null);
const [enablelist,setEnablelist]=React.useState(new Array(15).fill({
                                                                      title: 'Title for Item',
                                                                      description: 'Description for Item',
                                                                    }))



useEffect(() => {
         
          //Diagnosis
          console.log("Render  DiagnosisFileScreen",props.MechanicList,props.diagnosis_List);
          setItem(props.route.params.item)
          setEnablelist(props.diagnosis_List.filter(e=> e.idSelect===props.route.params.item.idSelect &&
                                                        e.feature===props.route.params.item.feature))
                                            .map(e => {
                                                          return {
                                                            mechanic: props.MechanicList
                                                          }
                                            })

}, []);



 return (
    <Layout style={styles.container} level="4">

            <TopNavigationDiagnosis navigation={props.navigation} title={item===null?"":item.SubTitle} subtitle={item===null?"":"Equipment : "+item.equipmentCod}/>
              
              <Layout style={[styles.containerLayout,{marginTop:15}]}level="4">

                    <Layout style={[styles.layout,{maxWidth:500}]} level='2'>
                      <ListOfCommitments enablelist={enablelist} itemselect={itemselect} setItemselect={setItemselect}/>
                    </Layout>

                    <Layout style={[styles.layout,{marginLeft:10}]} level='2'>
                      <Text>3</Text>
                    </Layout>

              </Layout>

    </Layout>
  );
}






  
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    minHeight: 600,
  },
  containerLayout: {
    flex: 1,
    flexDirection: 'row',
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});








