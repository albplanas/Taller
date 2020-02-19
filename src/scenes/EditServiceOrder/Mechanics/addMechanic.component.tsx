import React from 'react';
import { StyleSheet, Alert } from 'react-native';
import {
  Layout,
  Select,
  Text,
  Input,
  Button,
  Spinner
} from '@ui-kitten/components';
import {PlusIcon, SendIcon} from "../../../assets/icons"
import {rowComponent} from"./row.component"
import {storageLabor,makeNotes} from "./auxiliarFunc"















 export  const AddAccessory =(props) => {


  const [diagnosis, setdiagnosis] = React.useState([]);
  const [activity, setactivity] = React.useState([]);
  const [hrs, sethrs] = React.useState(null);
  const [pieces, setpieces] = React.useState([]);
  const [Validation, setValidation] = React.useState([null,null,null,null]);
  const [reset,setReset] = React.useState(false);
  

  const Clean =()=>{
    setdiagnosis([]);
    setactivity([]);
    sethrs(null);
    setpieces([]);
    setValidation([null,null,null,null])
    setReset(true);
    setTimeout(()=>setReset(false), 1000);
}
  

  const ValidationList=()=>{
    var arr=[diagnosis.length>0,activity.length>0,hrs!==null,pieces.length>0];
    setValidation(arr);
    return arr.filter(x=>x===false).length===0
  }

  const Send=()=>{
              var d=new Date();
              var nd=d.toISOString().split('T')[0];
            
              var obj={
                        idMaintenanceLabor:null,
                        localId:parseFloat(Math.random()*1000000+"").toFixed(0),
                        name: props.userName,
                        date: nd,
                        diagnosis:diagnosis,
                        activity:activity,
                        hrs:hrs===null?"":hrs.text,
                        notes:makeNotes(diagnosis,activity,pieces),
                        pieces:pieces,
                        idMechanics:props.MechanicList.filter(e=>e.short_name===props.userName).length===0?null:props.MechanicList.filter(e=>e.short_name===props.userName)[0].IdEmployee,
                        IdMaintenance:props.route.params.item.IdMaintenance
            }  
          storageLabor(obj,props.SO_MechanicLabor_OffLine,props.onUpdate_EDIT_SO,Clean)
         Clean();
  }

 
      return reset ? (<Layout style={{flex:1,justifyContent:"center"}}><Spinner status='info' size="giant"/></Layout>)
              :rowComponent(
                            <SelectElement
                                            data={props.diagList}
                                            setMechanicFeatures={setdiagnosis}
                                            multiSelect={true}
                                            placeholder={"diagnosis"}
                                            reset={reset}
                                            setReset={setReset}
                                            valid={Validation[0]}
                                            style={{minWidth:220}}
                                            />,
                            <SelectElement
                                            data={dataAct}
                                            multiSelect={true}
                                            setMechanicFeatures={setactivity}
                                            placeholder={"activity"}
                                            resect={reset}
                                            setReset={setReset}
                                            valid={Validation[1]}
                                            style={styles.containerSelect}/>,
                            <SelectElement
                                            data={dataHours}
                                            multiSelect={false}
                                            setMechanicFeatures={sethrs}
                                            placeholder={"hours"}
                                            resect={reset}
                                            setReset={setReset}
                                            valid={Validation[2]}
                                            style={styles.containerSelectHr}/>,
                            <SelectElement
                                            data={props.piecesArr}
                                            multiSelect={true}
                                            setMechanicFeatures={setpieces}
                                            placeholder={"pieces"}
                                            resect={reset}
                                            setReset={setReset}
                                            valid={Validation[3]}
                                            style={styles.containerSelect}/>,

                            <Button  icon={PlusIcon}  status={"primary"} onPress={()=>{
                                    ValidationList() ? 
                                    Send():
                                    alert("Complete all information in the row and then try again 😁😁😁")
                                  }
                            }></Button>
                        )
 }

  const dataAct = [
    { text: 'Labor' },
    { text: 'Engrase' },
    { text: 'Repair' },
    { text: 'Replace' },
    { text: 'Electricity' },
  ];
  const dataHours = [
    { text: '0.5' },{ text: '1' },{ text: '1.5' },{ text: '2' },
    { text: '2.5' },{ text: '3' },{ text: '3.5' },{ text: '4' },
    { text: '4.5' },{ text: '5' },{ text: '5.5' },{ text: '6' },
    { text: '6.5' },{ text: '7' },{ text: '7.5' },{ text: '8' },
    { text: '8.5' },{ text: '9' },{ text: '9.5' },{ text: '10' },
    { text: '10.5' },{ text: '11' },{ text: '11.5' },{ text: '12' },
  ];




  const SelectElement= (props) => {
  
    const [selectedOption, setSelectedOption] = React.useState(props.multiSelect?[]:null);

    return (
            <Layout style={props.style}>
              <Select
                status={props.valid===false?"danger":
                        props.valid===true?"success":"basic"}
                data={props.data}
                multiSelect={props.multiSelect}
                selectedOption={selectedOption}
                placeholder={props.placeholder}
                onSelect={(x)=>{
                                  props.setMechanicFeatures(x);
                                  setSelectedOption;
                              }}
              />
            {props.valid===false? (<Text category="s2" status="danger">Select all that apply!!!</Text>):null}

            </Layout>
    );
  };

  



  const styles = StyleSheet.create({
    containerSelect: {
      minWidth:160
    },
    containerSelectHr:{
        minWidth:110 
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        minWidth:600
      },
      layout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
     
  });
  


