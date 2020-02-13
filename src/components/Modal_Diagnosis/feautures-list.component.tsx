import React from 'react';
import {
  CheckBox,
  Layout,
  ListItem
} from '@ui-kitten/components';





  
  const ListItemModal = (props) => {
  
    const [checked, setChecked] = React.useState(props.Checked);
  
    const onCheckBoxCheckedChange = (index) => {

      var arr=props.checkedList.filter(x=>x+""!==props.id+"");
      
      checked?props.setCheckedList(arr):props.setCheckedList(arr.concat(props.id))
      setChecked(!checked);
    };
  
    const renderAccessory = (style, index) => (
      <CheckBox
        style={style}
        checked={checked}
        onChange={onCheckBoxCheckedChange}
      />
    );
  
    return (
  
       <ListItem
        title={props.name}
        style={{padding:20}}
        titleStyle={{fontSize:20}}
        accessory={renderAccessory}
      />
    );
  };
  
  
export  const Full_List=(props)=>{

  var listOfFeatures=props.elem.Subarr.sort((a,b)=> a.Description > b.Description?1:b.Description > a.Description ?-1:0)
                    .map(el=>{
                                return <ListItemModal name={el.Description} 
                                                      id={el.SubId} 
                                                      checkedList={props.checkedList} 
                                                      setCheckedList={props.setCheckedList} 
                                                      Checked={props.checkedList.filter(x=>x===el.SubId).length>0?true:false}/>
                              })
    return(
      <Layout style={{justifyContent: 'center',}}>
  
      {listOfFeatures}
  
  
      </Layout>
    )
  } 



  
  
  

  
  