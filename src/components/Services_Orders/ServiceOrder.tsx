import React, {PureComponent } from 'react';
import {
  Layout,
  Divider,
  Spinner,
  Text,
} from '@ui-kitten/components';
import {StyleSheet, Alert} from "react-native"
import {SetUp_Service_Order} from "./SetUp"
import {TopNavigationAlignmentsShowcase} from "./TopNavigator"
import  {ListCompositeItemShowcase} from "./DO_details"
import {GetMaintenceByID} from "../../SQL/maintenance.sql.js"





export class ServiceOrder extends PureComponent{
    constructor(props) {
        super(props);
        this.state = {
         range :{ startDate: null, endDate: null },
         selectedIndex:0,
         cod:"",
          id:null,
          data:[],
          spinner:false
        };
        this.setRangeP= this.setRangeP.bind(this)
        this.setSelectedIndex= this.setSelectedIndex.bind(this)
      }
     UNSAFE_componentWillMount(){
        var d=new Date;
        var init=d.getFullYear()+"-01-01";
        var final=d.getFullYear()+"-12-31";
        var id=this.props.route.params.id;
        this.setState({spinner:true,id:id})
        GetMaintenceByID(id,init,final,(x)=>this.setState({data:x,spinner:false}))
     }
     UNSAFE_componentWillReceiveProps(nextProps){

      var id=nextProps.route.params.id;
       if(id!==this.state.id){
        var d=new Date;
        var init=d.getFullYear()+"-01-01";
        var final=d.getFullYear()+"-12-31";
        this.setState({spinner:true,id:id})
        GetMaintenceByID(id,init,final,(x)=>this.setState({data:x,spinner:false}))
       }
         
     }
      setSelectedIndex(value){
        this.setState({
            selectedIndex:value
        })
        if(value===0){
          var d=new Date;
          var init=d.getFullYear()+"-01-01";
          var final=d.getFullYear()+"-12-31";
          var id=this.state.id;
          this.setState({spinner:true})
          GetMaintenceByID(id,init,final,(x)=>this.setState({data:x,spinner:false}))
        }
        else if(value===1){
          var d=new Date;
          var init=(d.getFullYear()-1)+"-01-01";
          var final=(d.getFullYear()-1)+"-12-31";
          var id=this.state.id;
          this.setState({spinner:true})
          GetMaintenceByID(id,init,final,(x)=>this.setState({data:x,spinner:false}))
        }
        else if(value===2){
          var init="2010-01-01";
          var final="2100-12-31";
          var id=this.state.id;
          this.setState({spinner:true})
          GetMaintenceByID(id,init,final,(x)=>this.setState({data:x,spinner:false}))    
        }
        
     }

      setRangeP(value){
            this.setState({
                startDate:value.startDate,
                endDate:value.endDate
            })
            
      }

    render(){

        return <>
                <TopNavigationAlignmentsShowcase {...this.props}/>
                <Divider/>
                <Layout style={styles.container}>
                    <Layout style={{paddingRight:1}} level='2'>
                      <SetUp_Service_Order  selectedIndex={this.state.selectedIndex}
                                            setSelectedIndex={(x)=>{this.setSelectedIndex(x)}}
                                            setRangeP={(x)=>this.setRangeP(x)}/>
                      
                    </Layout>
                    <Layout style={styles.layoutList} level='3'>
                              {this.state.spinner?
                                <Loader/>:this.state.data.length===0?<Text category="h1">NO DATA FOUND IN THIS RANGE...</Text>:
                                <ListCompositeItemShowcase data={this.state.data}/>}  
                    </Layout>
                </Layout>
            </>
    }
}
const Loader=()=>{
return (
  <Layout level="3" style={styles.layoutList}>
    <Spinner status='warning'size='giant'/>

    <Text style={{marginTop:25}} >Loading Data ...</Text>
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












