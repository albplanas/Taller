
import React,{Component} from 'react';

import {
    DrawerHeaderFooter
  } from '@ui-kitten/components';

 
  import {UserWatch_Icon} from "../../assets/icons"







  

const model={
              idmechanic:"",
              name:"No Select",
              date:"--/--/----",
              idMaintenance:"",
              cod:"",
              idDiagnosis:"",
              nameDiagnosis:"",
              clockRecords:[{
                  clock_in :0,
                  clock_out:null,
              }]
}

 export const Header = (props) => {


  const [itemClock, setitemClock] = React.useState(model);
  const [time_in_mill,setTimeMills]=React.useState(0);

  React.useEffect(() => {
                            const newItem=props.current_ClockIn.length>0?props.current_ClockIn[0]:model;

                            setitemClock(newItem);

                            var diff=CalcTime(newItem.clockRecords);
                            
                            setTimeMills(diff)
                            if(diff!==null){
                              let interval;
                              let count=0
                                interval = setInterval(
                                  () => {
                                    count+=1
                                    setTimeMills(diff+count*1000)
                                  },
                                  1000
                                );
                              
                              return () => clearInterval(interval);
                              }
                            
                            }, [props.current_ClockIn]);
                  
                           
  return  <DrawerHeaderFooter
                                
                                title={timeToString(time_in_mill)}
                                titleStyle={{color:time_in_mill===null?"#dc3545":"#28a745",fontSize:32,paddingTop:15}}
                                description={itemClock.name+" / "+itemClock.date+"\n"+"Equipment : "+itemClock.cod+"\n"+itemClock.nameDiagnosis}
                                icon={UserWatch_Icon}
                                style={{paddingBottom:30}}
                              />



 }
 function timeToString(duration) {
              if(typeof(duration)!=="number"){
                  return "--:--:--"
              }
              else{
                var milliseconds = parseInt((duration % 1000) / 100),
                seconds = Math.floor((duration / 1000) % 60),
                minutes = Math.floor((duration / (1000 * 60)) % 60),
                hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

              hours = (hours < 10) ? "0" + hours : hours;
              minutes = (minutes < 10) ? "0" + minutes : minutes;
              seconds = (seconds < 10) ? "0" + seconds : seconds;

              return hours + ":" + minutes + ":" + seconds
              }

}



const timeFunc=(tim_in_mils)=>{
  var date_in_mils=Date.now();
  return date_in_mils-tim_in_mils
}
 const CalcTime = ( arr)=>{
   //console.log(arr)
  return Array.isArray(arr)===true?
                              arr.length!==0?
                              arr[arr.length-1].clock_out===null?
                                              timeFunc(arr[arr.length-1].clock_in)
                                              :null
                                              :null
                                              :null
 }