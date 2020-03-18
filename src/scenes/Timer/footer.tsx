
import React,{useEffect} from 'react';

import {
    DrawerHeaderFooter
  } from '@ui-kitten/components';

  import { Toggle } from '@ui-kitten/components';
  import {StopWatch_Icon} from "../../assets/icons"
import {AppRoute} from "../../navigation/app-routes"
import {Alert_Decicion} from "../../globalFunc_Use/messenger"
  

  export const Footer = (props) => {

                const [checked, setChecked] = React.useState(false);
            
                const onCheckedChange = (isChecked) => {
                setChecked(isChecked);
                };

                useEffect(()=>{
                  onCheckedChange(props.initialCheck)
                },[props.initialCheck])


                const accessoryToggle=()=><Clock__IN_OUT checked={checked} onCheckedChange={onPress}/>
                const accessoryIcon=()=><StopWatch_Icon color={!checked?"#dc3545":"#28a745"}/>
                
                
                const onPress=()=>{
                  props.navigation.navigate(AppRoute.SIGNATURE,{
                    name:!checked?"Clock In":"Clock Out",
                    callback:()=>{
                      Alert_Decicion("Signature accepted","",()=>null,()=>{
                        props.ClockOutButton(checked);
                        onCheckedChange(!checked)
                      })}});


                }
                return     <DrawerHeaderFooter
                                            title={checked?"YOU'RE CLOCK IN":"YOU'RE CLOCK OUT"}
                                            titleStyle={{fontSize:16,color:!checked?"#dc3545":"#28a745"}}
                                            icon={accessoryIcon}
                                            accessory={accessoryToggle}
                                            onPress={onPress}
                            />
  }
  const Clock__IN_OUT = (props) => {
  

  
    return (
                  <Toggle
                                
                                checked={props.checked}
                                onChange={props.onCheckedChange}
                                status={!props.checked?"danger":"success"}
                                
                                style={{padding:20,alignSelf:"center"}}
                            />


    );
  };

  


   




