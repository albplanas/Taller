import React from 'react';
import { StyleSheet,View,ScrollView ,Image} from 'react-native';
import {
  Layout,
  Card
} from '@ui-kitten/components';


import {Img_Src} from "../../assets/iconArrays.js"
import {ModalFeatures} from  "./modal-features.component"




export const MultiCard=(props)=>{



  var cards=props.featureTree.sort((a,b)=> a.Title > b.Title?1:b.Title > a.Title ?-1:0).map(e=>{

    return <Card_Features elem={e} 

                          {...props}
                          />
  })
  return <ScrollView >
            <Layout style={styles.containerFeatures}>
          {cards}
            </Layout>
        </ScrollView>
}

const Card_Features=(props)=>{
  var Ti=props.elem.Title;
  var id=props.elem.Id;

  return (
    <Card style={styles.card_features} status='success'>
      <View>
      <Image
          style={styles.headerImage}
          source={Img_Src.filter(x=>x.IDSysScheme===id).length>0?Img_Src.filter(x=>x.IDSysScheme===id)[0].src:"nothing"}
        />
        <ModalFeatures {...props} title={Ti}/>
      </View>
  </Card>
  )
} 


const styles = StyleSheet.create({
  card_features:{
    width:175,
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
    height: 120,
    width:120
   
    
  }
});



