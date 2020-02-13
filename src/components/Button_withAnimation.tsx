import React, { Component } from 'react';
import {
  Icon,
  Button
} from '@ui-kitten/components';
import { StyleSheet} from 'react-native';





export const Button_With_Animation= (props) => {
    const iconRef = React.createRef();

    const onPress = () => {
      iconRef.current.startAnimation();
      props.onPress();
    };

    const renderIcon = (style) => (
      <Icon
        {...style}
        ref={iconRef}
        name={props.iconName}
      />
    );
 
    return (
    <Button  icon={props.iconName!==null?renderIcon:null} style={styles.button} onPress ={onPress} appearance={props.appe} status={props.status} >{typeof (props.textName)==="string"?props.textName:""}</Button>
  );
}

const styles = StyleSheet.create({

    button: {
      margin: 8,
    },

  });