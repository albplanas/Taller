import React, { useEffect } from 'react';
import {
  Text,
  Layout,
  Spinner,
  Avatar
} from '@ui-kitten/components';
import {StyleSheet ,Image} from "react-native";
import { ProgressBar } from '../progress-bar.component';
import {GetSpecificPictures} from "../../SQL/equipment.sql"
import Logo from "../../assets/notavailable.png";
import {SelectSMS} from "../../globalFunc_Use/messenger"


export const CardCustomHeaderShowcase=(props)=>{

                const [img, setImg] = React.useState("");
                const [spinner, setSpinner] = React.useState(false);
                const [result,setResult]=React.useState(null);
            
                useEffect(() => {
                
               
                var id =props.elem===undefined?null:props.elem.cod;
                var callback=(val)=>{
                                        setImg(val);
                                        setSpinner(false);
                                        }
            
                var execute=()=>{  setSpinner(true);
                                        
                        setResult(SelectSMS(props.elem))
                        GetSpecificPictures(id,callback);
                }
                id===null?null:execute()
                
            
            
            }, [props.cod]);
 
            
            return <Layout style={{marginLeft:30}} >
                            <CustomHeader spinner={spinner} img={img}/>
                                <Text category='s1'> Maintenance</Text>
                                    {
                                        result===null?<Layout/>:
                                        result.error===null?
                                       <Layout> 
                                           <ProgressBar  style={styles.itemProgressBar} progress={result.percentage} text={`${result.percentage}%`} />
                                        </Layout>:
                                        <Text appearance='hint' category='h6'  status='danger'> {result.error} </Text>
                                        }
            
                            
                    </Layout>
            
            
            }
  
  const CustomHeader = (props) => {
  
      return props.spinner? <Layout style={styles.layout} >
                                <Spinner size='giant' status='success'/>
                                <Text category="h5">Loading ...</Text>
                            </Layout>:
             (props.img.length===0||!props.img)?
             
              <Image style={styles.headerImage} source={Logo }/>:
              <Avatar size='giant' style={styles.headerImage} source={{ uri: props.img }}  />               
  
  
  }
  

  const styles = StyleSheet.create({



      headerImage: {
        height: 350,
        width:400,
        margin:10,
        alignSelf:"center"
      },

      layout: {
        flex: 1,
        paddingBottom:25,
        paddingTop:25,
        justifyContent: 'center',
        alignItems: 'center',
      },
      itemProgressBar: {
        marginVertical: 12,
        alignItems: 'center',
        width:500,
      },
    
  });
  
  
  
  