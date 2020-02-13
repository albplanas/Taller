import React, {useEffect} from 'react';
import { StyleSheet  } from 'react-native';
import {
  Layout
} from '@ui-kitten/components';
import { InfoIcon,Camera_Icon} from '../../../assets/icons';
import {CardLayout} from "./CardLayout"
import {storeData} from "./helperfunc.js"




export const Extra_Info =(props)=><Layout style={styles.tabContainer}>
                                                <Layout style={[styles.rowContainer]}>
                                                        <CardLayout setData={(obj)=>storeData(obj,props.SO_ExtraInfo_OffLine,props.onUpdate_EDIT_SO,props.setExtraArrayOriginal)} 
                                                                    iconHead={InfoIcon}  width={450}  title="Info Request"   data={props.ExtraArrayOriginal} type="corner"/>
                                                        <CardLayout iconHead={Camera_Icon}    {...props} width={828}  title="Pictures Taken" type="center"/>
                                                        
                                                </Layout>
                                            
                                    </Layout>
  
        

          
          


    
  const styles = StyleSheet.create({
    tabContainer: {
      minHeight: 600,
    },
    container: {
        flex: 1,
      },
  
      layout: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: 'center',
      },
  
      rowContainer: {
        flexDirection: 'row',
      },
     
  });


