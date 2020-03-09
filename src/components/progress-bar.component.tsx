import React from 'react';
import {
  View,
  ViewProps,
} from 'react-native';
import {
  Text,
  ThemedComponentProps,
  withStyles,
} from '@ui-kitten/components';

export interface ProgressBarProps extends ViewProps, ThemedComponentProps {
  progress: number;
  text?: string;
}

const ProgressBarComponent = ({ progress, text, ...props }: ProgressBarProps): React.ReactElement<ViewProps> => {
  
  return (
    <View style={[props.themedStyle.container,]}>
      <View
        {...props}
        style={[props.themedStyle.progressContainer, props.style,]}>
        <View style={[progress>80?props.themedStyle.progress_Danger:
                      progress>66?props.themedStyle.progress_Warning:
                                  props.themedStyle.progress, { width: `${progress}%`,alignSelf:"flex-start"}]}/>
      </View>
      {text && <Text style={props.themedStyle.text} status={progress>80?"danger":
                                                            progress>66?"warning":
                                                                        "primary"}category='c2'>{text}</Text>}
    </View>
  );

}


export const ProgressBar = withStyles(ProgressBarComponent, (theme) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressContainer: {
    height: 6,
    borderRadius: 3,
    backgroundColor: theme['background-basic-color-2'],
    overflow: 'hidden',
  },
  progress_Warning: {
    flex: 1,
    backgroundColor: theme['color-warning-default'],
  },
  progress_Danger: {
    flex: 1,
    backgroundColor: theme['color-danger-default'],
  },
  progress: {
    flex: 1,
    backgroundColor: theme['color-primary-default'],
  },
  text: {
    marginHorizontal: 16,
  },
}));

