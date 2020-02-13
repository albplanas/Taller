import AsyncStorage from '@react-native-community/async-storage';

var storeData=(obj,oldArr,onUpdate_EDIT_SO,localSetData)=>{
    //console.log("ARGUMENTS",obj,oldArr,onUpdate_EDIT_SO,localSetData)
    var f=oldArr.filter(x=>x.id===obj.id).concat(obj)
   
   
    var storeDataPermanently = async (f) => {
        try {
        await AsyncStorage.setItem("SO_ExtraInfo_OffLine", JSON.stringify(f))
        
        } catch (e) {
        alert("Something was wrong: "+e)
        }

  }
  storeDataPermanently(f);
  onUpdate_EDIT_SO("SO_ExtraInfo_OffLine",f) ;
  localSetData(obj)
 

}

export {
    storeData
}