import {GetMechanics,Get_Mechanical_Feature_Tree,Get_Diagnosis_Feature_Tree}  from './settings.sql'
import {GetAllFeatures}  from './equipment.sql'
import {Get_Opened_Services_Order} from "./maintenance.sql"





export const onRefreshing=( callback_GetMechanics,
                            callback_Feature_Tree,
                            callback_Feature_Truck,
                            callback_Open_Service_Order,
                            refreshOff)=>{
                                
    GetMechanics(callback_GetMechanics);
    Get_Diagnosis_Feature_Tree(callback_Feature_Tree);

    Get_Opened_Services_Order(callback_Open_Service_Order)
    GetAllFeatures(callback_Feature_Truck,refreshOff);
}