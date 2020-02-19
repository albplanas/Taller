import React  from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Text,
  Button,
  Icon,
  List,
  ListItem,
  Divider,
  CheckBox
} from '@ui-kitten/components';

import {FilterIcon,CarBaterryIcon,TireIcon,OthersIcon,ChartPieIcon,CodeBranch_Icon} from "../../assets/icons" 




export const ListUsed = (props) => {
    const [checked, setChecked] = React.useState([false,false,false,false,true]);
    var newData=checked[4]===true?props.data:props.data.filter(x=>{
        return (x.Category==="FILTER" && checked[0]===true)?true:
                (x.Category==="Battery" && checked[1]===true)?true:
                (x.Category==="Tires" && checked[2]===true)?true:
                (x.Category!=="FILTER" && x.Category!=="Battery" && x.Category!=="Tires" && checked[3]===true)?true:
                false
    })
  return (<Layout style={styles.container}>

    <Layout style={styles.layoutOne} level='2'>
      <Text style={{textAlign:"center",margin:10}} category="label" >LEGEND</Text>
      <ListLegend setCheckedListUsed={setChecked}/>
      <Button icon={()=><CodeBranch_Icon color={"#4b0082"}/>}status="info" style={{marginVertical:8,marginLeft:10,marginBottom:150}} size="large" onPress={()=>{props.setSelectedIndex(1)}}>Pieces Tree</Button>
    </Layout>

    <Layout style={styles.layoutTwo} level='2'>
      <Text category="h3" style={{textAlign:"center"}}>ITEMS USED BEFORE</Text>
      <ListItems data={newData}   />
    </Layout>



  </Layout>
  )};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  layoutOne: {
    width:300,
    
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  layoutTwo: {
    flex: 1,
    justifyContent: 'center',
  },
});





const iconsArr=[FilterIcon,CarBaterryIcon,TireIcon,OthersIcon,ChartPieIcon]

const data = [{
                    title: 'Filters'
                    },{
                        title: 'Baterry'
                    },
                    {
                        title: 'Tires'
                    },
                    {
                        title: 'Others'
                    },
                    {
                        title: 'All of them'
                    }
];

const ListLegend = (props) => {


  const renderItem = ({ item, index }) => 
    <ListItem
      title={item.title}
      icon={iconsArr[index]}
      accessory={renderAccessory}
    />
  
  const [checked, setChecked] = React.useState([false,false,false,false,true]);

  const onCheckBoxCheckedChange = (index,arr) => {
      
      var newArr=arr;
      if(index<4){
        newArr[index]=!newArr[index];
        if(newArr.slice(0,4).filter(x=>x===true).length===4 || newArr.slice(0,4).filter(x=>x===true).length===0){
            newArr=[false,false,false,false,true]
        }
        else{
            newArr[4]=false
        }
      }
     else{
         newArr=[false,false,false,false,true]
     }
    
      setChecked(newArr);
      props.setCheckedListUsed(newArr)
  };

  const renderAccessory = (style, index) => (
    <CheckBox
      style={style}
      checked={checked[index]}
      onChange={() => onCheckBoxCheckedChange(index,checked.map(x=>x))}
    />
  );

  return (
    <List
      data={data}
      renderItem={renderItem}
      style={{margin:10}}
    />
  );
};

const ListItems = (props) => {
    const renderItem = ({ item, index }) => (
        <ListItem
          title={item.cod}
          description={item.descrip}
          icon={item.Category==="FILTER"?iconsArr[0]:item.Category==="Tires"?iconsArr[2]:item.Category==="Battery"?iconsArr[2]:iconsArr[3]}
        />
      );

      return (
        <List
          data={props.data.reverse() }
          renderItem={renderItem}
          style={{margin:10,marginHorizontal:20}}
        />
      );
}