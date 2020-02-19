import React, { useEffect } from 'react';
import {
  Layout,
} from '@ui-kitten/components';

import {TopNavigationActionsShowcase} from "./Header"
import {Info } from "./Info"
import {CardCustomHeaderShowcase} from "./ImgCard"






export const CARD_TRUCK_Profil=(props)=>{

  
  const [cod, setCod] = React.useState(1);
  const [data, setData] = React.useState([]);
  const [id, setId] = React.useState(1);
  
  useEffect(() => {
        setData(props.FeaturesTruck===null || props.select===null?[]:props.FeaturesTruck.filter(x=>x.cod+""===props.select+""))   
        setCod(props.select===null?1:props.select) ;
        setId(props.FeaturesTruck===null || props.select===null?1:props.FeaturesTruck.filter(x=>x.cod+""===props.select+"")[0].IDCatEquip)
                
      }, [props.select]);

    var dateReport  =   typeof (data[0]) === 'object'?
                        data[0].LastReportDate !== null?
                        data[0].LastReportDate.date?
                        data[0].LastReportDate.date.slice(0,10):"---":"---":"---";


// 


return<Layout style={{marginTop:10,justifyContent:"center",flex:1}}>
          
                <TopNavigationActionsShowcase title={cod} cod={cod} id={id} {...props}/>
                <CardCustomHeaderShowcase  cod={cod} elem={data[0]} />
                <Info dateReport={dateReport} cod={cod} elem={data[0]}/>      
                  

       </Layout>
          
}  





 




