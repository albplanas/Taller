import React from 'react';
import {
  Icon,
  Layout,
  Menu,
  ListItem,
} from '@ui-kitten/components';
import { StyleSheet } from 'react-native';


export const MenuList = (props) => {

  

  return props.show?
                    <Layout style={styles.layout} level='4'>
                        <ListItem
                        title={props.header}
                        titleStyle={{fontSize:30,paddingTop:15}}
                        />
                                    <Menu
                                    data={props.data}
                                    selectedIndex={props.selectedIndex}
                                    onSelect={props.setSelectedIndex}
                                    style={[{minWidth:props.width,maxWidth:props.width+10,alignSelf:"center"}]}
                                    />
                    </Layout>:null


};


const styles = StyleSheet.create({
    layout: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    avatar: {
      margin: 16,
    },
  });
  