import React from 'react';
import { StyleSheet,ScrollView } from 'react-native';
import {
  Layout,
  Text,
  ListItem,
} from '@ui-kitten/components';
import { TrashButton } from '../../../assets/icons';




 export  const ListChanges = (props) => {
  
  
      const renderItem = props.data.map(item => {
                                                    

                                                    return <ListItem
                                                                          title={item.title}
                                                                          description={item.description}
                                                                          icon={item.status==="old"?props.iconSet[0]:
                                                                                item.status==="new"?props.iconSet[1]:
                                                                                item.status==="cancel"?props.iconSet[2]:props.iconSet[0]}


                                                                          accessory={item.status==="new"||item.status==="cancel"?()=><TrashButton appe={"outline"} 
                                                                          deleteFunc={()=>{
                                                                            var value= item.snap!==undefined?item.status==="cancel"?item.snap.concat(item.id):
                                                                                                             item.status==="new"?item.snap.filter(ef=>ef!==item.id):
                                                                                                                                    item.snap
                                                                                                                                    :item.id
                                                                                                                                   
                                                                            props.delete(value)
                                                                          }}/>:null}
                                                                        />
                                                
                                                  });
          
       
  
        return (
  
          <Layout style={[styles.rowLayout,{marginBottom:140}]}>
            <ScrollView style={{width:'100%'}}>
              {renderItem.length===0?<Text status="warning" category="h5" style={{textAlign:"center", marginBottom:5}} >----------------</Text>
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
  
  
  
  
  
  
  
  