import React, { useEffect ,useState} from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Text,Avatar,Icon
} from '@ui-kitten/components';

import {Read_Tree_Pieces} from "../../SQL/Pieces/tree.js"
import {MenuList} from "../../components/MainComponents/MenuList"
import {ListingCase} from "./listing"






const StarIcon = (style) => (
  <Icon {...style} name='star'/>
);
const InfoIcon = (style) => (
  <Icon {...style} name='info-outline'/>
);

export const PiecesTree = (props) =>{
    const [select,setSelect]=useState([null,null,null,800]);
    const [Category,setCategory]=useState([]);
    const [subCategory,setsubCategory]=useState([]);
    const [list,setList]=useState([]);
    const [pieces,setPieces]=useState([]);
    const [similar,setSimilar]=useState([]);
    const selectChange=(index,val)=>{
      if(index===0){

        
        var IDSysScheme=Category[val].id;
        const subList=list.filter(x=>x.IDSysScheme===IDSysScheme).map(x=>{
                                        
                                      
                  return JSON.stringify({
                    id:x.IDSysSchemeDetail,
                    title:x.descrip
                  })
                }) 
                
          const newCatg=[ ... new Set(subList)].map(c=>{  

                                                    const parC=JSON.parse(c)
                                                    return {
                                                    ... parC,
                                                    icon:InfoIcon,
                                                    titleStyle: styles.menuItemsubTitle,
                                                    }
                                              });
          setsubCategory(newCatg)
          setSelect([val,null,null,630]);

      }
      else if(index===1){
        
        var IDSysSchemeDetail=subCategory[val].id;
        const sub_2List=list.filter(x=>x.IDSysSchemeDetail===IDSysSchemeDetail)
                            .map(x=>{
                                        return JSON.stringify({
                                          id:x.idcodpieces,
                                          title:x.value,
                                          subtitle:x.Piece_Descrip,
                                          amount:x.Amount,
                                          titleStyle: styles.menuItemsubTitle,
                                        })
                                      })  
                                            
                                      
                                                                                       
        const newPieces=[ ... new Set(sub_2List)].map(c=>JSON.parse(c)).filter(x=>x.title!==null);
        setPieces(newPieces)
        setSelect([select[0],val,null,420]);
                                                          
      }
      else if(index===2){

        

        var IDSysSchemeDetail=subCategory[val].id;
        var idcodpieces=pieces[val].id;
        const sub_3List=list.filter(x=>x.IDSysSchemeDetail===IDSysSchemeDetail && x.idcodpieces===idcodpieces)
                            .map(x=>{
                                        return JSON.stringify({
                                          id:x.idsimilar,
                                          title:x.Similar,
                                          subtitle:x.Similar_Descrip,
                                          amount:x.SimilarAmount
                                        })
                                      })
        const newSimilar=[ ... new Set(sub_3List)].map(c=>JSON.parse(c)).filter(x=>x.title!==null);
        setSimilar(newSimilar)
        setSelect([select[0],select[1],val,310]);
      }
     
    }

   const  Refresh= async function(){
                              let res= await Read_Tree_Pieces(1);
                              
                              const catg=res.map(x=>{
                                
                              
                                return JSON.stringify({
                                  id:x.IDSysScheme,
                                  title:x.Scheme
                                })
                              }) 
                        const newCatg=[ ... new Set(catg)].map(c=>{  

                                                                  const parC=JSON.parse(c)
                                                                  return {
                                                                  ... parC,
                                                                  icon:StarIcon,
                                                                  titleStyle: styles.menuItemTitle,
                                                                  }
                                                            });
                             setCategory(newCatg);
                             setList(res)
                              
                            }


    useEffect(()=>{
      Refresh()
    },[])

return (
  
    <Layout style={[styles.container,{paddingTop:1}]}>
  
      <MenuList data={Category}
                  selectedIndex={select[0]}
                  show={true}
                  setSelectedIndex={(val)=>selectChange(0,val)} 
                  header="CATEGORY"
                  width={ select[3]}
                  />
  
      <MenuList       data={subCategory}
                      selectedIndex={select[1]}
                      show={select[0]===null?false:true}
                      setSelectedIndex={(val)=>selectChange(1,val)} 
                      header="Subcategory"
                      width={ select[3]}
                      />
      <ListingCase    data={pieces}
                      selectedIndex={select[2]}
                      show={select[1]===null?false:true}
                      setSelectedIndex={(val)=>selectChange(2,val)}
                      header="Pieces"
                      width={ select[3]}
                      />

  
      <ListingCase    data={similar}
                            selectedIndex={select[2]}
                            show={select[2]===null?false:true}
                            header="Similars"
                            width={ select[3]}
                            />
  
    </Layout>
  );


} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatar: {
    margin: 16,
  },
  menuItemTitle:{
    fontSize:20
  },
  menuItemsubTitle:{
    fontSize:16
  }
});

