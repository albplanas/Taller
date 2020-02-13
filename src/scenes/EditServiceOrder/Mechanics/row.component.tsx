
import React  from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Text
} from '@ui-kitten/components';





const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
    },
    layout: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });


  export const rowComponent = (Diagnosis,Labor,Hrs,Pieces,End) => (
    <Layout style={[styles.container,{minWidth:600}]}>

            <Layout style={[styles.layout,{minWidth:200}]} level='1'>
            {Diagnosis}
            </Layout>

            <Layout style={[styles.layout,{minWidth:130}]} level='1'>
            {Labor}
            </Layout>
            <Layout style={[styles.layout,{minWidth:80}]} level='1'>
            {Hrs}
            </Layout>
            <Layout style={[styles.layout,{minWidth:130}]} level='1'>
           {Pieces}
            </Layout>
            
            <Layout style={[styles.layout,{minWidth:80}]} level='1'>
            {End}    
            </Layout>

  </Layout>
    
  );

