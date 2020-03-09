'use strict';
import React, { PureComponent } from 'react';
import { StyleSheet,  TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import {
  Button,
  Icon,
  Text,
  Spinner,
  Layout,
} from '@ui-kitten/components';

import { connect } from 'react-redux';
import * as actionTypes from "../../store/actions";
import {storeData} from "../../globalFunc_Use/globalJSFunctions"










const CameraIcon = (style) => (
  <Icon {...style} name='camera' width={96} height={96}/>
);
const CloseIcon = (style) => (
  <Icon {...style} name='close-circle-outline' width={96} height={96} />
);




class CameraNavigator extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false
    };
  }

  takePicture = async() => {
    
    if (this.camera) {

            const options = { quality: 0.5, base64: true };

            this.setState({spinner:true})
            const data = await this.camera.takePictureAsync(options);
            var newArr=this.props.pictures_Diagnosis.concat({
              //illustration:data.base64,
              uri:data.uri,
              idSelect:this.props.route.params.idSelect,
              IdMaintenance:this.props.route.params.IdMaintenance,
              PictureID:parseFloat((Math.random()*1000000)+"").toFixed(0),
              date:(new Date).toISOString().slice(0,10)
            })
            this.props.onUpdate_Settings("pictures_Diagnosis",newArr)
            storeData("pictures_Diagnosis",JSON.stringify(newArr));
            this.setState({spinner:false})
          // console.log(newArr.length);
    }
  };







  render() {
    const Back=() => this.props.navigation.goBack();

    const onPress=this.props.route.params.from==="diagnosis"?this.takePicture.bind(this):
                  this.props.route.params.from==='profile'?this.takePictureProfile.bind(this):
                  this.props.route.params.from==='edit_SO'?this.takePictureSO.bind(this):
                                                           ()=>{}
    
    const SpinnerButton=this.state.spinner===true?<Layout style={{borderRadius:50,width:320,flexDirection:"row" ,padding:30}}>   
                                                  <Layout><Spinner style={{alignSelf:"center"}}size="giant"/></Layout>
                                                  <Layout style={{marginLeft:20}}><Text category="h3">Saving Picture ...</Text></Layout>
                                                  </Layout>:
                                                  <Layout style={{borderRadius:50,width:320,flexDirection:"row"}}>
                                                  <Button style={styles.button} status='success' appearance="ghost" onPress={onPress} icon={CameraIcon}/>
                                                  <Button style={styles.button} status='danger'appearance="ghost" onPress={Back}  icon={CloseIcon}/>
                                                  </Layout>
                                                       


    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        />

          {SpinnerButton}
      </View>
    );
  }


 takePictureSO = async() => {
    
    var storeData = async (newArr) => {
      try {
        await AsyncStorage.setItem("SO_Picture_OffLine",newArr)
      } catch (e) {
        alert("Something was wrong: "+e)
      }
    }
    
    if (this.camera) {
      const options = { quality: 1.0, base64: true };
      const data = await this.camera.takePictureAsync(options);
      var newArr=this.props.SO_Picture_OffLine.concat({
        //Photo:data.base64,
        IdMaintenance:this.props.route.params.cod,
        uri:data.uri,
        PictureID:parseFloat((Math.random()*1000000)+"").toFixed(0),
        date:(new Date).toISOString().slice(0,10)
      })
      
      this.props.onUpdate_EDIT_SO("SO_Picture_OffLine",newArr)
      
      storeData(JSON.stringify(newArr));

      this.props.navigation.goBack();
   
    }
  };
  takePictureProfile = async() => {
    
    var storeData = async (newArr) => {
      try {
        await AsyncStorage.setItem("pictures_Profile",newArr)
      } catch (e) {
        alert("Something was wrong: "+e)
      }
    }
    
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      /*var newArr=this.props.pictures_Profile.filter(x=>x.cod!==this.props.route.params.cod).concat({
        illustration:data.base64,
        cod:this.props.route.params.cod
      })*/
      //this.props.onUpdate_Settings("pictures_Profile",newArr)
      
      //storeData(JSON.stringify(newArr));

      this.props.navigation.goBack();
     // console.log(newArr.length);
    }
  };




}

const mapStateToProps = state => {
 
  return {
    pictures_Diagnosis:state.diagnosisList.pictures_Diagnosis,
    SO_Picture_OffLine:          state.editSO.SO_Picture_OffLine
  };
};
const mapDispatchToProps = dispatch => {
  return {
     
      onUpdate_Settings : (property,value) => dispatch({type: actionTypes.UPDATE_DIAGNOSIS_LIST ,property:property,value:value}),
      onUpdate_EDIT_SO:(property,value) => dispatch({type: actionTypes.UPDATE_EDIT_SO  ,property:property,value:value}),
  };
};
export default connect(mapStateToProps,mapDispatchToProps )(CameraNavigator)  ;




const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  button: {
    margin: 8,
  },
});


