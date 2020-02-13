import React from 'react';
import { StyleSheet,ScrollView } from 'react-native';
import {
  Layout,
  Text,
  ListItem,
} from '@ui-kitten/components';
import { TrashButton } from '../../../assets/icons';





 export  const ListChanges = (props) => {


      const justId = props.data.map(e=>e.SubId);
  
      const renderItem = props.data.map(item => {
                                                    

                                                    return <ListItem
                                                                          title={item.Title}
                                                                          description={item.Description}
                                                                          icon={props.iconSet[1]}
                                                                          accessory={()=> <TrashButton appe={"outline"} 
                                                                                                  deleteFunc={()=>{
                                                                                                    var value= justId.filter(x=>x!==item.SubId)
                                                                                                      props.delete(value)
                                                                                                  }}/>}
                                                                        />
                                                
                                                  });
          
       
  
        return (
  
          <Layout style={[styles.rowLayout,{marginBottom:140}]}>
            <ScrollView style={{width:'100%'}}>
              {renderItem.length===0?
                    <Text status="warning" category="h5" style={{textAlign:"center", marginBottom:5}} >----------------</Text>
                    :renderItem}
            </ScrollView>
          
      </Layout>
         
        );
  };



  const styles = StyleSheet.create({

    rowLayout: {
      width:'100%',
      marginBottom:80,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  
  
  
  
  
  
  
  