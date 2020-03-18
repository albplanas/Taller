import React from 'react';
import { StyleSheet,} from 'react-native';
import {
  Layout,
  Button,
  Text,
  Input,
  ListItem,
  List
} from '@ui-kitten/components';

import { CarIcon, SearchIcon } from '../../assets/icons';
import {default as color} from "../../styles/color.json"




export const VerticalLayout=(props)=>{
  return <Layout style={{flex:1,justifyContent:"center"}}>
                    <Input
                                    placeholder='SEARCH BY TRUCK ...'
                                    value={props.text}
                                    onChangeText={props.setText}
                                    style={{maxWidth:500,marginTop:10,alignSelf:"center"}}
                                    size="large"
                                    icon={SearchIcon}
                                  />
                        <Listed {...props} text={props.text} setSelect={props.setSelect}/>
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
    width:500,
    marginTop:30,
    alignSelf:"center"
  },
  text: {
    margin: 8,
  }

});


const Listed =(props)=>{

    var arr=props.text.length===0?props.FeaturesTruck:props.FeaturesTruck.filter(x=>x.cod.indexOf(props.text)!==-1).sort((a,b)=>{return a.cod>b.cod?1:-1})
    var newArr=arr.slice(0,15);
  return  <Layout style={styles.containerL}>

              <Layout style={styles.layout1} level='2'>
                    { arr.length===0?<NoFound/>: <ListCompositeItemShowcase  data={newArr} setSelect={props.setSelect} /> }    
              </Layout>
                  
                    
      </Layout>
  }


const NoFound=()=>{
  return <Layout >
        <Text style={styles.text} status="warning"category='h1'>SEARCH NO FOUND ... </Text>
  
      </Layout>
  }



  const ListCompositeItemShowcase = (props) => {
  
   const renderItem = ({ item, index }) => {
                const renderItemAccessory = (style) => (
                  <Button style={style}
                          onPress={()=>props.setSelect(item.cod)}>SELECT</Button>
                );
                return index<props.data.length-1?
                          (
                            <ListItem
                              title={`${item.cod} `}
                              key={"prof_"+item.cod+"_"+index}
                              titleStyle={{fontSize:25, color:color.orange}}
                              description={`${item.descrip} / ${item.Brand} / ${item.year} `}
                              descriptionStyle={{fontSize:16}}
                              icon={CarIcon}
                              accessory={renderItemAccessory}
                            />
                          ):(
                            <ListItem
                              title={"Don't find your search yet ?"}
                              key={"prof_"+item.cod+"_"+index}
                              titleStyle={{fontSize:25, color:color.yellow}}
                              description={"Try typing more characters in the search bar ..."}
                              descriptionStyle={{fontSize:16}}
                              style={{marginTop:3}}
                            />
                          );
              }
  
    return (
      
      <List
        data={props.data}
        renderItem={renderItem}
        style={{minWidth:500}}
      />
    );
  };
  