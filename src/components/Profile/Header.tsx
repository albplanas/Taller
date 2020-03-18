import React from 'react';
import {
  Button,
  Icon,
  Layout,
  TopNavigation,
  OverflowMenu,
} from '@ui-kitten/components';
import {StyleSheet ,View,Image, Alert} from "react-native";


import {Camera_Icon} from "../../assets/icons"
import { AppRoute } from '../../navigation/app-routes';
import {default as color} from "../../styles/color.json"

const MenuIcon = (style) => (
    <Icon {...style} name='options-2-outline' width={32} />
    );

  const Pieces_Icon = (style) => (
    <Icon {...style} name='bulb-outline'/>
  );

const Order_Icon = (style) => (
    <Icon {...style} name='list-outline'/>
  );
const data = [
    { title: 'Change Picture',icon: Camera_Icon },
    { title: 'Service Order',icon: Order_Icon},
    { title: 'Pieces',icon: Pieces_Icon  },
  ];

export const TopNavigationActionsShowcase = (props) => {




    const renderRightControls = () => [
      <OverflowMenuSimpleUsageShowcase {...props}/>,
    ];
  
    return (
        <Layout level="4" style={{width:600,padding:1,marginLeft:30,borderRadius:5}}>
                  <TopNavigation
                  title={props.title}
                  titleStyle={[styles.headerText,{color:color.orange,fontSize:30,paddingTop:10}]}
                  rightControls={renderRightControls()}
                  />
      </Layout>
    );
  };

  const OverflowMenuSimpleUsageShowcase = (props) => {

    const [menuVisible, setMenuVisible] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(null);
  
    const onItemSelect = (index) => {
      setSelectedIndex(index);
     
      if(index===1){
     
              props.navigation.navigate(AppRoute.SERVICE_ORDER, {
                cod: props.cod,
                id:props.id
              });
      }
      else if(index===0){
     
        props.navigation.navigate(AppRoute.CAMERA, {
          from : 'profile',
        });
  }
  else if(index===2){
     
    props.navigation.navigate(AppRoute.PIECES_BY_TRUCK, {
      cod: props.cod,
      id:props.id
    });
  }
      setMenuVisible(false);
    };
  
    const toggleMenu = () => {
      setMenuVisible(!menuVisible);
    };
  
    return (
      <Layout style={{ minHeight: 60,}}>
        <OverflowMenu
          data={data}
          visible={menuVisible}
          selectedIndex={selectedIndex}
          onSelect={onItemSelect}
          onBackdropPress={toggleMenu}>
          <Button status={"primary"}onPress={toggleMenu} style={styles.button} size="giant" appearance="ghost" icon={MenuIcon}></Button>
        </OverflowMenu>
      </Layout>
    );
  };


  const styles = StyleSheet.create({
    card: {
        marginVertical: 8,
        maxHeight:600
      },
      headerText: {
        marginHorizontal: 18,
        fontSize:20,
        marginVertical: 16,
        color:"#28a745",
        textAlign:"center"
      }, 

      button: {
        margin: 8,
      },

    
  });