/**
 * This example demonstrates how simply could be composed List Item
 * with classic layouts like icon at the left, forward button at the right, etc.
 *
 * IMPORTANT: To use Icon component make sure to follow this guide:
 * https://akveo.github.io/react-native-ui-kitten/docs/guides/icon-packages
 */

import React from 'react';
import {
  ListItem,
  Layout,
} from '@ui-kitten/components';



export const ModeEdit_Off = (props) => {

  const [text, setText] = React.useState(["","",""]);


    React.useEffect(() => {
        setText([props.description,props.explanation,props.pieces]);                               

    }, [props.description,props.explanation,props.pieces]);

  return (
  <Layout level='4' style={{marginTop:20}}>
            <ListItem title={'Description :'}
                      titleStyle={{fontSize:16}}
                      description={text[0]}
                      descriptionStyle={{fontSize:13,marginVertical:8,marginHorizontal:20}}
                      style={{marginVertical:8,maxWidth:600,alignSelf:"center"}}
                      />
         
            <ListItem title={'Explanation :'}
                      titleStyle={{fontSize:16}}
                      description={text[1]}
                      descriptionStyle={{fontSize:13,marginVertical:8,marginHorizontal:20}}
                      style={{marginVertical:8,maxWidth:600,alignSelf:"center"}}
                      />  
                      
            <ListItem title={'Pieces :'}
                                titleStyle={{fontSize:16}}
                                description={text[2]}
                                descriptionStyle={{fontSize:13,marginVertical:8,marginHorizontal:20}}
                                style={{marginVertical:8,maxWidth:600,alignSelf:"center"}}
                                /> 
 
                  
      </Layout>

  );
};


















