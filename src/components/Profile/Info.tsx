
import React, { useEffect } from 'react';
import {
  ListItem,
  Layout,
  Icon
} from '@ui-kitten/components';





const AlertIcon = (style) => (
    <Icon {...style} name='info-outline'/>
  );



export  const Info = (props) => {


        const [data, setData] = React.useState([]);
        
        useEffect(() => {
  
            const newData=props.elem===undefined?[]:[{  
                                        title:"Brand",
                                        description:props.elem.Brand+' / '+props.elem.year,
                                        icon:""
                                    },
                                    {  
                                    title:"Description",
                                    description:props.elem.descrip,
                                    icon:""
                                },
                                {  
                                        title:"Mtto / Mill",
                                        description:props.elem.mtto_mill,
                                        icon:""
                                    },
                                    {  
                                    title:"Current Millage",
                                    description:props.elem.CurrentMill ,
                                    icon:""
                                },
                                    {  
                                        title:"Last Report",
                                        description:props.dateReport+"  /  "+props.elem.LastReportExpla ,
                                        icon:""
                                    }
                                ]
                setData(newData)
            },[props.cod])
    
    
    
        return  <Layout style={{marginLeft:20,flex:1,flexDirection:"row"}}>
                        <Layout style={{flex:1}}>
                                {data.slice(0,3).map(e=><ListItem
                                        title={e.title}
                                        description={e.description}
                                        icon={AlertIcon}
                                    />)}
                        </Layout>
                        <Layout style={{flex:1}}>
                                {data.slice(3,5).map(e=><ListItem
                                        title={e.title}
                                        description={e.description}
                                        icon={AlertIcon}
                                    />)}
                        </Layout>
                </Layout>
    
    }

    
    
    
  