'use strict';
import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import {
  Button,
  Icon,
  Layout,
} from '@ui-kitten/components';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import * as actionTypes from "../../store/actions";









const CameraIcon = (style) => (
  <Icon {...style} name='camera' width={96} height={96}/>
);
const CloseIcon = (style) => (
  <Icon {...style} name='close-circle-outline' width={96} height={96} />
);




class CameraNavigator extends PureComponent {
  
  render() {
    
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
        <Layout style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' ,width:"50%", marginLeft:"25%"}} level={"4"}>
          
          <Button style={styles.button} status='success' appearance="ghost" onPress={this.props.route.params.from==="diagnosis"?this.takePicture.bind(this):
                                                                                            this.props.route.params.from==='profile'?this.takePictureProfile.bind(this):
                                                                                            this.props.route.params.from==='edit_SO'?this.takePictureSO.bind(this):
                                                                                                null
                                                                                                } icon={CameraIcon}/>
          <Button style={styles.button} status='danger'appearance="ghost" onPress={() => this.props.navigation.goBack()}  icon={CloseIcon}/>
         
        </Layout>
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
      const options = { quality: 0.5, base64: true };
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
  takePicture = async() => {
    var storeData = async (newArr) => {
      try {
        await AsyncStorage.setItem("pictures_Diagnosis",newArr)
      } catch (e) {
        alert("Something was wrong: "+e)
      }
    }
    
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      var newArr=this.props.pictures_Diagnosis.concat({
        //illustration:data.base64,
        uri:data.uri,
        PictureID:parseFloat((Math.random()*1000000)+"").toFixed(0),
        date:(new Date).toISOString().slice(0,10)
      })
      this.props.onUpdate_Settings("pictures_Diagnosis",newArr)
      storeData(JSON.stringify(newArr));
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


