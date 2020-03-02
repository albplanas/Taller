import React from 'react';
import { StyleSheet} from 'react-native';
import {
  Divider,
  Layout,
  Text,
} from '@ui-kitten/components';

import {AppRoute} from "../../navigation/app-routes"

import {  PlusIcon,Tachometer__Icon,UserStetoscope_Icon,INFO__Icon,Alert__Icon, FolderPlus_Icon,Contract__Icon,
          Folder_Icon,ClipboardCheck__Icon,ToolsIcon,CalendarDate_Icon,File_InvoiceIcon,CalendarAlt_Icon ,Percent_Icon} from '../../assets/icons';


//import {deleteLabor,storageDiagnosis} from "../Mechanics/auxiliarFunc"
import {CardLayout} from '../../components/CardLayout/CardLayout';
import {CardLayout as ExtraInfo} from '../../components/Extrainfo/CardLayout';
import {CardLayout as CarProfileRecent} from '../../components/RecentProfile/CardLayout';
import {storeData} from "../../globalFunc_Use/globalJSFunctions"


import {SelectSMS} from "../../globalFunc_Use/helperFunctions"









export const ReviewChanges =(props)=>{

  const [ExtraArrayChanges, setExtraArrayChanges] = React.useState([]);


  React.useEffect(() => {
    setExtraArrayChanges(props.ExtraArrayOriginal)
}, [props.ExtraArrayOriginal]);

     var byEquipment=props.DiagnosisArray.filter(e=>e.IDCatEquip===props.route.params.item.IDCatEquip).map(x=>x.feature)
     var byFeatures=[...new Set(byEquipment)]
  //Diagnosis Aarguments
      var newArr = byFeatures.map(x=>{

            var proper =props.FeaturesList.filter(e=>e.SubId===x)[0];
            var elem=props.DiagnosisArray.filter(e=>e.feature===x)
            return {
              ... elem[0],
              Title:proper.Title,
              SubTitle:proper.Description
            }
            
      });
    
      var numOfChangesd=props.DiagnosisArray.length;
     // console.log("numOfChangesd",numOfChangesd)

      const DeleteDiagnosis=(val)=>{
        props.setDiagnosisArray(val);
        storeData("diagnosis_List",JSON.stringify(val))
      }
      const iconHeadDiagnosis=()=><UserStetoscope_Icon color={"#17a2b8"}/>
      const iconHeadSetDiagnosis=()=>[Folder_Icon,Contract__Icon,ClipboardCheck__Icon,PlusIcon]
    
      const actionHeaderLeft=()=>{  props.navigation!==undefined?
                                    props.navigation.navigate(AppRoute.MODAL,
                                                              {
                                                                    item:props.route.params.item,
                                                                    DiagnosisArrayOriginal:[1],
                                                                    idmechanic:props.idmechanic,
                                                                    originalRoute:"diagnosis"
                                                              
                                                              }):null}
      

    /******** *INFOOO* *************/


    
    const iconInfoAlert=()=><Alert__Icon color={"#ffc107"}/>
//console.log(props.ExtraArrayOriginal,ExtraArrayChanges)
    var numOfChangesI=ExtraArrayChanges.filter((elem,index)=>elem!==props.ExtraArrayOriginal[index]).length;
    
    /******** *Profile* *************/
    const iconHeadExtra=()=><INFO__Icon color={"#17a2b8"}/>   

    const actionHeaderLeft_Profile = ()=>{  props.navigation!==undefined?
                                            props.navigation.navigate(AppRoute.PROFILE,
                                                                      {
                                                                            item:props.route.params.item,
                                                                      
                                                                      }):null}



    return(
          <Layout style={[styles.tabContainer,{marginBottom:150}]}>
                      <Layout style={[{margin:20}]}>

                         <Text category="h3" style={{textAlign:"center", marginBottom:5}} status="warning">Please Review your changes carefully  👀 👀 👀</Text>
                         <Divider style={{ marginBottom:5}}/>
                                      <Layout style={[styles.rowContainer]}>


                                              <CardLayout   data={newArr}
                                                            navigation={props.navigation}
                                                            delete={DeleteDiagnosis}
                                                            idmechanic={props.idmechanic}        
                                                            iconHead={iconHeadDiagnosis} 
                                                            width={400}
                                                            title="DIAGNOSES"
                                                            description={numOfChangesd>0?numOfChangesd+" Changes":"No changes made"}
                                                            iconSet={iconHeadSetDiagnosis}
                                                            actionHeaderLeft={actionHeaderLeft}
                                                            />
                                              <CarProfileRecent    data={ProfileModel(props.route.params.item)}       
                                                                                                    iconHead={iconHeadExtra} 
                                                                                                    width={400}
                                                                                                    title="Recent Information"
                                                                                                     actionHeaderLeft={actionHeaderLeft_Profile}
                                                                                                    />
                                              <ExtraInfo    data={ExtraInfoModel(ExtraArrayChanges,setExtraArrayChanges)}       
                                                            iconHead={iconInfoAlert} 
                                                            width={400}
                                                            title="Alert"
                                                            description={numOfChangesI>0?numOfChangesI+" Changes":"No changes made"}
                                                            actionHeaderLeft={actionHeaderLeft}
                                                            />

                                      </Layout>
                      </Layout>
                  </Layout>      
          )
          }


          const ProfileModel =(item)=>[{
                                          title:"Maintenance Progress",
                                          description:SelectSMS(item),
                                          icon:ToolsIcon,
                                          type:"progressbar"
                                        },{
                                          title:"Maintenance Rate",
                                          description:item.mtto_mill,
                                          icon:Percent_Icon,
                                          type:"list"
                                        },
                                        {
                                          title:"Last Maintenance Date",
                                          description:item.MttoDate===null?"":item.MttoDate.date.slice(0,10),
                                          icon:CalendarDate_Icon,
                                          type:"list"
                                        },{
                                            title:"Last Maintenance Explanation",
                                            description:item.MttoExpla,
                                            icon:File_InvoiceIcon,
                                            type:"list"
                                          },
                                        {
                                          type:"divider"
                                        },{
                                              title:"Last Report Date",
                                              description:item.LastReportDate===null?"":item.LastReportDate.date.slice(0,10),
                                              icon:CalendarAlt_Icon,
                                              type:"list"
                                            },{
                                          title:"Last Report Explanation",
                                          description:item.LastReportExpla,
                                          icon:File_InvoiceIcon,
                                          type:"list"
                                        },
                                      ]
          
          
          const ExtraInfoModel=(arr,funct)=>[{
                                              type:"checkbox",
                                              setThisValue:(val)=>{console.log("This is the val",val)},
                                              initialValue:arr[0],
                                              label:"Maintenance ?",
                                              textStyle:{fontSize:20}
                                          },{
                                            type:"checkbox",
                                            setThisValue:(val)=>{console.log("This is the val",val)},
                                            initialValue:arr[1],
                                            label:"Odometer broken ?",
                                            textStyle:{fontSize:20}
                                          },{
                                            type:"inputtext",
                                            setThisValue:(val)=>{console.log("This is the val",val)},
                                            initialValue:arr[2],
                                            label:"Miles",
                                            caption:"If the odometer is not broken you must place the millage of this equipment before you open the Service Order",
                                            placeholder:"Place the millage",
                                            textStyle:{fontSize:12} ,
                                            icon:Tachometer__Icon
                                          }
                                        ]



const styles = StyleSheet.create({

    container: {
      flex: 1,
    },

    layout: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: 'center',
    },

    card: {
      marginVertical: 8,
    },

    rowContainer: {
      flexDirection: 'row',
    },
    tabContainer: {
      minHeight: 600,
    },
  });