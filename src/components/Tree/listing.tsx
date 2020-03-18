import React from 'react';
import {
  Button,
  Icon,
  List,
  Layout,
  Text,
  ListItem,
  Divider,
  Card
} from '@ui-kitten/components';
import { StyleSheet } from 'react-native';



const StarIcon = (style) => (
    <Icon {...style} name='star'/>
  );
  const renderItemIcon = (style) => (
    <Icon {...style} name='settings-outline'/>
  );
  const renderItemIconSelect = (style) => (
    <Icon {...style} name='settings-outline' fill='#3366FF'/>
  );


export const ListingCase = (props) => {

  


  const renderItem = ({ item, index }) => {

    const renderItemAccessory = (style) => (
        <Layout style={[style, styles.badge]}>
        <Text  style={{fontSize:20,color:"white"}}>{item.amount}</Text>
      </Layout>
      );

    return  <ListItem
                        title={item.title}
                        titleStyle={[props.selectedIndex===index?styles.titleSelect:{},{fontSize:16}]}
                        description={item.subtitle}
                        icon={props.selectedIndex===index?renderItemIconSelect:renderItemIcon}
                        accessory={renderItemAccessory}
                        style={props.selectedIndex===index?styles.select:{}}
                        onPress={()=>props.setSelectedIndex(index)}
                        />
  }
   
  

return props.show?<Layout style={styles.layout} level='4'>
                        <ListItem
                                            title={props.header}
                                            titleStyle={{fontSize:25,paddingTop:15}}
                                            />
                                {props.data.length>0?    
                                        <List
                                                        data={props.data}
                                                        renderItem={renderItem}
                                                        style={{minWidth:props.width}}
                                            />:
                                      <Card style={styles.card}  status='warning' >
                                           <Text category="h5" status="warning">NO PIECES ASSIGNED</Text>
                                       </Card>
                                }
                    </Layout>:null

};


const styles = StyleSheet.create({
    container: {
      padding: 16,
    },
    layout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      card: {
        marginVertical: 8,
      },
    badge: {
     justifyContent: 'center',
     alignItems: 'center',
     // height: 24,
    //  width: 48,
        paddingHorizontal: 12,
        paddingVertical:6,
      borderRadius: 12,
      backgroundColor: '#3366FF',
    },
    select:{
        borderLeftColor:'#3366FF',
        borderLeftWidth:5,
        backgroundColor:'#D6F5FE'
    },
    titleSelect:{
        color:'#3366FF'
    }
  });