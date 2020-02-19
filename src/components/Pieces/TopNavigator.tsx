import React from 'react';
import {
  Layout,
  TopNavigation,
  Button,
} from '@ui-kitten/components';
import {BackIcon,Calendar_Icon} from "../../assets/icons"
import {StyleSheet, Alert} from "react-native"


const BackAction = (navigation) => (
    <Layout><Button appearance='ghost'  icon={BackIcon} status="warning"  onPress={() => navigation.goBack()}/></Layout>
  );
  
  export  const TopNavigationAlignmentsShowcase = (props) => (
    <Layout>
  
      <TopNavigation
        title={"Items that could fit with "+props.route.params.cod} 
        alignment='center'
        titleStyle={styles.tab}
        leftControl={BackAction(props.navigation)}
      />
    </Layout>
  );

  const styles = StyleSheet.create({
    tab: {
       fontSize:20
    },
  });