import React ,{useEffect,useState}from 'react';
import { StyleSheet,View,ScrollView ,Image} from 'react-native';
import {
  Layout,
  Card
} from '@ui-kitten/components';


import {Img_Src} from "../../assets/iconArrays.js"
import {ModalFeatures} from  "./modal-features.component"





export const MultiCard=(props)=>{


  return <ScrollView >
            <View style={styles.containerFeatures} >
                {props.featureTree.map(e=>{

                return  <View key={"diagnosiscard"+e.Id}><MemoizedCard elem={e}{...props} /></View>
                })}
            </View>
        </ScrollView>

}

const Card_Features=(props)=>{

  const [data,setData]=useState(["","",""]);

  useEffect(()=>{
    //console.log("Card_Features")
    setData([props.elem.Title,props.elem.Id,Img_Src.filter(x=>x.IDSysScheme===props.elem.Id).length>0?Img_Src.filter(x=>x.IDSysScheme===props.elem.Id)[0].src:"nothing"])
  },[])


  return (
        <Card style={styles.card_features}  status='success'>

          <Image
              style={styles.headerImage}
              source={data[2]}
            />
            <ModalFeatures {...props} title={data[0]}/>
        
      </Card>
  )
} 


const MemoizedCard = React.memo(Card_Features);

const styles = StyleSheet.create({
  card_features:{
    width:195,
    marginTop:10
  },
  containerFeatures:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent:'space-between',
    paddingBottom:100
  },
  headerImage: {
    flex: 1,
    height: 100,
    width:100,
    alignSelf:"center",
    marginBottom:5
   
    
  }
});



