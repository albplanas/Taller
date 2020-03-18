import React from 'react';
import {
  Icon,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

const BackIcon = (style) => (
  <Icon {...style} name='arrow-back'/>
);

const BackAction = () => (
  <TopNavigationAction icon={BackIcon}/>
);

export const TopBar = (props) => {


    const BackAction = () => (
        <TopNavigationAction onPress={()=>props.navigation.goBack()} icon={BackIcon}/>
      );

      return (
        <TopNavigation
          leftControl={BackAction()}
          title='Back & Save'
        />
      );
}