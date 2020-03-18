import React, { useEffect, useState} from 'react';
import {
  Layout,
  Divider,
  Spinner,
  Text,
} from '@ui-kitten/components';
import {StyleSheet, Alert} from "react-native"

import {GetPiecesByTruck} from "../../SQL/maintenance.sql.js"

import {TopNavigationAlignmentsShowcase } from "./TopNavigator"

import {ViewPagerInlineStylingShowcase} from "./Viewpager"


export const PiecesByTruck =(props)=>{

  const [spinner,setSpinner]=useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [id,setId]=useState(null);
  const [data,setData]=useState([]);
  const [code,setCode]=useState("");
   
  useEffect(()=>{

    setSpinner(true);
    setId(props.route.params.id);
    GetPiecesByTruck(props.route.params.id,(x)=>{setData(x);setSpinner(false)})
  },[props.route.params.id])


        return <>
                <TopNavigationAlignmentsShowcase  {...props}
                                                  selectedIndex={selectedIndex}
                                                  setSelectedIndex={setSelectedIndex}/>
                <Divider/>
                <Layout  style={styles.container}>
                    {
                        spinner?
                        <Loader/>:
                        <ViewPagerInlineStylingShowcase 
                                                        data={data}
                                                        selectedIndex={selectedIndex}
                                                        setSelectedIndex={setSelectedIndex}/>
                    }
                </Layout>
            </>
    
}
const Loader=()=>{
return (
  <Layout level="3" style={styles.layoutList}>
    <Spinner status='warning'size='giant'/>

    <Text category="h4"style={{marginTop:20}}>Loading Data ... </Text>
  </Layout>
)

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
    },
    layoutList:{
        flex: 1,
      justifyContent: 'center',
      alignItems: "center",
      width:"100%",
    },
      card: {
        marginVertical: 8,
      },
      text:{}
  });

