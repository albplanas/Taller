import React, { PureComponent} from 'react';
import {
  Layout,
  Button,
  Divider,
  List,
  CardHeader,
  Card,
  ListItem,
  Text,
  Spinner
} from '@ui-kitten/components';
import {StyleSheet, Alert} from "react-native"
import {GetPiecesByMaintence} from "../../SQL/maintenance.sql.js"
import {CodeBranch_Icon} from "../../assets/icons"


  
  export const ListCompositeItemShowcase = (props) => {
    const [idDetails, setidDetails] = React.useState(null);
  
  
    const renderItem = ({ item, index }) => {
     
    return (
      <Card style={styles.card} header={()=><CardHeader title={item.number.split("/")[1]+' / '+item.date.date.slice(0,10)} />} status='success'>
          <Text category={"label"} style={{marginBottom:5}}>EXPLANATION</Text>
          <Divider style={{marginBottom:5}}/>
          <Text style={{marginBottom:5}}>
          {item.explanation}
          </Text>
          <Divider style={{marginBottom:5}}/>
        {idDetails===item.IdMaintenance?<MoredDetails idDetails={idDetails}/>:null} 
        <Divider/>
        {idDetails===item.IdMaintenance?<Button appearance={"outline"} 
                                            status={"success"}
                                            style={{marginVertical:8,marginTop:10,maxWidth:200}} 
                                            onPress={()=>setidDetails(null)}>
                                            Hide</Button>:<Button   appearance={"outline"} 
                                                                    style={{marginVertical:8,marginTop:10,maxWidth:200}} 
                                                                    onPress={()=>setidDetails(item.IdMaintenance)}>
                                                                    Learn More</Button> } 
      </Card>
  
    )};
  
    return (
        <Layout style={{marginRight:25,width:600,marginLeft:25}}>
      <List
        data={props.data}
        renderItem={renderItem}
      />
      </Layout>
    );
  };

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


  class MoredDetails extends PureComponent{
    constructor(props) {
      super(props);
      this.state = {
        idDetails:"",
        data:[],
        spinner:false
      };
    }
  
      componentDidMount(){
        this.setState({spinner:true})
         GetPiecesByMaintence(this.props.idDetails,(x)=>{
            this.setState({spinner:false, data:x,idDetails:this.props.idDetails})
         });

      }
      render(){
        
          return (
              <Layout>
                        <Text category={"label"} style={{marginBottom:5}}>More Details ....</Text>
                        {this.state.spinner?
                            <Spinner status='success'/>:
                            <Layout style={{marginLeft:20}}>
                               {this.state.data.length===0?<Text status="warning" >NO DATA FOUND</Text>:<ListPieces data={this.state.data}/>}
                               
                            </Layout>}
            </Layout>
          )
      }
  }





const ListPieces = (props) => {

  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${item.cod}  ( ${item.qty}  )`}
      description={`${item.descrip}`}
      icon={()=><CodeBranch_Icon color="#4b0082"/>}
    />
  );

  return (

    <List
      data={props.data}
      renderItem={renderItem}
    />
  );
};