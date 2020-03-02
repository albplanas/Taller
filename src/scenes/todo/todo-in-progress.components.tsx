import React,{useEffect} from 'react';
import {   RefreshControl, StyleSheet, Alert, ToastAndroid} from 'react-native';
import {
  Layout,
  ThemedComponentProps,
  withStyles,
} from '@ui-kitten/components';
import { TodoInProgressScreenProps } from '../../navigation/todo.navigator';
import {AppRoute} from "../../navigation/app-routes"
import {storeData ,RefreshFunct} from "../../globalFunc_Use/globalJSFunctions"

import { EditIcon, CarIcon } from '../../assets/icons';
import {Listing} from "../../components/Listing/Listing"
















const TodoInProgressScreenComponent = (props: TodoInProgressScreenProps & ThemedComponentProps): ListElement => {

 // const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(()=>RefreshFunct(props.onUpdate_LIST,setRefreshing), [refreshing]);
  const [data, setData] = React.useState([]);
  const [alreadyOpend,setalredyOpend]=React.useState([])


 
  useEffect(() => {
   //console.log(props.FeaturesTruck.length)
    setData(props.FeaturesTruck ) 
    setalredyOpend(props.Opened_S_O.map(e=>e.cod) )                  
  }, []);


      const decideAboutNewOrder=(item)=>{

        Alert.alert(  'BE AWARE ABOUT',
                        'There is a new services order open but it is not completed already, if you push CONTINUE all information regard to this existing order will be lost , including the diagnosis and extra information like pictures  !!!',
                      [  {
                              text: 'Cancel',
                              onPress: () => console.log('Cancel Pressed'),
                              style: 'cancel',
                            },  {
                              text: 'Continue', onPress: () => {
          
                            storeData('truckid_Diagnosis',item.IDCatEquip+"");

                            ToastAndroid.showWithGravity(
                                  'Loading ...',
                                  ToastAndroid.LONG,
                                  ToastAndroid.CENTER,
                                );
                    props.navigation!==undefined?props.navigation.navigate(AppRoute.NEW_SERVICE_ORDER,{item:item}):null

          }},
          ],
          {cancelable: false},
        );
}

        const selectTruck =(item)=>{

                storeData('truckid_Diagnosis',item.IDCatEquip+"");

                props.onUpdate_DIAGNOSIS('truckid_Diagnosis',item.IDCatEquip+"")

                props.navigation!==undefined?props.navigation.navigate(AppRoute.NEW_SERVICE_ORDER,{item:item}):null

        }

        const onPress_New_SO=(item)=>props.truckid_Diagnosis===null || props.truckid_Diagnosis+""===item.IDCatEquip+""? selectTruck(item): decideAboutNewOrder(item)
        const onPress_Profile =(item) => props.navigation!==undefined?props.navigation.navigate(AppRoute.PROFILE,{cod:item.cod}):null
        const onPress_Edit_SO = (item)=> props.navigation!==undefined? props.navigation.navigate(AppRoute.EDIT_SERVICE_ORDER,{item:props.Opened_S_O.filter(e=>e.cod===item.cod)[0]}):null
        const ShowArrFunc=(item)=>{

           return  [alreadyOpend.filter(e=>e===item.cod).length>0,alreadyOpend.filter(e=>e===item.cod).length===0,true];

        }
     
  return (  
                <Layout style={props.themedStyle.container}>

                                          <Layout style={styles.container}>
                                                        
                                                        <Layout style={styles.layerOne} level ="1">
                                                         
                                                         
                                                         
                                                          <Listing                          list={data} 
                                                                                            refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} 
                                                                                            ShowArrFunc={ShowArrFunc}
                                                                                            keylist={"truckList"}
                                                                                            renderItemAccessoryObject={[{
                                                                                                                            title:"Opened Already !!!",
                                                                                                                            icon:EditIcon,
                                                                                                                            onPress:onPress_Edit_SO ,
                                                                                                                            status:"warning"
                                                    
                                                                                                                          },{

                                                                                                                            title:"",
                                                                                                                            icon:EditIcon,
                                                                                                                            onPress:onPress_New_SO ,
                                                                                                                            status:"success"

                                                                                                                          },{

                                                                                                                            title:"",
                                                                                                                            icon:CarIcon,
                                                                                                                            onPress:onPress_Profile ,
                                                                                                                            status:"info"

                                                                                                                          }]}
                                                                                            />
                                                                                
                                                                                      
                                                        </Layout>
                              
                              
                                          </Layout>
                                  
                                      
                  </Layout>
  );
};









export const TodoInProgressScreen = withStyles(TodoInProgressScreenComponent, (theme) => ({

  container: {
    flex: 1
  },
  filterInput: {
    marginTop: 16,
    marginHorizontal: 8,
  },
  list: {
    flex: 1,
    backgroundColor: theme['background-basic-color-1'],
  },
  item: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 12,
  },
  itemProgressBar: {
    width: '50%',
    marginVertical: 12,
  },
}));


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