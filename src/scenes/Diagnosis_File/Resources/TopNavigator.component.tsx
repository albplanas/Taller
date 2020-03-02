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
  Tooltip,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {  Alert  } from 'react-native';

import {TrashIcon,EditIcon,Camera_Icon,FileSignature_Icon,Clock_Icon} from "../../../assets/icons"
import {AppRoute} from "../../../navigation/app-routes"
import {CloseAllClock,AddGlobalClock} from "../../../globalFunc_Use/clock"

import { batch } from 'react-redux';
import { DrawerActions } from '@react-navigation/native';






const PaperPlaneIcon = (style) => (
  <Icon {...style}  name='paper-plane-outline'/>
);
const AlertIcon = (style) => (
  <Icon {...style} fill={'#ffc107'}  name="alert-triangle-outline"/>
);

const SubmitChanges = (props) => (
  <TopNavigationAction {...props} icon={PaperPlaneIcon}/>
);

const DeleteAction = (props) => (
  <TopNavigationAction {...props} icon={()=><TrashIcon fill="#dc3545"/>}/>
);

const CameraAction = (props) => (
  <TopNavigationAction {...props} icon={()=><Camera_Icon fill="#6f42c1"/>}/>
);
const StatusAction = (props) => (
  <TopNavigationAction {...props} icon={props.icon}/>
);

const TooltipEdit = (props) => {

  const [visible, setVisible] = React.useState(false);

  const toggleTooltip = () => {
    setVisible(!visible);
  };


  return (
    <Tooltip
      visible={visible}
      placement={"top start"}
      icon={AlertIcon}
      text='This action is not available for this report!'
      //style={{height:100}}
      onBackdropPress={toggleTooltip}>
     <Button appearance="ghost" onPress={toggleTooltip} style={{maxWidth:30,height:30}}icon={props.icon}></Button>
   
    </Tooltip>
  );
};

const EditAction = (props) => (
  <TopNavigationAction {...props}  icon={()=><EditIcon fill={props.edit===true?'#28a745':"#495057"} width={props.edit===true?32:null}  height={props.edit===true?32:null} />}/>
);


export const TopNavigationResources = (props) => {

  const onPressCamera=()=>{props.navigation.navigate(AppRoute.CAMERA, {
    from : 'diagnosis',
    idSelect:props.idSelect,
    IdMaintenance:props.IdMaintenance
  })}

  const onPressEdit=()=>{
   props.setEdit(!props.edit)
  }
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
          text: 'Previous Records',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
      },
      {text: 'NEW Record', onPress: () =>{

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
      }},
      ],
      {cancelable: false},
  );
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
    <StatusAction icon ={()=><Clock_Icon fill="#fd7e14" />  }/>,
    <TooltipEdit icon={()=><PaperPlaneIcon fill="#495057"  />}/>,
    <TooltipEdit icon={()=><EditIcon fill="#495057" />}/>,
    <TooltipEdit icon={()=><Camera_Icon fill="#495057"/>}/>,
    <TooltipEdit icon={()=><TrashIcon fill="#495057"/>}/>
  ]:
  [
    <StatusAction icon ={()=><Clock_Icon  onPress={onPressClock}  fill="#fd7e14"/>  }/>,
    <SubmitChanges style={{marginLeft:25}} onPress={()=>Alert.alert("Alert","There is nothing to send ...")}/>,
     <EditAction   style={{marginLeft:25}} onPress={onPressEdit} edit={props.edit}/>,
    <CameraAction  style={{marginLeft:25}} onPress={onPressCamera}/>,
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



