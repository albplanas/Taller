import {AppRoute} from "../../navigation/app-routes"

import React from 'react';
import { StyleSheet,ScrollView,RefreshControl } from 'react-native';
import {
  Divider,
  Layout,
  Button,
  Text,
  Input,
  ListItem,
  List
} from '@ui-kitten/components';
import {
  SafeAreaLayout,
  SaveAreaInset,
} from '../../components/safe-area-layout.component';
import { EditIcon, InfoIcon,CloseIcon,SearchIcon } from '../../assets/icons';
import EditServiceOrderScreen  from "../EditServiceOrder/index"
import {RefreshFunct} from "../NewOrder/globalJSFunctions"



export const  TodoDoneScreen=(props)=> {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [item, setItem] = React.useState(null);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(()=>RefreshFunct(props.onUpdate_LIST,setRefreshing), [refreshing]);

    return (

      <SafeAreaLayout
                        style={styles.safeArea}
                        insets={SaveAreaInset.TOP}>

                    <ScrollView
                                  refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                                  
                    >
                          <Layout style={styles.container}>
                                          
                                          <Layout style={styles.layerOne} level ="1">
                                              {selectedIndex===0? <Listing    list={props.Opened_S_O} 
                                                                              route={props.route} 
                                                                              setSelectedIndex={(val,item=null)=>{setSelectedIndex(val);setItem(item)}} 
                                                                              navigation={props.navigation}/>:<EditServiceOrderScreen/>}
                                                                  
                                                                        
                                          </Layout>
                
                
                            </Layout>

                    </ScrollView>
              
      </SafeAreaLayout>
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
  layerTwo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: { width:600},

});








export const Listing = (props) => {


  const [text, setText] = React.useState("");

  const renderItemAccessory = (item,style) => (
    <Layout style={{flexDirection: 'row',}}>
    <Button   status="success" icon={EditIcon} style={style}
              onPress={()=>{
                                props.navigation!==undefined?props.navigation.navigate(AppRoute.EDIT_SERVICE_ORDER,{item:item}):null}
                                
                                }/>
    <Button   status="danger" icon ={CloseIcon} style={style} 
              onPress={()=>props.navigation!==undefined?props.navigation.navigate(AppRoute.SIGNATURE,{item:item}):null}></Button>
    </Layout>
  );

  const renderItem = ({ item, index }) => (
    <><ListItem
      title={item.cod}
      description={item.number+"\n"+item.date.date.slice(0,10)+ "\n"+item.explanation}
      titleStyle={{fontSize:30,padding:8}}
      icon={InfoIcon}
      accessory={(style)=>renderItemAccessory(item,style)}
    />
    
    </>
  );
var li=props.list;
var remaining=
                text===""?li:
                li.filter(e=>e.cod.indexOf(text)!==-1)

  return (
    <>
    <Input
                    placeholder='SEARCH BY TRUCK ...'
                    value={text}
                    onChangeText={setText}
                    icon={SearchIcon}
                    style={{maxWidth:600,marginBottom:10}}
                  />
            <Layout level="4" style={{paddingTop:1,marginBottom:60}}>
                 {remaining.length===0?
                    <Text status="warning" category="h3">No Service Order Found </Text>
                    :
                    <List
                    contentContainerStyle={styles.contentContainer}
                    data={remaining}
                    renderItem={renderItem}
                  />
                 }
            </Layout>
    </>
  );
};
