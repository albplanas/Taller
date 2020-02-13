import React, { Component } from 'react';
import {
  Layout,
  RangeCalendar, 
  Radio,
  RadioGroup,
  RangeDatepicker,
  Text,
  Divider,
} from '@ui-kitten/components';
import {StyleSheet} from "react-native"


export const SetUp_Service_Order=(props)=>{
return <Layout style={styles.layout} level='4'>
            <RadioGroupSimpleUsageShowcase setRangeP={(x)=>props.setRangeP(x)}  selectedIndex={props.selectedIndex}  setSelectedIndex={(x)=>{props.setSelectedIndex(x)}}/>
           
        </Layout>
}


const event = new Date('05 October 2011 14:48 UTC');




const RangeCalendarSimpleUsageShowcase = (props) => {

    const [range, setRange] = React.useState({  });
    
    
    return (
      <Layout style={styles.containerCalendar} level="4">
      <RangeDatepicker
        min={event}
        range={range}
        onSelect={(range)=>{setRange(range);props.setRangeP(range)}}
      />
    </Layout>
    );
  };
  
  
  const RadioGroupSimpleUsageShowcase = (props) => {
  
    
  
    return (
      <Layout level="4" style={{marginLeft:20}}>
  
        <Text style={styles.text} category='h6'>
          {"Select Date Range"}
        </Text>
  
        <RadioGroup
          selectedIndex={props.selectedIndex}
          onChange={props.setSelectedIndex}>
          <Radio style={styles.radio} text='This Year'/>
          <Radio style={styles.radio} text='All of Them'/>
         
          <Radio style={styles.radio} text='Custom Range'/>
          <RangeCalendarSimpleUsageShowcase  setRangeP={(x)=>props.setRangeP(x)}/>
          
        </RadioGroup>
  
      </Layout>
    );
  };


  const styles = StyleSheet.create({
 
    layout: {
      flex: 1,
      justifyContent: 'center',
      alignItems: "flex-start",
    },
    containerCalendar: {
      minHeight: 376,
      minWidth:344,
      marginLeft:10,
      marginRight:10
    },
    text: {
        marginVertical: 8,
      },
      radio: {
        marginVertical: 8,
      },
  });