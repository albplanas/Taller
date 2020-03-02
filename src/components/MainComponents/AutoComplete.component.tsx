import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Autocomplete,
  Icon,
  Layout,
} from '@ui-kitten/components';

const CloseIcon = (style) => (
  <Icon {...style} name='close'/>
);



export const AutocompleteCase = (props) => {



  return (
    <Layout style={styles.container} >
      <Autocomplete
        placeholder='Find a Truck'
        value={props.value}
        data={props.data}
        label={"Select Truck : "+(props.value===null?"-NO SELECT-":props.value)}
        labelStyle={{fontSize:18,paddingTop:10,color:"white"}}
        icon={CloseIcon}
        onIconPress={props.clearInput}
        onChangeText={props.onChangeText}
        onSelect={props.onSelect}
        placement="bottom end"
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 80,
    padding:20
  },
});
