import React from 'react';
import {
  Icon,
  TopNavigation,
  TopNavigationAction,
  Layout,
  OverflowMenu,
} from '@ui-kitten/components';
import {StyleSheet} from "react-native"
import { AppRoute } from '../../navigation/app-routes';
import {Camera_Icon} from "../../assets/icons"



  const Pieces_Icon = (style) => (
    <Icon {...style} name='funnel-outline'/>
  );

const Order_Icon = (style) => (
    <Icon {...style} name='list-outline'/>
  );

const BackIcon = (style) => (
  <Icon {...style} name='arrow-back'/>
);

const InfoIcon = (style) => (
    <Icon {...style} name='sync-outline'/>
  );
  

const MenuIcon = (style) => (
  <Icon {...style} name='more-vertical'/>
);

const LibraryIcon = (style) => (
  <Icon {...style} name='bookmark-outline'/>
);




const styles = StyleSheet.create({
                    title:{
                        color:"white",
                        fontSize:16
                    },
                    container: {
                        minHeight: 192,
                    },
                    titleSelect:{
                        color:"yellow",
                        fontSize:24
                    }
})








export const TopBar = (props) => {

  const [menuVisible, setMenuVisible] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const onItemSelect = (index) => {
                setSelectedIndex(index);
            
                if(index===1){
            
                        props.navigation.navigate(AppRoute.SERVICE_ORDER, {
                        cod: props.item[0].cod,
                        id:  props.item[0].IDCatEquip
                        });
                }
                else if(index===0){
            
                props.navigation.navigate(AppRoute.CAMERA, {
                    from : 'profile',
                });
            }
            else if(index===2){
            
            props.navigation.navigate(AppRoute.PIECES_BY_TRUCK, {
                        cod: props.item[0].cod,
                        id:  props.item[0].IDCatEquip
            });
            }
                setMenuVisible(false);
  };


  const menuData = [
    
   
        { title: 'Change Picture'           ,titleStyle:{fontSize:20}, icon: Camera_Icon },
        { title: 'Service Order'            ,titleStyle:{fontSize:20}, icon: Order_Icon},
        { title: 'Pieces'                   ,titleStyle:{fontSize:20}, icon: Pieces_Icon  },
        { title: 'Technical Documentation'  ,titleStyle:{fontSize:20}, icon: LibraryIcon  },
        { title: 'Refresh'                  ,titleStyle:{fontSize:20}, icon: InfoIcon, },
    
  ];

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };



  const renderMenuAction = () => (
    <OverflowMenu
      visible={menuVisible}
      data={menuData}
      style={{width:300}}
      selectedIndex={selectedIndex}
      onSelect={onItemSelect}
      onBackdropPress={toggleMenu}>
      <TopNavigationAction
        icon={MenuIcon}
        onPress={toggleMenu}
      />
    </OverflowMenu>
  );

  const onBack=()=>{
    props.select===null?props.navigation.goBack():props.setSelect(null)
  }
  const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={onBack}/>
  );

  return (
    <Layout > 
      <TopNavigation
        title={ props.select===null?"  EQUIPMENT PROFILE 🚚":props.select}
        titleStyle={props.select===null?styles.title:styles.titleSelect}
        placement	="right end"
        leftControl={renderBackAction()}
        rightControls={renderMenuAction()}
      />
    </Layout>
  );
};
