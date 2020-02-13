import {onRefreshing} from "../../SQL/onRefresh"
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";
import { Alert,ToastAndroid } from "react-native";



var storeData = async (key,value) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (e) {
    alert("Something was wrong: "+e)
  }
}


const RefreshFunct=(onUpdate_LIST,setRefreshing) => {
  NetInfo.fetch().then(state => {
    console.log("Connection type", state);
    console.log("Is connected?", );

    if(state.isConnected){

                  setRefreshing(true);
                
                  var getMechanic=(val)=>{
                  var String_Value=JSON.stringify(val)
                    onUpdate_LIST("MechanicList",val);
                    storeData("MechanicList",String_Value);
                
                  }
                  
                  var get_Feature_Tree=(val)=>{
                    var String_Value=JSON.stringify(val)
                  
                    onUpdate_LIST("FeaturesList",val)
                    storeData("FeaturesList",String_Value)
                
                  }
                  var get_Feature_Truck=(val)=>{
                
                    var String_Value=JSON.stringify(val)
                  
                    onUpdate_LIST("FeaturesTruck",val)
                    storeData("FeaturesTruck",String_Value)
                  }
              
              
                  var get_Opened_S_O=(val)=>{
                
                    var String_Value=JSON.stringify(val)
                    onUpdate_LIST("Opened_S_O",val)
                    storeData("Opened_S_O",String_Value)
                  }
                
                
                
                  var setRefreshingExp=()=> {setRefreshing(false);console.log("false");
                                              ToastAndroid.showWithGravityAndOffset(
                                                'The app has been updated !!!',
                                                ToastAndroid.LONG,
                                                ToastAndroid.CENTER,
                                                25,
                                                50,
                                              );} 
                
                  onRefreshing(getMechanic,get_Feature_Tree,get_Feature_Truck,get_Opened_S_O,setRefreshingExp)
    }
    else{
      Alert.alert(
        'Refresh no available',
        'This device is not conected to the network, Please turn on the wifi or check the wifi signal strength.',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }
  });

  
  
  }

  export {
    RefreshFunct,
    storeData
  }