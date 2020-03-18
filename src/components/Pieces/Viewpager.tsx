import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Text,
  ViewPager,
} from '@ui-kitten/components';
import {ListUsed} from "./ListUsed";
import {PiecesTree} from "../Tree/Structure.component"


export const ViewPagerInlineStylingShowcase = (props) => {

  
  const shouldLoadComponent = (index) => index === props.selectedIndex;
  return (
    <ViewPager
      selectedIndex={props.selectedIndex}
      onSelect={(val)=> {props.setSelectedIndex(val)}}
      shouldLoadComponent={shouldLoadComponent}
      >
      <Layout
        level='2'
        style={styles.tab}>
        <ListUsed {...props} />
      </Layout>
      <Layout
        level='2'
        style={styles.tab}>
        <PiecesTree/>
      </Layout>
    </ViewPager>
  );
};

const styles = StyleSheet.create({
  tab: {
      minHeight:"100%",
    alignItems: 'center',
    justifyContent: 'center',
  },
});