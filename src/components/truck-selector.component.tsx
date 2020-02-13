import React, { Component } from 'react';
import {
  Card,
  Text,
  Button,
  Icon,
  Input,
  Layout,
  List,
  ListItem,
} from '@ui-kitten/components';



import {StyleSheet ,View,Image,ScrollView } from "react-native";
import { SearchIcon,CarIcon,BulbIcon,MenusCilcleIcon, Checkmark_Icon,PaperPlane_Icon} from '../assets/icons';

import AsyncStorage from '@react-native-community/async-storage';


export class TruckSelector extends Component {
  state={
    visible:false,
    input:"",
    data:[]
  }
  
  Clear_Text = ()=>{
    this.setState({input:""});
   
  }
  Change_Text = (value)=>{
    this.setState({input:value.toUpperCase()});
   
  }
  UNSAFE_componentWillMount(){
    this.setState({
      data:this.props.FeaturesTruck
    })
  }
  UNSAFE_componentWillReceiveProps(nextProps){
    if(this.state.data.length!==nextProps.FeaturesTruck.length){
      this.setState({
        data:nextProps.FeaturesTruck
      })
    }
  }
  
render(){


  var arr=this.state.data.filter(x=>x.cod.indexOf(this.state.input)!==-1)

 
  
  return (

    <Layout style={styles.containerL}>
              <Layout style={styles.layout}>
                          <Input
                                    style={this.props.themedStyle.filterInput}
                                    placeholder='Find the Equipment'
                                    value={this.state.input}
                                    size='medium'
                                    icon={SearchIcon}
                                    onChangeText={(value)=>this.Change_Text(value)}
                                  />
              </Layout>

              <Layout style={styles.layout1} level='2'>
                    {this.state.input.length<1?null:
                    arr.length===0?<NoFound/>:
                    
                    <Hint data={arr.length>5?arr.slice(0,4):arr} Clear_Text={()=>this.Clear_Text()} onUpdate_DIAGNOSIS={this.props.onUpdate_DIAGNOSIS} /> }      
              </Layout>
                  
  
      </Layout>
);
}


}


const NoFound=()=>{
return <Layout >
      <Text style={styles.text} icon ={MenusCilcleIcon}status="warning"category='h1'>SEARCH NO FOUND ... </Text>

    </Layout>
}
const ListCompositeItemShowcase = (props) => {


const funct=(val)=>{
  var vp=val+""    
  props.onUpdate_DIAGNOSIS('truckid_Diagnosis',vp);
  props.Clear_Text();
  var  storeData = async (vp) => {
    try {
      await AsyncStorage.setItem('truckid_Diagnosis', vp);
      
    } catch (e) {
        alert(e)
    }
  }
  storeData(vp);
}
  



  const renderItem = ({ item, index }) => {
    const renderItemAccessory = (style) => (
      <Button style={style}onPress={()=>funct(item.IDCatEquip)}>SELECT</Button>
    );
    return (
      <ListItem
        title={`${item.cod} `}
        description={`${item.descrip} / ${item.Brand} / ${item.year} `}
        icon={CarIcon}
        accessory={renderItemAccessory}
      />
    );
  }

  return (
    
    <List
      data={props.data}
      renderItem={renderItem}
    />
  );
};



const Hint=(props)=>{
  return(<Layout>

        <ListCompositeItemShowcase {...props}/>
    </Layout>
  )
}


const styles = StyleSheet.create({
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
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  layout1: {
    flex: 1,
    maxHeight:300,
    marginLeft:10,
    marginRight:10,
  },
  text: {
    margin: 8,
  },
});






