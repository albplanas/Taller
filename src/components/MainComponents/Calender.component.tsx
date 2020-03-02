import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Datepicker,
  Layout,
  Text,
  Icon
} from '@ui-kitten/components';

export const DatepickerCase= (props) => {

  //const [date, setDate] = React.useState(new Date());
  const rendercalendar = (style) => (
    <Icon {...style} name='calendar-outline'/>
  );  
  return (
    <Layout style={styles.container} >

      <Text
        style={styles.text}
        category='h6'>
        {`Selected date: ${props.date.toLocaleDateString()}`}
      </Text>

      <Datepicker
        date={props.date}
        onSelect={props.setDate}
        icon={rendercalendar}
      />

    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 100,
    margin:20,

  },
  text: {
    marginVertical: 8,
  },
});