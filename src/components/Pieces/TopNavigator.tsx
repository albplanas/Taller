import React from 'react';
import {
  Layout,
  TopNavigation,
  Button,
  Text
} from '@ui-kitten/components';
import {BackIcon,Calendar_Icon} from "../../assets/icons"
import {StyleSheet, Alert} from "react-native"


const BackAction = (navigation) => (
    <Layout><Button appearance='ghost'  icon={BackIcon} status="warning"  onPress={() => navigation.goBack()}/></Layout>
  );
 
  export  const TopNavigationAlignmentsShowcase = (props) => {
    const RefreshAction = () => (
      <Layout style={[styles.container,{maxWidth:400}]}>

              <Layout style={styles.layout} >
                <Button appearance="ghost" 
                        status={props.selectedIndex===0?"primary":"basic"}
                        onPress={()=>props.setSelectedIndex(0)}
                        >Used Before</Button>
              </Layout>
          
              <Layout style={[styles.layout,{maxWidth:50}]} >
                <Text status="basic">{ " / "}</Text>
              </Layout>
          
              <Layout style={styles.layout} >
              <Button appearance="ghost" 
                      status={props.selectedIndex===1?"primary":"basic"}
                      onPress={()=>props.setSelectedIndex(1)}>Part & Piece Tree</Button>
               
              </Layout>
      </Layout>
    ); 
    return (
      <Layout>
    
        <TopNavigation
          title={"Equipment "+props.route.params.cod} 
          titleStyle={styles.tab}
          leftControl={BackAction(props.navigation)}
          rightControls={RefreshAction()}
        />
      </Layout>
    );
  }

  const styles = StyleSheet.create({
    tab: {
       fontSize:20
    },
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