import React from 'react';
import {
  Icon,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

const BackIcon = (style) => (
  <Icon {...style} name='arrow-back'/>
);

const BackAction = (props) => (
  <TopNavigationAction {...props} icon={BackIcon}/>
);



export const TopNavigationCase= (props) => {

  const onBackPress = () => {
      props.navigation.goBack()
  };

  const renderLeftControl = () => (
    <BackAction onPress={onBackPress}/>
  );



  return (
    <TopNavigation
      title='Go Back'
      titleStyle={{fontSize:24}}
    //  alignment="center"
      leftControl={renderLeftControl()}
    />
  );
};