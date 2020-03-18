import React ,{useEffect}from 'react';
import { StyleSheet} from 'react-native';
import {
  Divider,
  Layout,
} from '@ui-kitten/components';
import { ProfileScreenProps } from '../../navigation/profile.navigator';
import {
  SafeAreaLayout,
  SafeAreaLayoutElement,
  SaveAreaInset,
} from '../../components/safe-area-layout.component';
import {CARD_TRUCK_Profil} from "../../components/Profile/Equiment_Profile.component"

import {TopBar} from "./topBar"
import {VerticalLayout} from "./equipment.list"

import { useFocusEffect } from '@react-navigation/native';



export const ProfileScreen = (props: ProfileScreenProps): SafeAreaLayoutElement => {

  const [refreshing, setRefreshing] = React.useState(false);
  const [text, setText] = React.useState("");
  const [select, setSelect] = React.useState(null);
  const onRefresh = React.useCallback(() => {}, [refreshing]);

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
     
      return () => {
        props.route.params===undefined
        ?setSelect(null):
        setSelect(props.route.params.cod)
      };
    }, [])
  );


  
  return (

    <SafeAreaLayout
      style={styles.safeArea}
      insets={SaveAreaInset.TOP}>
      <TopBar text={text} 
              select={select} 
              navigation={props.navigation} 
              item={props.FeaturesTruck.filter(x=>x.cod===select)} 
              setSelect={setSelect}/>
      <Divider/>

     {  (select===null)?
              <VerticalLayout  {...props} 
                                refreshing ={refreshing}setRefreshing= {setRefreshing}
                                text={text} setText={setText}
                                select={select} setSelect={setSelect}
                                onRefresh={onRefresh}
                                />:
              <HorizontalLayout  {...props} 
                                  refreshing ={refreshing}setRefreshing= {setRefreshing}
                                  text={text} setText={setText}
                                  select={select} setSelect={setSelect}
                                  onRefresh={onRefresh}
                                  />
             
     } 
    </SafeAreaLayout>
  );
}



/****************   COMPONENT  *****************/
const HorizontalLayout=(props)=>{
  return   <Layout style={styles.containerDist}>
                  <VerticalLayout {...props}/>
                  <CARD_TRUCK_Profil  {...props} />
                  
                  
                  
    
            </Layout> 
}



const styles = StyleSheet.create({
  containerDist: {
    flex: 1,
    flexDirection: 'row',
  },
  layoutDist: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  buttonGroup: {
    margin: 8,
  },
  controlContainer: {
    borderRadius: 4,
    margin: 8,
    backgroundColor: '#3366FF',
  },
  containerL: {
    flex: 1,
  },
  containerM: {
    flex: 1,
    flexDirection: 'row',
    maxHeight:80
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin:10
  },
  layout1: {
    flex: 1,
    width:'50%',
    marginLeft:'25%',
    marginTop:30
  },
  text: {
    margin: 8,
  }

});



  
  

  
  

  
  
