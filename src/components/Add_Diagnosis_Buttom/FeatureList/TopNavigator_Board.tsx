import React from 'react';
import {
  Icon,
  TopNavigation,
  TopNavigationAction,Button
} from '@ui-kitten/components';

import {default as color} from "../../../styles/color.json"
import {ArrowLeft_Icon} from "../../../assets/icons";

export const TopNavigationCase = (props) =>{

    const goBack=()=>{
      props.updateBeforeLeft();
      props.navigation.goBack()
    }
    const BackIcon = (style) => (
                                <Button     onPress={goBack} 
                                            appearance="ghost"
                                            style={{marginRight:20}}
                                            icon={()=><ArrowLeft_Icon size={48} color={color.white}/>}></Button>
      );
      const BackAction = () => (
        <TopNavigationAction icon={BackIcon} />
      );
    
    return (
        <TopNavigation
          leftControl={BackAction()}
          title='FEATURES'
          titleStyle={{fontSize:25,paddingTop:5}}
          subtitle={props.subtitle} 
          subtitleStyle={{fontSize:40,paddingTop:30}}
          style={{backgroundColor:color.indigo}}
        />
      );
} 