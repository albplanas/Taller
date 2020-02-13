import React, { Component } from 'react';
import {
  Card,
  Text,
  Button,
  Icon,
  Layout,
  Divider,
  Spinner
} from '@ui-kitten/components';
import {EditIcon,EditIcon_1} from "../assets/icons"
import {StyleSheet ,View,Image} from "react-native";
import { ProgressBar } from './progress-bar.component';
import {GetSpecificPictures} from "../SQL/equipment.sql"
import Logo from "../assets/notavailable.png";




const IconDownSimple = () => (
  <Icon name='arrow-ios-downward' width={24} height={24} fill='#28a745' />
);
const IconUpSimple = () => (
  <Icon name='arrow-ios-upward' width={24} height={24} fill='#28a745' />
);







export class CARD_TRUCK_INFO extends Component{
  constructor(props) {
    super(props);
    this.state = {  
      data:[],
      id:null,
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
  UNSAFE_componentWillMount(){
      this.setState({
        id:this.props.truckid_Diagnosis,
        data:this.props.FeaturesTruck===null?[]:this.props.FeaturesTruck.filter(x=>x.IDCatEquip+""===this.props.truckid_Diagnosis+"")
      })
  }
  UNSAFE_componentWillReceiveProps(nextProps){
    if(this.state.id!==nextProps.truckid_Diagnosis){
      this.setState({
        id:nextProps.truckid_Diagnosis,
        data:nextProps.FeaturesTruck===null?[]:nextProps.FeaturesTruck.filter(x=>x.IDCatEquip+""===nextProps.truckid_Diagnosis+"")
      })
    }
  
  }
render(){

 
  var dateReport=typeof (this.state.data[0]) === 'object'?
                  this.state.data[0].LastReportDate !== null?
                  this.state.data[0].LastReportDate.date?
                      this.state.data[0].LastReportDate.date.slice(0,10):"---":"---":"---"
  return(
    <Card style={(this.state.data.length<1 || !this.state.show)?{ maxHeight:90,margin :10 }:{ minHeight:500,margin :10 }}>
      <View style={styles.container}>
      <Button style={styles.button} appearance='ghost' status='info' icon={this.state.show?IconUpSimple:IconDownSimple} 
                onPress={this.changeShow}/>
            <Text status='success' style={{marginTop:10}}  category='h4'> {
              this.state.data.length>0?"EQUIPMENT "+this.state.data[0].cod:"EQUIPMENT NO SELECT"
            }</Text>
            <Button style={styles.button} appearance='outline' status='success'  
                    onPress={()=>this.props.navigation.navigate('Profile')}
                    icon={EditIcon_1}/>
      </View>
      {(this.state.data.length<1 || !this.state.show)?null:<Divider/>}
      {(this.state.data.length<1 || !this.state.show)?null:
                 <View style={styles.showContainer}>
                          
              
                          <View style={{  width: '50%', justifyContent:'center',padding:10 }} >
  
                            <Text
                                        style={styles.headerText}
                                        category='h6'>
                                        {"Brand          :   "+this.state.data[0].Brand+' / '+this.state.data[0].year}
                            </Text>
                         
                            <Text
                                        style={styles.headerText}
                                        category='h6'>
                                        {"Description :   "+this.state.data[0].descrip}
                            </Text>
                            <Text
                                        style={styles.headerText}
                                        category='h6'>
                                        {"Mtto / Mill :   "+this.state.data[0].mtto_mill}
                            </Text>
                            <Text
                                        style={styles.headerText}
                                        category='h6'>
                                        {"Current Millage :   "+this.state.data[0].CurrentMill}
                            </Text>
                            <Text
                                        style={styles.headerText}
                                        category='h6'>
                                        {"Last Report :   "+dateReport+"  /  "+this.state.data[0].LastReportExpla}
                            </Text>
                           
                          </View>
  
  
              
  
  
                          <View style={{ width: '50%', justifyContent:'center',}} >
  
                        <CardCustomHeaderShowcase elem={this.state.data[0]} />
  
                          </View>
  
  
              </View>
      }
    </Card>
  );
}

}



 

class CardCustomHeaderShowcase extends Component{
  constructor(props) {
    super(props);
    this.state = {  
      data:[],
      id:null,
      show:true
    };
   
  }

  UNSAFE_componentWillMount(){
      var id =this.props.elem.cod?this.props.elem.cod:null;

      var callback=(val)=>{
       // console.log(val)
        this.setState({id:id,img:val,spinner:false})}
      this.setState({spinner:true})

    GetSpecificPictures(id,callback)
  }
  UNSAFE_componentWillUpdate(nextProps){

    if(this.state.id+""!==nextProps.elem.cod+""){
     
      var id =nextProps.elem.cod?nextProps.elem.cod:null;
      this.setState({id:id})
      var callback=(val)=>{
        this.setState({img:val,spinner:false})}
      this.setState({spinner:true})

    GetSpecificPictures(id,callback)
    }
  
  }
  render(){
    const CustomHeader = () => this.state.spinner===true?
        
        <Layout style={styles.layout} >
          <Spinner size='giant' status='success'/>
          <Text category="h5">Loading ...</Text>
    </Layout>
        :(this.state.img.length===0||!this.state.img)?
        <Layout style={styles.layout} ><Image
        style={styles.headerImage}
        source={Logo }
      /></Layout>:<Image
      style={styles.headerImage}
      source={{ uri: this.state.img }}
    />;

   
    var result=SelectSMS(this.props.elem)

    return (
      <Card header={CustomHeader} >
        <Text category='s1'>
            {"Maintenance"}
          </Text>
          {result.error===null?
       
          <ProgressBar
            style={styles.itemProgressBar}
            progress={result.percentage}
            text={`${result.percentage}%`}
          />:<Text
          appearance='hint'
          category='h6'
          status='danger'>
          {result.error}
        </Text>}
    
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
    justifyContent:'space-between'
  },
  button: {
    margin: 8,
  },
  itemProgressBar: {
    width: '90%',
    marginVertical: 12,
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop:30,
    paddingBottom:30
  },
  showContainer:{  flex:1,flexDirection: 'row',alignContent :"space-around", margin: 5,padding:10},
  hiddenContainer:{  flex:1,flexDirection: 'row',alignContent :"space-around", margin: 5,padding:10,height:0}
});




function SelectSMS(data){
  if(data.mtto_mill+""==='null' || parseFloat(data.mtto_mill)<1){
    return {
      percentage:null,
      error:"The amount of millage between maintenance must be set up, PLEASE CONTACT WITH THE OFFICE AND REPORT THIS ERROR 😖😖😖"
    }
  }
 else if(data.CurrentMill+""==='null' || parseFloat(data.CurrentMill)<1){
    return {
      percentage:null,
      error:"The equipment have a problem with the  current millage, so it migth be either odometer doesn't work or the Wonder Box have to be updated, , PLEASE CONTACT WITH THE OFFICE AND REPORT THIS ERROR 😟😟😟"
    }
  }
  else if(data.MttoMill+""==='null' || parseFloat(data.MttoMill)<1){
    return {
      percentage:null,
      error:"The equipment doesn't have a previous record of mantence , PLEASE CONTACT WITH THE OFFICE AND REPORT THIS ERROR 😟😟😟"
    }
  }
  else{
    return {
      error:null,
      percentage:parseFloat(100*(parseFloat(data.CurrentMill)-parseFloat(data.MttoMill))/parseFloat(data.mtto_mill)).toFixed(0)
  }
}
}