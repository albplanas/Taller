import React, { Component } from 'react';
import {
  Layout,
  TopNavigation,
  Button,
} from '@ui-kitten/components';
import {BackIcon,Calendar_Icon} from "../../assets/icons"



const BackAction = (navigation) => (
  <Layout><Button appearance='ghost'  icon={BackIcon} status="warning"  onPress={() => navigation.goBack()}/></Layout>
  );
  
  export  const TopNavigationAlignmentsShowcase = (props) => (
    <Layout>
  
      <TopNavigation
        title={'PREVIOUS SERVICE ORDER  '+props.route.params.cod} 
        alignment='center'
        leftControl={BackAction(props.navigation)}
      />
    </Layout>
  );