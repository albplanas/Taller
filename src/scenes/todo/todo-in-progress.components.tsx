import React,{useEffect} from 'react';
import {   RefreshControl, StyleSheet, Alert, ToastAndroid} from 'react-native';
import {
  Layout,
  ThemedComponentProps,
  withStyles,
  Divider,
} from '@ui-kitten/components';
import { TodoInProgressScreenProps } from '../../navigation/todo.navigator';
import {AppRoute} from "../../navigation/app-routes"
import {storeData ,RefreshFunct} from "../../globalFunc_Use/globalJSFunctions"
import { Toolbar } from '../../components/toolbar.component';
import { EditIcon, CarIcon } from '../../assets/icons';
import {Listing} from "../../components/Listing/Listing"
import {default as color} from "../../styles/color.json"
import { StopWatch_IconMenu } from '../../assets/icons';




const TodoInProgressScreenComponent = (props: TodoInProgressScreenProps & ThemedComponentProps): ListElement => {

 // const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(()=>RefreshFunct(props.onUpdate_LIST,setRefreshing), [refreshing]);
  const [data, setData] = React.useState([]);
  const [alreadyOpend,setalredyOpend]=React.useState([])


 
  useEffect(() => {
    setData(props.FeaturesTruck ) 
    setalredyOpend(props.Opened_S_O.map(e=>e.cod) )                 
  }, [props.Opened_S_O.length]);
  
  useEffect(() => {
               
   }, [props.route.params]);

   
        const selectTruck =(item)=>{

                storeData('truckid_Diagnosis',item.IDCatEquip+"");

                props.onUpdate_DIAGNOSIS('truckid_Diagnosis',item.IDCatEquip+"")

                props.navigation!==undefined?props.navigation.navigate(AppRoute.NEW_SERVICE_ORDER,{item:item,callback:()=>onRefresh}):null

        }

        const onPress_New_SO=(item)=>selectTruck(item)
        const onPress_Edit_SO = (item)=> props.navigation!==undefined? props.navigation.navigate(AppRoute.EDIT_SERVICE_ORDER,{callback:()=>onRefresh,item:props.Opened_S_O.filter(e=>e.cod===item.cod)[0]}):null
        const ShowArrFunc=(item)=>{

           return  [alreadyOpend.filter(e=>e===item.cod).length>0,alreadyOpend.filter(e=>e===item.cod).length===0,true];

        }

  return (  <Layout style={props.themedStyle.container}>
                                      <Toolbar
                                                                      title={'Welcome '+props.userName+'  😀😀😀!!!'}
                                                                      backIcon={()=><StopWatch_IconMenu color={color.teal}/>}
                                                                      onBackPress={props.navigation.toggleDrawer}
                                                                    />
                                                                    <Divider/>
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

                                                                                                                            title:"New Service Order",
                                                                                                                            icon:EditIcon,
                                                                                                                            onPress:onPress_New_SO ,
                                                                                                                            status:"success"

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