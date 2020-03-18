import React ,{useEffect, useState} from 'react';
import { StyleSheet ,Alert } from 'react-native';
import {
  Layout,
  Text
} from '@ui-kitten/components';
import {TimePicker_Component} from "../../../components/MainComponents/TimePicker.component"
import {TopBar} from "./topbar.component"
import {default as color} from "../../../styles/color.json"





export const Edit_Clock =(props)=>{
    const [arrTime,setArrTime] = useState([ 
                                            {
                                                clock_in:new Date,
                                                clock_out:new Date
                                            }
                                        ])

    const setArr=(index,param,value)=>{
        var newArr=[...arrTime];
        newArr[index][param]=value;
        setArrTime(newArr);
    }

    useEffect(()=>{
        const item=props.route.params.item;
        setArrTime(item.clockRecords.map(x=>{
            return {
                clock_in: new Date(x.clock_in),
                clock_out:x.clock_out===null?null: new Date(x.clock_out)
            } 
        }))

        
    },[props.route.params.item])

 return (
    <Layout style={{flex:1}} >

        <TopBar navigation={props.navigation}/>

        <Text category="h5"  style={{textAlign:"center",color:color.gray_600}}>{props.route.params.item.name+"\n"+props.route.params.item.nameDiagnosis+"\n"}</Text>


            <Layout style={{maxWidth:800,alignSelf:"center"}}>
                <Header/>
                {
                    arrTime.map((elem,index)=>{
                        return <Rows date={elem} setDate={(param,val)=>setArr(index,param,val)}/>
                    })
                }
                        
           </Layout> 

           <Text category="h1" status ="warning" style={{alignSelf:"center",marginTop:50,fontFamily:"Roboto"}}>{"TOTAL : "+TimeTextByMill(arrSum(arrTime.map(elem => elem.clock_out !== null ? (elem.clock_out-elem.clock_in):0)))}</Text>
    </Layout>
  );
}


const Rows =(props)=>{
    

    var text=TimeText(props.date.clock_in,props.date.clock_out)

    return  <Layout style={styles.container}>

                <Layout style={styles.layout} level='4'>
                    <TimePicker_Component status={"info"} date={props.date.clock_in} setDate={(val)=>props.setDate("clock_in",val)}/>
                </Layout>

                <Layout style={styles.layout} level='3'>
                    <TimePicker_Component status={"warning"} date={props.date.clock_out} setDate={(val)=>props.setDate("clock_out",val)}/>
                </Layout>

                <Layout style={[styles.layout,{maxWidth:250}]} >
                    <Text category="h3">{text}</Text>
                </Layout>
            </Layout>
}

const Header =(props)=>{


    return  <Layout style={{flexDirection: 'row',}}>

                <Layout style={[styles.layout,{minWidth:300}]} level='4'>
                <Text category="h3">Clock In</Text>
                </Layout>

                <Layout style={[styles.layout,{minWidth:250}]} level='4'>
                <Text category="h3">Clock Out</Text>
                </Layout>

                <Layout style={[styles.layout,{minWidth:250}]} level='4'>
                    <Text category="h3">Total</Text>
                </Layout>
            </Layout>
}

const styles = StyleSheet.create({
    container: {
       
        flexDirection: 'row',
        borderTopWidth:1,
        borderTopColor:"red"
      },
      layout: {
        justifyContent: 'center',
        alignItems: 'center',
      },
});

function TimeText(c_IN ,c_OUT){
    var Time=c_OUT===null?"opened":c_OUT-c_IN
    var min=c_OUT===null?"--" :Math.trunc((Time/(1000*60))%60);
    var hrs=c_OUT===null?"--" :Math.trunc((Time/(1000*60*60)));
    return  hrs+" hrs : "+min+" min"
}

function TimeTextByMill(Time){

    var min=Math.trunc((Time/(1000*60))%60);
    var hrs=Math.trunc((Time/(1000*60*60)));
    return  hrs+" hrs : "+min+" min"
}
const arrSum = arr => arr.reduce((a,b) => a + b, 0)