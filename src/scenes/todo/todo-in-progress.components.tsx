import React,{useEffect} from 'react';
import { ScrollView,  
  RefreshControl,
  SafeAreaView,StyleSheet, Alert, ToastAndroid} from 'react-native';
import {
  Input,
  Text,
  Layout,
  List,
  ListItem,
  ThemedComponentProps,
  withStyles,
  Button,
} from '@ui-kitten/components';
import { TodoInProgressScreenProps } from '../../navigation/todo.navigator';
import {AppRoute} from "../../navigation/app-routes"
import {storeData } from "../NewOrder/globalJSFunctions"

import {RefreshFunct} from "../NewOrder/globalJSFunctions"
import { EditIcon, SearchIcon,CarIcon } from '../../assets/icons';















const TodoInProgressScreenComponent = (props: TodoInProgressScreenProps & ThemedComponentProps): ListElement => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const [item, setItem] = React.useState(null);
  const onRefresh = React.useCallback(()=>RefreshFunct(props.onUpdate_LIST,setRefreshing), [refreshing]);
  const [data, setData] = React.useState([]);



 
  useEffect(() => {
   console.log(props.FeaturesTruck.length)
    setData(props.FeaturesTruck ) 
                          
  }, []);
  const Ft=(val,item=null)=>{setSelectedIndex(val);setItem(item)}
  return (  
  <Layout style={props.themedStyle.container}>
        <SafeAreaView >
                    <ScrollView
                                  refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                                  
                    >
                            <Layout style={styles.container}>
                                          
                                          <Layout style={styles.layerOne} level ="1">
                                             <Listing                         list={data} 
                                                                              Opened_S_O={props.Opened_S_O}
                                                                              params={props.route.params} 
                                                                              setSelectedIndex={Ft} 
                                                                              navigation={props.navigation}
                                                                              truckid_Diagnosis={props.truckid_Diagnosis}
                                                                              onUpdate_DIAGNOSIS={props.onUpdate_DIAGNOSIS}
                                                                              />
                                                                  
                                                                        
                                          </Layout>
                
                
                            </Layout>
                    
                        
    
                      </ScrollView>
                      
        </SafeAreaView>
    </Layout>
  );
};

export const Listing = (props) => {

  const [alreadyOpend,setalredyOpend]=React.useState([])
  const [text, setText] = React.useState("");
 
  
  useEffect(() => {
   
    setalredyOpend(props.Opened_S_O.map(e=>e.cod) ) 
                          
  }, [props.truckid_Diagnosis]);
  

        const renderItemAccessory = (item,style) => {
      
                    const decideAboutNewOrder=()=>{
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


                const selectTruck =()=>{
                  
                  storeData('truckid_Diagnosis',item.IDCatEquip+"");

                  props.onUpdate_DIAGNOSIS('truckid_Diagnosis',item.IDCatEquip+"")

                  props.navigation!==undefined?props.navigation.navigate(AppRoute.NEW_SERVICE_ORDER,{item:item}):null

                }

                const onPress_New_SO=()=>props.truckid_Diagnosis===null || props.truckid_Diagnosis+""===item.IDCatEquip+""? selectTruck(): decideAboutNewOrder()
                const onPress_Profile =() => props.navigation!==undefined?props.navigation.navigate(AppRoute.PROFILE,{cod:item.cod}):null
                    return <Layout style={{flexDirection: 'row',}}>
                                                    {
                                                      alreadyOpend.filter(e=>e===item.cod).length>0?
                                                          <Button   status="warning" icon={EditIcon} 
                                                                      onPress={ onPress_Edit_SO }>Opened Already !!! </Button>:

                                                            <Button   status="success" icon={EditIcon} style={style}
                                                                    onPress={onPress_New_SO}/>
                                                  }
                                                          
                                                          <Button   status="info" icon={CarIcon} style={style}
                                                                    onPress={onPress_Profile}/> 
                                                  </Layout>
   
    
  }

  const renderItem = ({ item, index }) => <ListItem
                                                      title={item.cod}
                                                      description={`${item.descrip} / ${item.Brand} / ${item.year} `}
                                                      titleStyle={{fontSize:30,padding:8}}
                                                      icon={CarIcon}
                                                      accessory={(style)=>renderItemAccessory(item,style)}
                                                    />

    const    remaining=(li)=> {
                            var rem =  text===""?li: li.filter(e=>e.cod.indexOf(text)!==-1)
                            return rem.length<=20?rem:rem.slice(0,12)
    } 
    const    alreadyOpened =()=>props.Opened_S_O.filter(e=>e.cod+""===text)                                     

    const onPress_Edit_SO = ()=> props.navigation!==undefined? props.navigation.navigate(AppRoute.EDIT_SERVICE_ORDER,{item:props.Opened_S_O.filter(e=>e.cod===item.cod)[0]}):null
    
  

  
  return  <>
           
              <Input
                    placeholder='SEARCH BY TRUCK ...'
                    value={text}
                    onChangeText={setText}
                    icon={SearchIcon}
                    style={{maxWidth:600,marginBottom:10}}
                  />
                    {alreadyOpened.length>0?<>
                          <Text category="h6"style={{marginBottom:30}}status="warning" >This Equipment has an opened order already, Click on Go to find this Order</Text>
                          <Button   status="warning" icon={EditIcon} 
                                      onPress={()=>{ onPress_Edit_SO}
                                            
                          }>GO to Edit</Button></> :
                          <>
                                <List
                                  contentContainerStyle={styles.contentContainer}
                                  data={remaining(props.list)}
                                  renderItem={renderItem}
                                />
                                <Text status="warning">Type more characteres to depure the search...</Text>
                                </>
                        }    
                </>

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