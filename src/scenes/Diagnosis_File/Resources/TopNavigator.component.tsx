/**
 * This example demonstrates how simply could be composed List Item
 * with classic layouts like icon at the left, forward button at the right, etc.
 *
 * IMPORTANT: To use Icon component make sure to follow this guide:
 * https://akveo.github.io/react-native-ui-kitten/docs/guides/icon-packages
 */

import React, { useEffect } from 'react';
import {
  Button,
  Icon,
  Text,
  Tooltip,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {  Alert  } from 'react-native';

import {TrashIcon,EditIcon,Camera_Icon,FileSignature_Icon,Clock_Icon,User_Watch_Icon, Alert_Icon,Save_PRO_Icon} from "../../../assets/icons"
import {AppRoute} from "../../../navigation/app-routes"
import {CloseAllClock,AddGlobalClock} from "../../../globalFunc_Use/clock"

import { batch } from 'react-redux';
import { DrawerActions } from '@react-navigation/native';

import {default as color } from "../../../styles/color.json"






const DeleteAction = (props) => (
  <TopNavigationAction {...props} icon={()=><TrashIcon fill="#dc3545"/>}/>
);

const CameraAction = (props) => (
  <TopNavigationAction {...props} icon={()=><Camera_Icon fill="#6f42c1"/>}/>
);
const StatusAction = (props) => (
  <TopNavigationAction {...props} icon={props.icon}/>
);
const RecordAction = (props) => (
  <TopNavigationAction {...props} icon={props.icon}/>
);


const TooltipEdit = (props) => {

  const [visible, setVisible] = React.useState(false);

  const toggleTooltip = () => {
    setVisible(!visible);
  };

const onBackdropPress=()=>{
          toggleTooltip ();
          Alert.alert(
            "User Switch",
            'Do you want to change the user name ?',
            [
              {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              {
                text: '',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'Change User', onPress: () => props.navigation.navigate(AppRoute.SETTING)},
            ],
            {cancelable: false},
          );
}
  return (
    <Tooltip
      visible={visible}
      placement={"top start"}
      icon={Alert_Icon}
      text='This action is not available for this report!'
      //style={{height:100}}
      onBackdropPress={onBackdropPress}>
     <Button appearance="ghost" onPress={toggleTooltip} style={{maxWidth:30,height:30}}icon={props.icon}></Button>
   
    </Tooltip>
  );
};

const EditAction = (props) => (
  <TopNavigationAction {...props}  icon={()=>props.edit===true?
                                             <Button onPress={props.onPressSave}status="success" style={{width:48,height:48}} appearance={"outline"} icon={()=> <Save_PRO_Icon size={40} color={color.green}/>}></Button>:
                                              <EditIcon fill={'#28a745'}   />}/>
);


export const TopNavigationResources = (props) => {

  const onPressRecords=()=>{props.navigation.navigate(AppRoute.RECORD_CLOCK)}
  const onPressEdit=()=>{

    props.setEdit(!props.edit)
  }
  const onSign=()=>props.navigation.navigate(AppRoute.SIGNATURE,{name:"Clock In :"+props.subtitle,callback:()=>{

                                                                                                                  var d=new Date();
                                                                                                                  var date=d.toISOString().slice(0,10);
                                                                                                                  
                                                                                                                  var arr=props.FeaturesList.filter(e=>e.SubId===props.item.feature);
                                                                                                                  var str=arr[0].Title+" / "+arr[0].Description

                                                                                                                  var newArr=CloseAllClock(props.Clock_List);
                                                                                                                  var addClockToArr=AddGlobalClock(newArr,{            
                                                                                                                                                              idmechanic:props.item.idmechanic,
                                                                                                                                                              name:props.item.mechanic,
                                                                                                                                                              date:date,
                                                                                                                                                              idMaintenance:props.item.IdMaintenance,
                                                                                                                                                              cod:props.item.equipmentCod,
                                                                                                                                                              idDiagnosis:props.item.idSelect,
                                                                                                                                                              nameDiagnosis:str
                                                                                                                                                            });
                                                                                                                          batch(() => { props.UPDATE_Clock_LIST("Clock_List",addClockToArr)
                                                                                                                                        props.UPDATE_Clock_LIST("current_ClockIn",addClockToArr.length-1)})
                                                                                                                                      
                                                                                                                                        props.navigation.dispatch(DrawerActions.openDrawer());
                                                                                                                        }})
   
  const onPressClock=()=>{
    Alert.alert(
      'CLOCK ALERT ?',
      'Do you want to start working on this diagnosis, with this action you automatically close all clock-in still open. \n\nPress Clock-In to start',
      [
        {
          text: 'Go Back',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
      },
      {
          text: '',
          onPress: () => null,
          style: 'cancel',
      },
      {text: 'NEW Record', onPress:()=>onSign() },
      ],
      {cancelable: false},
  );
   }
const onPressSave=()=>{
  props.onSaveEdit();
  props.setEdit(!props.edit)
}
  const onPressDelete=()=>{
                                        Alert.alert(
                                            'DELETE REPORT ?',
                                            'My Alert Msg',
                                            [
                                            {
                                                text: 'Cancel',
                                                onPress: () => console.log('Cancel Pressed'),
                                                style: 'cancel',
                                            },
                                            {text: 'OK', onPress: () => props.onDelete()},
                                            ],
                                            {cancelable: false},
                                        );
  }


  const renderRightControls = () => props.editNOavailable===true?
  [
    <TooltipEdit navigation={props.navigation} icon ={()=><Clock_Icon fill="#495057" />  }/>,
    <TooltipEdit navigation={props.navigation} icon={()=><EditIcon fill="#495057" />}/>,
    <TooltipEdit navigation={props.navigation} icon={()=><Camera_Icon fill="#495057"/>}/>,
    <TooltipEdit navigation={props.navigation} icon={()=><TrashIcon fill="#495057"/>}/>
  ]:
  [     props.type==="edit"?
              <StatusAction icon ={()=><Clock_Icon  onPress={onPressClock} style={{marginLeft:25}}  fill="#fd7e14"/>  }/>
              :null,
        props.type==="edit"? <RecordAction icon={()=><User_Watch_Icon/>} onPress={onPressRecords}/>
        :null,
     <EditAction   style={{marginLeft:25}} onPress={onPressEdit} onPressSave={onPressSave} edit={props.edit}/>,
    <CameraAction  style={{marginLeft:25}} onPress={props.onPressCamera}/>,
    <DeleteAction  style={{marginLeft:25}} onPress={onPressDelete}/>
  ];


  return (
    <TopNavigation
      title='Resources'
      subtitle={props.subtitle}
      titleStyle={{fontSize:20}}
      rightControls={renderRightControls()}
      
    />
  );
};



