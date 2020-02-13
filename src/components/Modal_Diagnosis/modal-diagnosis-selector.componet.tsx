import React from 'react';
import { StyleSheet,View,ScrollView ,Image} from 'react-native';
import {
  Layout,
  Button,
  Text,
  Divider,
  Card
} from '@ui-kitten/components';


import {Img_Src} from "../../assets/iconArrays.js"
import {ModalFeatures} from  "./modal-features.component"

import { connect } from 'react-redux';
import * as actionTypes from "../../store/actions";
import {diagnosisFeatures} from "../../scenes/EditServiceOrder/Mechanics/auxiliarFunc"



 class MNavigator extends React.Component {
  state={
    featureTree:[],

  }
  UNSAFE_componentWillMount(){

    var Arr=diagnosisFeatures(this.props.FeaturesList)
   
    this.setState({
      featureTree:Arr
    })
  }
  render() {
 


    
    
    return (
      <Layout  >

      <Card style={styles.card}  status='success'>
          <View style={styles.container}>
              <Text  style={{marginTop:10}}  category='h4'> {"SELECT ALL THAT APPLY"}</Text>
              <Button style={styles.button} status='danger'  
                      onPress={()=>this.props.navigation.goBack()}>Cancel</Button>
        </View>

        <Divider style ={{marginBottom:20}}/>

        <MultiCard  featureTree={this.state.featureTree} 
                    listChecked={this.props.diagnosisList} 
                    {...this.props}
                    onUpdate_DIAGNOSIS={(prop,val)=>this.props.onUpdate_DIAGNOSIS(prop,val)}
                    origen={"diagnosis"}
                    />
      </Card>
  

  
    </Layout>

    );
  }
}

const MultiCard=(props)=>{



  var cards=props.featureTree.sort((a,b)=> a.Title > b.Title?1:b.Title > a.Title ?-1:0).map(e=>{

    return <Card_Features elem={e} 

                          {...props}
                          />
  })
  return <ScrollView >
            <Layout style={styles.containerFeatures}>
          {cards}
            </Layout>
        </ScrollView>
}
const styles = StyleSheet.create({
 
  button: {
    margin: 8,
  },
  card: {
    marginVertical: 8,
    height:'100%'
  },
  card_features:{
    width:175,
    marginTop:10
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent:'space-between',
    
  },
  containerFeatures:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent:'space-between',
    paddingBottom:100
  },
  headerText: {
    marginHorizontal: 24,
    marginVertical: 16,
    textAlign:"center"
  },
  headerImage: {
    flex: 1,
    height: 120,
    width:120
   
    
  }
});




const Card_Features=(props)=>{
  var Ti=props.elem.Title;
  var id=props.elem.Id;

  return (
    <Card style={styles.card_features} status='success'>
      <View>
      <Image
          style={styles.headerImage}
          source={Img_Src.filter(x=>x.IDSysScheme===id).length>0?Img_Src.filter(x=>x.IDSysScheme===id)[0].src:"nothing"}
        />
        <ModalFeatures {...props} title={Ti}/>
      </View>
  </Card>
  )
} 


const mapStateToProps = state => {

  return {
    FeaturesList:state.list.FeaturesList,
    diagnosisList:state.diagnosisList.diagnosis_List
  };
};
const mapDispatchToProps = dispatch => {
return {
   
    onUpdate_LIST : (property,value) => dispatch({type: actionTypes.UPDATE_LIST ,property:property,value:value}),
    onUpdate_DIAGNOSIS:(property,value) => dispatch({type: actionTypes.UPDATE_DIAGNOSIS_LIST  ,property:property,value:value}),
    
};
};

const ModalNavigator= connect(mapStateToProps,mapDispatchToProps )(MNavigator)  ;
export {ModalNavigator};
export {MultiCard}