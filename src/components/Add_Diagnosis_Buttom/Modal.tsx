import React ,{useEffect} from 'react';
import {
  Layout
} from '@ui-kitten/components';

import {MultiCard}from "./MultiCards"
import {TopNavigationCase} from "./TopNavigator_Modal"

import {diagnosisFeatures} from "../../globalFunc_Use/auxiliarFunc"
import { StyleSheet  } from 'react-native';



 // import whyDidYouRender from "@welldone-software/why-did-you-render";

  //whyDidYouRender(React);

  export class AddDiagnosisModal extends React.PureComponent {
  //  static whyDidYouRender = true
    render(){
      return (
        <AddDiagnosisModalSample {...this.props}/>
      )
    }
  }



export const AddDiagnosisModalSample =(props)=>{



/******************* STATE TO SUBMIT *******************/

 return (
    <Layout >

        <TopNavigationCase navigation={props.navigation}
                                  cod={props.route.params.item!==null?props.route.params.item.cod:"---"} />
                                 
        <Layout style={[styles.tabContainer,{marginBottom:300}]}>
                                  <MultiCard
                                                {...props} 
                                                item={props.route.params.item}
                                                featureTree={diagnosisFeatures(props.FeaturesList)}  
                                        />
                                  </Layout>    
  



    </Layout>
  );
}





    
const styles = StyleSheet.create({
  tabContainer: {
    minHeight: 600,
  },
});





