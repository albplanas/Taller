import  {storeData} from "./globalJSFunctions"
import {ToastAndroid} from "react-native"
import {Toast_SMS} from "./messenger"


export function GlobalUpdate(arr,key,localUpdate){

    storeData(key,JSON.stringify(arr));

    Toast_SMS("Saving Data and loading the Changes for " +key)

    localUpdate(key,arr)

}