import React, { Component } from 'react';
import {
  Layout,
  Divider,
  Spinner,
  Text,
} from '@ui-kitten/components';
import {StyleSheet, Alert} from "react-native"
import {BackIcon,Calendar_Icon} from "../../assets/icons"
import {TopNavigationAlignmentsShowcase} from "./TopNavigator"
import {GetPiecesByTruck} from "../../SQL/maintenance.sql.js"
import {ViewPagerInlineStylingShowcase} from "./Viewpager"






export class PiecesByTruck extends Component{
    constructor(props) {
        super(props);
        this.state = {
         cod:"",
          id:null,
          data:[],
          spinner:false,
        };
       
      }
     UNSAFE_componentWillMount(){
        this.setState({spinner:true,id:this.props.route.params.id})
        GetPiecesByTruck(this.props.route.params.id,(x)=>{this.setState({data:x,spinner:false})})
     }
     UNSAFE_componentWillReceiveProps(nextProps){
         if(nextProps.route.params.id!==undefined){
            if(nextProps.route.params.id!==this.state.id){
  
                this.setState({spinner:true,id:nextProps.route.params.id})
                GetPiecesByTruck(nextProps.route.params.id,(x)=>{this.setState({data:x,spinner:false})})
            }
         }

     }

     GetView(value){
            this.setState({
                view:value
            })
            
      }

    render(){
        return <>
                <TopNavigationAlignmentsShowcase  {...this.props}/>
                <Divider/>
                <Layout  style={styles.container}>
                    {this.state.spinner?<Loader/>:
                        <ViewPagerInlineStylingShowcase data={this.state.data}/>}
                </Layout>
            </>
    }
}
const Loader=()=>{
return (
  <Layout level="3" style={styles.layoutList}>
    <Spinner status='warning'size='giant'/>

    <Text category="h4">Loading Data ... </Text>
  </Layout>
)

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
    },
    layoutList:{
        flex: 1,
      justifyContent: 'center',
      alignItems: "center",
      width:"100%",
    },
      card: {
        marginVertical: 8,
      },
      text:{}
  });

