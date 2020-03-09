import React,{useEffect} from 'react';
import {   StyleSheet} from 'react-native';
import {
  Input,
  Text,
  Layout,
  List,
  ListItem,
  Button,
} from '@ui-kitten/components';

import {  SearchIcon,CarIcon } from '../../assets/icons';






export const Listing = (props) => {

  
  const [text, setText] = React.useState("");
  const [numOfElem] = React.useState(12);

  

        const renderItemAccessory = (item,style) => {

                                      const arrshow=props.ShowArrFunc(item);

                                          return <Layout style={{flexDirection: 'row',}}>
                                                                    {
                                                                      props.renderItemAccessoryObject.map((button,index)=>{

                                                                              const onPress=()=>button.onPress(item);

                                                                              return arrshow[index]?<Button   status={button.status} 
                                                                                                              icon={button.icon} 
                                                                                                              key={index+"-button-"+item.cod}
                                                                                                              style={style}
                                                                                                              onPress={onPress}>{button.title}</Button> :null
                                                                      })}           
                                                                                        
                                                </Layout>
   
    
  }

  const renderItem = ({ item, index }) =>{

                  return index===numOfElem-1?
                                      <ListItem
                                                  title={"If you don't find your equipment above try to refine the search typing more characters"}
                                                  titleStyle={{fontSize:20,padding:12,color:"#fd7e14"}}
                                                  icon={SearchIcon}
                                                  key={props.keylist+index}
                                                />:
                                      <ListItem
                                                    title={item.cod}
                                                    description={`${item.descrip} / ${item.Brand} / ${item.year} `}
                                                    titleStyle={{fontSize:30,padding:8}}
                                                    icon={CarIcon}
                                                    accessory={(style)=>renderItemAccessory(item,style)}
                                                    key={props.keylist+index+"@"}
                                                  />

  } 

    const    remaining=(li)=> {
                            var rem =  text===""?li: li.filter(e=>e.cod.indexOf(text)!==-1)
                            return rem.length<=numOfElem?rem:rem.slice(0,numOfElem)
    } 
                                   



  
  return  <>
           
              <Input
              key={"serach"+props.keylist}
                    placeholder='SEARCH BY TRUCK ...'
                    value={text}
                    onChangeText={setText}
                    icon={SearchIcon}
                    style={{maxWidth:600,marginBottom:10}}
                  />
              <List
                                                    contentContainerStyle={styles.contentContainer}
                                                    data={remaining(props.list)}
                                                    renderItem={renderItem}
                                                    refreshControl={props.refreshControl}
                                                    
                                                  />
                        
        </>

};



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