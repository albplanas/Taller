import AsyncStorage from '@react-native-community/async-storage';


var storeData = async (key,value) => {
    try {
      await AsyncStorage.setItem('username', value)
    } catch (e) {
      alert("Something was wrong: "+e)
    }
  }

  var getData = async (key,callback) => {
    try {
      await AsyncStorage.getItem(key).then((res)=>callback(res))
      
    } catch(e) {
        alert("Something was wrong: "+e)
    }
  }


  const getMultiple = async (arr,callback) => {

    let values
    try {
      values = await AsyncStorage.multiGet(arr)
    } catch(e) {
      alert("ERROR : ",e)
    }
    callback(values)
  
  }

  var getAllKeys = async (callback) => {
    try {
      
     await AsyncStorage.getAllKeys().then((res)=>callback(res));

    } catch(e) {
        alert("Something was wrong: "+e)
    }
  
  
    
  }

  export {
      storeData,
      getData,
      getAllKeys,
      getMultiple

  }