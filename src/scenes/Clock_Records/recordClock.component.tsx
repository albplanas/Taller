import React ,{useEffect} from 'react';
import { StyleSheet ,Alert } from 'react-native';
import {
  Layout, Divider,
} from '@ui-kitten/components';

import {TopNavigationCase} from "./Topnavigator.component"
import {Filter} from "./Filter.component"
import {ListingCase} from "./Listing"


export const RecordClockScreen =(props)=>{
  const [Clock_Arr, setClock_Arr] = React.useState([]);
  const [iniClock_Arr, setIniClock_Arr] = React.useState([]);
/******************* STATE TO SUBMIT *******************/
useEffect(()=>{
  setClock_Arr(props.Clock_List);
  setIniClock_Arr(props.Clock_List)
},[JSON.stringify(props.Clock_List)])

//const [itemselect, setItemselect] = React.useState(-1);


const ApplyFilter=(options)=>{
  const filterArr=iniClock_Arr.filter(e=>options.truck!==null?  e.cod===options.truck ? true:false:true)
                              .filter(e=>options.employee.length>0?  options.employee.filter(x=>x.id===e.idmechanic).length>0 ? true:false:true)
                              .filter(e=>options.date.length>0?  options.date===e.date? true:false:true)

  setClock_Arr(filterArr);
}


 return (
    <Layout style={styles.container} level="4">
        <TopNavigationCase navigation={props.navigation}/>
        <Divider/>
              <Layout style={[styles.containerLayout,{marginTop:1}]} >
                <Layout style={[styles.layout,{maxWidth:400,marginRight:10,marginVertical:10}]}level="2" >
                          <Filter   FeaturesTruck = { props.FeaturesTruck }
                                    MechanicList  = { props.MechanicList  }
                                    ApplyFilter={ApplyFilter}/>
                </Layout>
                <Layout style={styles.layout} level="2">

                          <ListingCase  Clock_Arr={Clock_Arr}
                                        navigation={props.navigation}/>
                                        
                </Layout>
              </Layout>

    </Layout>
  );
}


//DiagnosisFileScreen .whyDidYouRender = true;



  
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








