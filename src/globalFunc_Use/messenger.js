import { ToastAndroid  } from 'react-native';

function SelectSMS(data){
    if(data.mtto_mill+""==='null' || parseFloat(data.mtto_mill)<1){
      return {
        percentage:null,
        error:"The amount of millage between maintenance must be set up, PLEASE CONTACT WITH THE OFFICE AND REPORT THIS ERROR 😖😖😖"
      }
    }
   else if(data.CurrentMill+""==='null' || parseFloat(data.CurrentMill)<1){
      return {
        percentage:null,
        error:"The equipment have a problem with the  current millage, so it migth be either odometer doesn't work or the Wonder Box have to be updated, , PLEASE CONTACT WITH THE OFFICE AND REPORT THIS ERROR 😟😟😟"
      }
    }
    else if(data.MttoMill+""==='null' || parseFloat(data.MttoMill)<1){
      return {
        percentage:null,
        error:"The equipment doesn't have a previous record of mantence , PLEASE CONTACT WITH THE OFFICE AND REPORT THIS ERROR 😟😟😟"
      }
    }
    else{
      return {
        error:null,
        percentage:parseFloat(100*(parseFloat(data.CurrentMill)-parseFloat(data.MttoMill))/parseFloat(data.mtto_mill)).toFixed(0)
    }
  }
  }
  const Toast_SMS=(sms)=>ToastAndroid.showWithGravityAndOffset(
    sms,
    ToastAndroid.LONG,
    ToastAndroid.CENTER,
    25,
    50,
  );

  

  export {
    SelectSMS,
    Toast_SMS
  }