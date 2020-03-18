
import React from 'react';

import {
    Drawer,
  } from '@ui-kitten/components';

 
  import {List_Icon,PersonIcon,FolderIcon,Clock_Icon,Briefcase_Icon} from "../../assets/icons"
  import {Header,HeaderNull} from "./header"
  import {Footer} from "./footer"

  import {AppRoute} from "../../navigation/app-routes"

  import {CloseClock,AddClock} from "../../globalFunc_Use/clock"


  
  const drawerData = [
                        {
                          title: 'Change Diagnosis',
                          icon: Briefcase_Icon,
                        }
                        ,{
                          title: 'Change Orders',
                          icon: FolderIcon,
                        },
                        {
                            title: 'Change User',
                            icon: PersonIcon,
                          },{
                            title: 'Get Records',
                            icon: Clock_Icon,
                          },
                          
                      ];


  export const Clock_Component=(props) =>{


  const [item, setItem] = React.useState([]);
  const [state, setState] = React.useState([]);
  const [current, setcurrent] = React.useState([]);

  React.useEffect(() => {
                           setItem(props.FeaturesTruck.filter(e=>e.IDCatEquip===1)[0])
                           setcurrent(props.Clock_List.filter((x,index)=>index+""===props.current_ClockIn+""))

                          }, [JSON.stringify(props.Clock_List)]);

                         const  onPressUser         = () => props.navigation.navigate(AppRoute.SETTING)
                         const  onPressChangeOrder  = () => props.navigation.navigate(AppRoute.TODO);
                         const  onPressChangeDiagn  = () => item===null|| item===undefined?props.navigation.navigate(AppRoute.TODO):props.navigation.navigate(AppRoute.NEW_SERVICE_ORDER,{item:item});
                         const  onPressGetRecords   = () => props.navigation.navigate(AppRoute.RECORD_CLOCK);
                         const  onRouteSelect = (index) => {
                                                                  const route = drawerData[index];

                                                                  //console.log(route.menuIndex)
                                                                  route.menuIndex===1?onPressChangeOrder():
                                                                  route.menuIndex===2?onPressUser():
                                                                  route.menuIndex===0?onPressChangeDiagn():
                                                                  route.menuIndex===3?onPressGetRecords():
                                                                  null;
                                                              };
       const ClockOut_IN_Button=(checked)=>{

              var arr =[]

              if(checked){
                arr=props.Clock_List.map((x,index)=>{
                    return index+""===props.current_ClockIn+""?CloseClock(x):x
                })
            
              }
              else{
                      arr=props.Clock_List.map((x,index)=>{
                        return index+""===props.current_ClockIn+""?AddClock(x):x
                    })
              }
              console.log("active")
              props.UPDATE_Clock_LIST("Clock_List",arr)
       }
     
       var isCheck = current.length>0? current[0].clockRecords[current[0].clockRecords.length-1].clock_out===null
                                                :false

       const    HeaderComponent = ()=> <Header current_ClockIn={current}/>  
       const    FooterComponent = ()=> <Footer ClockOutButton={ClockOut_IN_Button} 
                                                initialCheck={isCheck}
                                                navigation={props.navigation}/>                     
                                    
                                    return props.Clock_List.length>0?(
                                                                              <Drawer
                                                                                  data={drawerData}
                                                                                  header={HeaderComponent}
                                                                                  footer={FooterComponent}
                                                                                  onSelect={onRouteSelect}
                                                                              />
                                                                          ):(
                                                                            <Drawer
                                                                                data={drawerData}
                                                                                header={HeaderNull}
                                                                                onSelect={onRouteSelect}
                                                                            />
                                                                        );
                                }


