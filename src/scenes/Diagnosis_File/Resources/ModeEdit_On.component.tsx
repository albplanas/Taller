import React from 'react';
import {
  Select,
  Text,
  Layout,
} from '@ui-kitten/components';
import {TextArea} from "../../../components/MainComponents/TextArea"

export const ModeEdit_On = (props) => {

  return (
            <Layout level='4' style={{marginTop:20}}>
                    <TextArea text={props.description} 
                              setText={props.setdescription}
                              placeholder="Describe the issue"
                              validation={props.description.length>0?true:false}
                              width={732} 
                              caption={"This field is required"}
                              label="Description"
                              level={"3"}                                         
                                              />
                    <TextArea text={props.explanation} 
                              setText={props.setExplanation}
                              placeholder="Describe the issue"
                              validation={props.explanation.length>0?true:false}
                              width={732} 
                              caption={"This field is required"}
                              label="Explanation"
                              level={"3"}                                         
                                              />

                                              
                            
                </Layout>

  );
};








const Pieces = (props) => {

  const onSelect=(val)=>props.setSelectedOption(val)

  return (
    <Layout style={{width:600,flexDirection:"row",justifyContent:"flex-start",marginVertical:8,alignSelf:"center",borderRadius:12}}>
      <Text category="h6" style={{paddingTop:10,paddingHorizontal:20}}>Pieces</Text>
      <Select
        data={props.data}
        size="large"
        style={{minWidth:510}}
        multiSelect={true}
        placeholder="Select Pieces"
        selectedOption={props.selectedOption}
        onSelect={onSelect}
      />
    </Layout>
  );
};









