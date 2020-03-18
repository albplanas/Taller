import React from 'react';
import {
  Button,
  Icon,
  Text,
  List,
  ListItem,
  Divider,
  CheckBox,
  Layout
} from '@ui-kitten/components';
import {AppRoute} from "../../navigation/app-routes"
import {FileSignature_Icon,EditIcon} from "../../assets/icons";
import { StyleSheet,Alert} from 'react-native';
import { DrawerActions } from '@react-navigation/native';

import { batch } from 'react-redux';
import {OpenClockInClock,CloseClockInClock} from "../../globalFunc_Use/clock"
import {Alert_Decicion} from "../../globalFunc_Use/messenger"



var StateManager=(arr,ind,updFunc)=>{

    batch(() => {   
                    updFunc("Clock_List",arr)
                    updFunc("current_ClockIn",ind)
                })
}

export const ListingCase = (props) => {


    const [checked, setChecked] = React.useState(props.Clock_Arr.map(e=>false));
    
    const onCheckBoxCheckedChange = (index) =>  {

       var newArr=[...checked] ;
       newArr[index]=!checked[index];
       setChecked(newArr);

    }

    const isStillOpenCheckBox=()=>{
        Alert.alert(
            'Alert ',
            'The clock for this check box is still opened',
            [
              {text: 'Go Back', onPress: () => console.log('Ask me later pressed')},
              {
                text: '',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'Clock Out', onPress: () =>     props.navigation.dispatch(DrawerActions.openDrawer())},
            ],
            {cancelable: false},
          );   
    }

    const renderAccessory = (style, index,isStillOpen) => {
        return <CheckBox
                        style={style}
                        checked={checked[index]}
                        onChange={() => isStillOpen?isStillOpenCheckBox():onCheckBoxCheckedChange(index)}
                    />
    }


    const  onPressSignature  = () =>      checked.filter(x=>x===true).length  === 0 ?

                                          Alert_Decicion("No Register Selected","You must select at lease one register",()=>null,()=>null)

                                          : props.navigation.navigate(
                                                                      AppRoute.SIGNATURE,
                                                                      { name:"Signature Agreement",
                                                                        callback:()=>{Alert_Decicion("Signature accepted","",()=>null,()=>null)}
                                                                      });


  const renderSign = (style) => (
    <Button status="success" appearance="outline" icon={FileSignature_Icon} onPress={onPressSignature}>Signature</Button>
  );

  const renderItem = ({ item, index }) => {
                
                var isStillOpen=item.clockRecords.filter(e=>e.clock_out===null).length>0;

                const  onPressDetails    = ()=>{
                  props.navigation.navigate(AppRoute.SIGNATURE,
                                                                {
                                                                  name:isStillOpen?"Clock Out":"Clock In",
                                                                  callback:()=>{Alert_Decicion("Signature accepted","",()=>null,()=>
                                                                                                                                                        isStillOpen? CloseClockInClock(props.Clock_List,(arr)=>props.UPDATE_Clock_LIST("Clock_List",arr))
                                                                                                                                                        :  OpenClockInClock(props.Clock_List,item,(arr,ind)=>StateManager(arr,ind,props.UPDATE_Clock_LIST)))}});
                    
                }
                const  onPressEdit    = ()=>{
                  props.navigation.navigate(AppRoute.EDIT_CLOCK,{item:item})
                    
                }

                const renderDetails = (style) => (
                  <Layout style={{flex:1,maxWidth:250,flexDirection:"row",justifyContent:"center"}}>
                    <Button status={"success"} onPress={onPressEdit} style={{marginRight:10}} icon={EditIcon}>EDIT</Button>
                    <Button status={isStillOpen?"danger":"warning"} onPress={onPressDetails}>{isStillOpen?"Clock Out":"Clock In"}</Button>
                    </Layout>
                );
               
               
                return (
                                <ListItem
                                            key={"record_"+index}
                                            title={item.name + " / "+item.date+ " / "+ item.nameDiagnosis}
                                            titleStyle={{fontSize:20,paddingBottom:10}}
                                            style={[isStillOpen ? styles.listOpen:null,{marginTop:2}]}
                                            description={descriptionText(item)}
                                            descriptionStyle={{fontSize:16}}
                                            icon={(style, index)=>renderAccessory(style, index,isStillOpen)}
                                            accessory={renderDetails}
                                        
                                            />
                            ); 
  }

  return (
      <>
            <ListItem   title={"Records"}
                        titleStyle={{fontSize:32,padding:20}}
                        style={{marginHorizontal:45,}}
                        accessory={renderSign}
                        />
            <Divider/>
            <List
                data={props.Clock_Arr}
                renderItem={renderItem}
                style={{width:780}}
                />
    </>
  );
};


function descriptionText(item){
    var total=0;
    return [
                "--------------------------------------------------------------------"]
                            .concat(item.clockRecords.map(e=>{

                                            var clockInDate=new Date(e.clock_in);
                                            var clockInHours=clockInDate.toString().slice(16,21)

                                            var clockOutDate=e.clock_out===null?"opened":new Date(e.clock_out);
                                            var clockoutHours=e.clock_out===null?clockOutDate:clockOutDate.toString().slice(16,21);

                                            var Time=e.clock_out===null?"opened":e.clock_out-e.clock_in
                                            var min=e.clock_out===null?"--" :Math.trunc((Time/(1000*60))%60);
                                            var hrs=e.clock_out===null?"--" :Math.trunc((Time/(1000*60*60)));
                                            total+=Math.trunc(e.clock_out===null?0:Time/(1000*60));
                                           // console.log(total,Math.trunc((total/60)))
                                            return clockInHours+"\t\t"+clockoutHours+"\t\t"+hrs+" hrs : "+min+" min"
                                            
                            })).concat("--------------------------------------------------------------------",
                                        "TOTAL : "+"\t\t\t\t\t"+Math.trunc((total/60))+" hrs : "+Math.trunc(total%60)+" min")
                .join("\n")
}

const styles = StyleSheet.create({
    listOpen:{borderColor:"#ffc107",borderWidth:1}
  });