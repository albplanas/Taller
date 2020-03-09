import React from 'react';
import { StyleSheet,ToastAndroid } from 'react-native';
import {
  Layout,
  List,
} from '@ui-kitten/components';


import { CardsRow } from "./CardbyRows";
import {storeData} from "../../globalFunc_Use/globalJSFunctions"





export const MultiCard=(props)=>{


      const [data,setData]=React.useState([])

          React.useEffect(()=>{

            if(props.featureTree!==undefined && props.featureTree!==null){
                    const len=Math.floor(props.featureTree.length/5) +1
                    var newArr=new Array(len).fill(0)
                    const newData=newArr.map( (arr,ind)=>{
                        return props.featureTree.slice(ind*5,(ind+1)*5)
                    })
                    setData(newData)
            }
           
          },[])

          const onUpdate_DIAGNOSIS=(newItems)=>{

                                        const newArr=props.diagnosis_List.concat(newItems);
                                        ToastAndroid.showWithGravityAndOffset(
                                          "Uploading Changes ...",
                                          ToastAndroid.LONG,
                                          ToastAndroid.CENTER,
                                          25,
                                          50,
                                        );
                                        props.onUpdate_DIAGNOSIS("diagnosis_List",newArr)
                                        storeData("diagnosis_List",JSON.stringify(newArr))

            }

            const renderItem = ({ arr, index }) => {

              const arrList=data[index]!==undefined?data[index]:[];
           

                              return (
                                    <Layout style={styles.cardstyle}>
                                        <CardsRow arrList={arrList} 
                                                  {...props}
                                                  updateFunction={props.route.params.originalRoute==="diagnosis"?onUpdate_DIAGNOSIS:null}/>    
                                      </Layout>
                                  );
                              }
    return  <List
                    data={data}
                    renderItem={renderItem}
                    style={{marginHorizontal:30,marginVertical:30}}
                  />
  

}







const styles = StyleSheet.create({

  cardstyle:{
              flex:1,
              flexDirection: 'row',
              justifyContent:'space-between',
                marginBottom:0
              },
});


