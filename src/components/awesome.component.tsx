import React from 'react';
import { View, Text } from 'react-native';
import { withStyles } from '@ui-kitten/components';

const AwesomeView = (props) => {
  const { themedStyle, style, ...restProps } = props;

  return (
    <View {...restProps} style={[themedStyle.awesome, style]} >
        <Text >Hello</Text>
        
    </View>
  );
};

export const ThemedAwesomeView = withStyles(AwesomeView, (theme) => ({
  awesome: {
    backgroundColor: theme['color-primary-500'],
  },
}));