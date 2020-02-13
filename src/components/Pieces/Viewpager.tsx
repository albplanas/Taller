import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Text,
  ViewPager,
} from '@ui-kitten/components';
import {ListUsed} from "./ListUsed";

export const ViewPagerInlineStylingShowcase = (props) => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const shouldLoadComponent = (index) => index === selectedIndex;
  return (
    <ViewPager
      selectedIndex={selectedIndex}
      onSelect={(val)=> {setSelectedIndex(val)}}
      shouldLoadComponent={shouldLoadComponent}
      >
      <Layout
        level='2'
        style={styles.tab}>
        <ListUsed {...props} setSelectedIndex={setSelectedIndex}/>
      </Layout>
      <Layout
        level='2'
        style={styles.tab}>
        <Text category='h3'>Pieces Tree</Text>
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