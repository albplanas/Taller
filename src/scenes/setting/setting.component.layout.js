import React,{useEffect} from 'react';
import {
  Layout,
} from '@ui-kitten/components';

import { StyleSheet } from 'react-native';
import {SwitchSetting} from "./setting.toggle"
import {PickerSetting} from "./setting.picker"



export const  SettingScreenComponent=(props)=>{

  const [language, setLanguage] = React.useState(true);
  const [theme, setTheme] = React.useState(true);
  const [list, setList] = React.useState([]);

  useEffect(() => {

    setLanguage(props.language==="ENGLISH"?true:false)
    setTheme(props.theme==="dark"?true:false)
    setList(props.MechanicList)
  },[props.language,props.theme,props.MechanicList])

      return(
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        
          <PickerSetting
                      param={props.userName}
                      list={list}
                      lang={language}
                      onUpdate_Settings={(val)=>props.onUpdate_Settings("userName",val)}
                      styles={styles}
                      status={'warning'}
                      text={{
                        eng:"Switching this toggle component you will able to set up the entire application in ENGLISH or SPANISH",
                        spa:"Tocando el componente que se encuentra mas abajo puede ser capaz de cambiar el lenguage de toda la aplicacion a INGLES or ESPANOL"
                      }}
                    />
     <SwitchSetting
                      header={'LENGUAGE'}
                      param={language}
                      lang={language}
                      onUpdate_Settings={(val)=>props.onUpdate_Settings("language",val===true?"ENGLISH":"ESPANOL")}
                      styles={styles}
                      status={'success'}
                      text={{
                        eng:"Switching this toggle component you will able to set up the entire application in ENGLISH or SPANISH",
                        spa:"Tocando el componente verde usted puede ser capaz de cambiar el lenguage de toda la aplicacion a INGLES or ESPANOL"
                      }}
                    />
          <SwitchSetting
                     header={'THEME'}
                      param={theme}
                      lang={language}
                      onUpdate_Settings={(val)=>props.onUpdate_Settings("theme",val===true?"dark":"light")}
                      styles={styles}
                      status={'danger'}
                      text={{
                        eng:"Switching this toggle component you will able to set up the entire background between DARK and LIGHT",
                        spa:"Tocando el componente rojo usted puede ser capaz de cambiar el fondo de toda la aplicacion entre Oscuro y Claro"
                      }}
                    />
        </Layout>
      );
    
  }

  const styles = StyleSheet.create({
    card: {
      marginVertical: 8,
      width:700
    },
  });

 