import React, { Component } from 'react';
import {
  Card,
  CardHeader,
  Text,
  Button,
  Icon,
  Layout,
  Divider,
  List,
  ListItem,
} from '@ui-kitten/components';
import {ToolsIcon,PlusIcon} from "../assets/icons"
import {StyleSheet ,View,Image, Alert} from "react-native";

import AsyncStorage from '@react-native-community/async-storage';




const IconDownSimple = () => (
  <Icon name='arrow-ios-downward' width={24} height={24} fill='#17a2b8' />
);
const IconUpSimple = () => (
  <Icon name='arrow-ios-upward' width={24} height={24} fill='#17a2b8' />
);


export class CARD_TRUCK_DIAGNOSES extends Component{
  constructor(props) {
    super(props);
    this.state = {  
      show:false
    };
    this.changeShow=this.changeShow.bind(this)
  }
  changeShow(){
    var vs=this.state.show;
    this.setState({
        show:!vs
    })
  }
  render(){

    return(
      <Card style={ !this.state.show?{ maxHeight:100,margin :10, }:{ margin :10 }} >
           <View style={styles.container}>
              <Button style={styles.button} appearance='ghost' status='info' icon={this.state.show?IconUpSimple:IconDownSimple} 
                        onPress={this.changeShow}/>
              <Text status='info' style={{marginTop:15}}  category='h4'> {"DIAGNOSIS"}</Text>
                <Button
                      style={styles.button} 
                      appearance='outline' 
                      status='info'
                      icon={PlusIcon}
                      onPress={()=>this.props.navigation.navigate('Diagnosis/Modal')}
                      
                    />
          </View>
          {( !this.state.show)?null:<Divider/>}
          {(!this.state.show)?null:<ListCompositeItemShowcase {...this.props}/>}

          
      </Card>
    );
  }
}





const styles = StyleSheet.create({
  headerText: {
    marginHorizontal: 24,
    marginVertical: 16,
  },
  headerImage: {
    height: 350,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding:5,
    justifyContent:'space-between'
  },
  header: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding:5,
    justifyContent:'space-between'
    ,maxHeight:85
  },
  button: {
    margin: 8,
  },
  itemProgressBar: {
    width: '90%',
    marginVertical: 12,
  }
});









var DeleteID = async (newList) => {
  try {
      
      await AsyncStorage.setItem("diagnosis_List",JSON.stringify(newList))
      alert("This Diagnosis has been deleted 🗑🗑🗑") 
    } catch (e) {
      alert("Something was wrong: "+e)
    }
  }


const ListCompositeItemShowcase = (props) => {

   

  const renderItem = ({ item, index }) => {
    const renderItemAccessory = (style) =>{
      var newList=props.diagnosis_List.filter(x=>x!==item.id);
    
      var UpdateRedux=(newList)=>props.onUpdate_DIAGNOSIS("diagnosis_List",newList)
      return (
        <Button style={styles.button} 
                onPress={()=>{
                  
                  UpdateRedux(newList);
                  DeleteID(newList);
                }}
                appearance='outline' 
                status='danger'
        >Delete</Button>
      );
    }
    return (

      <ListItem
        title={`${item.title} `}
        description={`${item.description} `}
        icon={ToolsIcon}
        accessory={renderItemAccessory}
      />
    );
  }

  const data=props.FeaturesList.length<1?[]:props.diagnosis_List.map(id=>{
    
          const elem=  props.FeaturesList===undefined?[]:props.FeaturesList.filter(x=>x.SubId===id)
            return {
              title: elem.length===0?'Refresh the app to see the name of this Item':elem[0].Description,
              description: elem.length===0?'---':elem[0].Title,
              id:id
            }
          
        })

  return (
    <List
      data={data}
      renderItem={renderItem}
    />
  );
};