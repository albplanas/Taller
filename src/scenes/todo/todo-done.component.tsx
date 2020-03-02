import {AppRoute} from "../../navigation/app-routes"

import React from 'react';
import { StyleSheet,RefreshControl } from 'react-native';
import {
  Layout,
} from '@ui-kitten/components';
import { EditIcon, CloseIcon} from '../../assets/icons';
import {RefreshFunct} from "../../globalFunc_Use/globalJSFunctions"
import {Listing} from "../../components/Listing/Listing"


export const  TodoDoneScreen=(props)=> {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(()=>RefreshFunct(props.onUpdate_LIST,setRefreshing), [refreshing]);

  const onPressOpenOrder=(item)=> props.navigation!==undefined?props.navigation.navigate(AppRoute.EDIT_SERVICE_ORDER,{item:item}):null

  const onPressClose=(item)=>props.navigation!==undefined?props.navigation.navigate(AppRoute.SIGNATURE,{item:item}):null
   
  const ShowArrFunc=(item)=>[true,true]
    return (
      <Layout style={{flex:1}}>

      <Layout style={styles.container}>
                    
                    <Layout style={styles.layerOne} level ="1">
                     
                     
                     
                      <Listing                          list={props.Opened_S_O} 
                                                        refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} 
                                                        ShowArrFunc={ShowArrFunc}
                                                        keylist={"truckListSO"}
                                                        renderItemAccessoryObject={[{

                                                                                        title:"",
                                                                                        icon:EditIcon,
                                                                                        onPress:onPressOpenOrder ,
                                                                                        status:"success"

                                                                                      },{

                                                                                        title:"",
                                                                                        icon:CloseIcon,
                                                                                        onPress:onPressClose ,
                                                                                        status:"danger"

                                                                                      }]}
                                                        />
                                            
                                                  
                    </Layout>


      </Layout>

  
</Layout>
    );

}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  layerOne: {
    flex:1,
    margin:20,
    alignItems: 'center',
  
  },
  button:{
    marginVertical:8
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  layerTwo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: { width:600},

});



