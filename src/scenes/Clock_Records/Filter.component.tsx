import React ,{useEffect} from 'react';
import { StyleSheet ,Alert } from 'react-native';
import {
  Layout, Divider, ListItem,Icon,Button
} from '@ui-kitten/components';
import {DatepickerCase} from "../../components/MainComponents/Calender.component"
import {AutocompleteCase} from "../../components/MainComponents/AutoComplete.component"
import {SelectCase} from "../../components/MainComponents/Select.compoenet"



export const Filter =(props)=>{

//Calendar
  const [date, setDate] = React.useState(new Date());

//Selector  
  const [selectedOption, setSelectedOption] = React.useState([]);
  const [initialEmployee,setInitialEmployee]=React.useState([]);

  useEffect(()=>{
    const datum=props.MechanicList.map(e=>{return {
                                                      id:e.IdEmployee,
                                                      text:e.short_name
                                                    }})
    setInitialEmployee(datum);
  },[props.MechanicList])

//AutoComplate
const [value, setValue] = React.useState(null);
const [data, setData] = React.useState([]);
const [initialData,setInitialData]=React.useState([])

useEffect(()=>{
  const datum=props.FeaturesTruck.map(e=>{return {
                                                    id:e.IDCatEquip,
                                                    title:e.cod
                                                  }})
  setData(datum);
  setInitialData(datum)
},[props.FeaturesTruck])


//Functions
const onSelect = ({ title }) => {
  setValue(title);
};

const onChangeText = (query) => {
  setValue(query);
  setData(initialData.filter(item => item.title.toLowerCase().includes(query.toLowerCase())));
};
const clearInput = () => {
  setValue('');
  setData(initialData);
};


// Components
var onPressApply=()=>props.ApplyFilter({
      employee:selectedOption,
      date:date.toISOString().slice(0,10),
      truck:value
})
  const accessoryButton = () => (
    <Button onPress={onPressApply}>Apply Filter</Button>
  );


 return (
    <Layout style={[styles.container,{width:400}]}  >
  
        <ListItem title={"Search"}
                  titleStyle={{fontSize:24}} 
                  accessory={accessoryButton}
                  />
        <Divider/>
        <SelectCase
                          data={initialEmployee}
                          selectedOption={selectedOption}
                          setSelectedOption={setSelectedOption}
                          />
        <Divider/>
        <AutocompleteCase value={value} 
                          data={data}
                          onSelect={onSelect}
                          onChangeText={onChangeText}
                          clearInput={clearInput}
                          />          
         <Divider/>          
        <DatepickerCase date={date} 
                        setDate={setDate} 
                        />

        
       
 
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    maxHeight: 100,
  },
  containerLayout: {
    flex: 1,
    flexDirection: 'row',
  },
  layout: {
    flex: 1,
    
    justifyContent: 'center',
    alignItems: 'center',
  },
});








