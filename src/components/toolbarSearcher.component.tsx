import React from 'react';
import { ImageProps } from 'react-native';
import {
  Input,
  OverflowMenu,
  OverflowMenuItemType,
  StyleType,
  TopNavigation,
  TopNavigationAction,
  TopNavigationActionElement,
  TopNavigationProps,
} from '@ui-kitten/components';
import {
  BackIcon,
  MoreVerticalIcon,
} from '../assets/icons';
import {SearchIcon} from "../assets/icons"

export type ToolbarMenu = OverflowMenuItemType[];

export interface ToolbarProps extends TopNavigationProps {
  menu?: ToolbarMenu;
  backIcon?: (style: StyleType) => React.ReactElement<ImageProps>;
  menuIcon?: (style: StyleType) => React.ReactElement<ImageProps>;
  onMenuItemSelect?: (index: number) => void;
  onBackPress?: () => void;
}

export const Toolbar = (props: ToolbarProps): TopNavigationActionElement => {

  const { menu, backIcon, menuIcon, onMenuItemSelect, onBackPress, ...topNavigationProps } = props;
  const [menuVisible, setMenuVisible] = React.useState(false);


  const onMenuSelect = (index: number) => {
    setMenuVisible(false);
    onMenuItemSelect && onMenuItemSelect(index);
  };

  const onMenuActionPress = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = (menu: OverflowMenuItemType[]): TopNavigationActionElement => (
    
    <OverflowMenu
      visible={menuVisible}
      data={menu}
      placement='bottom end'
      onSelect={onMenuSelect}
      onBackdropPress={onMenuActionPress}>
      <TopNavigationAction
        icon={props.menuIcon || MoreVerticalIcon}
        onPress={onMenuActionPress}
      />
    </OverflowMenu>
  );

  const renderBackAction = (): TopNavigationActionElement => (
    <TopNavigationAction
      icon={props.backIcon || BackIcon}
      onPress={onBackPress}
    />
  );

  const Searcher= (): TopNavigationActionElement => (
    <Input
      placeholder='Find the vehicle'
      icon={SearchIcon}
      style={{minWidth:400}}
      onChangeText={(val)=>props.onSelectText(val)}
      value={props.text}
      size='small'
    />
  );
  const renderRightControls = () => [
    <Searcher/>,
  ];

  return (
    <React.Fragment>
      <TopNavigation
        {...topNavigationProps}
        leftControl={onBackPress && renderBackAction()}
        rightControls={renderRightControls()}
      >
        
      </TopNavigation>
    </React.Fragment>
  );
};
