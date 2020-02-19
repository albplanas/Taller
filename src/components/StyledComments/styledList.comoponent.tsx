import React from 'react';
import {
  Button,
  List,
  ListItem,
  Avatar,
  Layout,
} from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
const data = new Array(8).fill({
  title: 'Title for Item',
  description: 'Description for Item',
});

export const ListCompositeItemShowcase = () => {

  const renderItemAccessory = (style) => (
    <Button style={style}>FOLLOW</Button>
  );


  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${item.title} ${index + 1}`}
      description={`${item.description} ${index + 1}`}
      icon={()=><Avatar style={styles.avatar} shape='round' source={require('http://jva-sql:8080/Assistance/Diagnostic/icons/2.png')}/>}
      accessory={renderItemAccessory}
    />
  );

  return (
    <List
      data={data}
      renderItem={renderItem}
    />
  );
};







const AvatarShowcase = () => (
  <Layout style={styles.container}>

    <Avatar style={styles.avatar} shape='square' source={require('../../assets/icon.png')}/>

    <Avatar style={styles.avatar} shape='rounded' source={require('../../assets/icon.png')}/>

    <Avatar style={styles.avatar} shape='round' source={require('../../assets/icon.png')}/>

  </Layout>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: 8,
  },
  avatar: {
    margin: 8,
  },
});