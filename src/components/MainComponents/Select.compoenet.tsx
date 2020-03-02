import React,{useEffect} from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Select,Icon
} from '@ui-kitten/components';


const CloseIcon = (style) => (
    <Icon {...style} name='close'/>
  );
export const SelectCase= (props) => {

  

  return (
    <Layout style={styles.container}>
      <Select
                data={props.data}
                multiSelect={true}
                icon={CloseIcon}
                label="Select Employee :"
                labelStyle={{fontSize:18,paddingTop:10,color:"white"}}
                selectedOption={props.selectedOption}
                onSelect={props.setSelectedOption}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 120,
    padding:20
  },
});