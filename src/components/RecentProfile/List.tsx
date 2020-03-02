import React ,{useEffect}from 'react';
import { StyleSheet,ScrollView, Alert } from 'react-native';
import {
  ListItem,
  List,
  Text,
  Layout,
  Divider
  
} from '@ui-kitten/components';
import {ProgressBar} from "../progress-bar.component"




 export  const ListChanges = (props) => {

 
      
      const renderItem = ({ item, index }) => {                              
                                            return   item.type==="list"?
                                                                <ListItem
                                                                  title={`${item.title}`}
                                                                  description={`${item.description}`}
                                                                  icon={item.icon}
                                                                />:
                                                    item.type==="divider" ?
                                                                <Divider/>   :
                                                    item.type==="progressbar" ?                   
                                                                <ProgressMaintenance result={item.description}/>:
                                                                <Layout/>
                                                
                                                  };


          
       
  
        return     <List
                          data={props.data}
                          renderItem={renderItem}
                          style={{maxHeight:340}}
                        />

  };


const ProgressMaintenance=(props)=>{
  const [result,setResult]=React.useState(null);       
  useEffect(() => {
    setResult(props.result)

  },[props.result])
  
  return <Layout>  
            <Text category={props.result.percentage>95?"h6":"s1"} 
                  status={  props.result.percentage>95?"warning":""}> {"Maintenance Progress"}</Text>
              {
                  result      ===null?     <Layout/>:
                  result.error===null?     <Layout> 
                                              <ProgressBar   style={styles.itemProgressBar} progress={result.percentage} text={`${result.percentage}%`} />
                                            </Layout>:
                                           <Text appearance='hint' category='h6'  status='danger'> {result.error} </Text>
                  }
                  <Divider/>
           </Layout>       
}




  const styles = StyleSheet.create({
    itemProgressBar: {
      marginVertical: 12,
      alignItems: 'center',
      width:250,
    },
  
    avatar: {
      margin: 8,
      width:64,
      height:64,
      backgroundColor:'#ADD8E6'
    },
  });
  
  
  
  
  
  
  
  