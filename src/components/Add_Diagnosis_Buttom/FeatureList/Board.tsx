import React ,{useEffect, useState, Fragment} from 'react';
import {
  Layout
} from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

import {TopNavigationCase} from "./TopNavigator_Board"
import {Listing} from "./Listing"

//import whyDidYouRender from "@welldone-software/why-did-you-render";
import {Display} from "./Alternatives"





  //whyDidYouRender(React);

  export class Features_Board extends React.PureComponent {
   // static whyDidYouRender = true
    render(){
      return (
        <Features_Board_Sample{...this.props}/>
      )
    }
  }



export const Features_Board_Sample =(props)=>{

            const [select,setSelect]=useState(null)
            const [data,setData]=useState([])

            const changeCheckBox=(index)=>{
            
                                              var newData=[...data];
                                              newData[index].check=!data[index].check;
                                              setSelect(index)
                                              setData(newData)
                                            }

            const setText=(cat,value,index)=>{
                                                var newData=[...data];
                                                newData[index][cat]=value;
                                                setData(newData)
                                              }
            const updateBeforeLeft=()=>{
               const newItems=data.filter(elem=>elem.check===true  && elem.activity==="enable"
                                                    && elem.description.length>0 
                                                    && elem.explanation.length>0)
              props.route.params.updateFunction(newItems)
        
            }
                                              

            useEffect(() => {
                   
                      setData(props.route.params.featuresArr)
                    }, []);



      return <Fragment >

                    <TopNavigationCase  navigation={props.navigation} 
                                        subtitle={props.route.params.subtitle} 
                                        updateBeforeLeft={updateBeforeLeft}
                                        />
                    <Layout style={styles.container}>

                          <Layout style={[styles.layout,{marginRight:5}]}>
                                  <Listing  data={data} 
                                            select={select} 
                                            changeCheckBox={changeCheckBox}
                                            setSelect={setSelect}/>
                          </Layout>

                          <Layout  style={[styles.layout,{marginLeft:5}]}>
                                 <Display item={select!==null?data.length>0?data[select]:null:null}
                                          setText={setText}
                                          select={select}/>
                          </Layout>
                          </Layout>

                              
                            
                </Fragment>
             
            }




 const styles = StyleSheet.create({
        container: {
          flex: 1,
          flexDirection: 'row',
          marginTop:1
          },
        layout: {
          justifyContent: 'center',
          alignItems: 'center'
        },

});






