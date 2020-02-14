import React ,{useEffect} from 'react';
import { StyleSheet  } from 'react-native';
import {
  Layout,
  Text,
  Button
} from '@ui-kitten/components';

import {DiagnosisChart}from "./DiagnosisTab"










export const AddDiagnosisModal =(props)=>{



/******************* STATE TO SUBMIT *******************/

const [DiagnosisArrayOriginal, setDiagnosisArrayOriginal] = React.useState([]);
const [ExtraArray, setExtraArray] = React.useState([]);


useEffect(() => {
    setDiagnosisArrayOriginal(props.route.params.DiagnosisArrayOriginal)
         }, []);



 return (
    <Layout style={styles.container}>
      <TopNavigationComponent {...props}/>
      <DiagnosisChart 
                          {...props}
                          DiagnosisArray={[]}
                          DiagnosisArrayOriginal={DiagnosisArrayOriginal}
                          ExtraArray={ExtraArray}
                          setExtraArray={setExtraArray}
                          />
  



    </Layout>
  );
}






const TopNavigationComponent = (props) => (
  <Layout level="4" style={{flexDirection: 'row',minHeight:122,justifyContent: 'space-between',padding:10}}>
    
    <Layout style={{ flexDirection: 'row',width:"100%",justifyContent: 'center',}} level="4">
            <Layout style={{ justifyContent: 'center',alignItems: 'center',marginBottom:5}} 
                    level="4"
                    >
                    <Text category="h6">Diagnoses Board </Text>
                    <Text category="h1">EQUIPMENT :   {props.route.params.item.cod} </Text>
            </Layout>  
        <Button style={{margin:8,marginLeft:740,height:50,minWidth:150}} 
                size='giant' 
                status="danger"
                onPress={()=>{props.navigation.goBack()}}
                >Go Back</Button>
    </Layout>
  </Layout>
);
 


  
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    minHeight: 600,
  },
});








