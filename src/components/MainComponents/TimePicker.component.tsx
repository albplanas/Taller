import React, {useState} from 'react';
import {View,  Platform,StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Button,ListItem,ButtonGroup, Layout,Icon} from '@ui-kitten/components'
import {EditIcon} from "../../assets/icons"

const ClockIcon = (style) => (
  <Icon {...style} name='clock-outline'/>
);
const CalendarIcon = (style) => (
  <Icon {...style} name='calendar-outline'/>
);
export const TimePicker_Component = (props) => {

  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("time");

  const onChange = (event, selectedDate) => {
      
    const currentDate = selectedDate || props.date;
    setShow(Platform.OS === 'ios');
    props.setDate(currentDate);
  };

  const onPress=(val)=>{
    setMode(val);
    setShow(true);
  }

const group=()=> <ButtonGroup  size={"large"}  style={[styles.buttonGroup,{minWidth:130,minHeight:50}]} appearance='outline' status={props.status}>
                      
                      <Button onPress={()=>onPress("time")}  icon ={ClockIcon} />
                      <Button onPress={()=>onPress("date")} icon={CalendarIcon}/>
                  </ButtonGroup>


  return (
    <Layout style={{minWidth:300}}>
        <ListItem
                    key={"clock"}
                    icon={group}
                    title={props.date===null?"-- still open --":(props.date+"").slice(15,21)}
                    titleStyle={{fontSize:25,marginTop:7}}
                    description={props.date===null?"":(props.date+"").slice(0,15)}
                    descriptionStyle={{fontSize:16}}
        />
      <View>
        
      </View>
      {show && (
                <DateTimePicker
                        testID="dateTimePicker"
                        timeZoneOffsetInMinutes={0} 
                        value={props.date}
                        mode={mode}
                        is24Hour={false}
                        display="default"
                        onChange={onChange}
                    />
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({

  buttonGroup: {
    margin: 8,
  },
});