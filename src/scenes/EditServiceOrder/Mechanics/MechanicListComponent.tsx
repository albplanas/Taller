import React from 'react';
import { StyleSheet, Alert } from 'react-native';
import {
  Button,
  List,
  ListItem,
  Layout,
  Text,
  Divider
} from '@ui-kitten/components';
import {SaveIcon,PersonIcon,LayersIcon,PersonBlueIcon,TrashButton} from "../../../assets/icons"
import {AddAccessory} from "./addMechanic.component"
import {rowComponent} from"./row.component"
import {DescomposeNotes,deleteLabor} from "./auxiliarFunc"
import { ScrollView } from 'react-native-gesture-handler';






export const MechaniLaborList=(props)=>{
    const header=[{title:"Header"},{title:"Add"}]

    var diagArrFilter=props.DiagnosisArray.filter(e=>e.IdMaintenance===props.route.params.item.IdMaintenance)
    var diagArr=diagArrFilter.length > 0 ? diagArrFilter[0].snap:[];
  
    var diagList=diagArr.map(e=>{
  
          var obj=props.FeaturesList.filter(x=>x.SubId===e)[0];
          return {
            text:obj.Description,
            Title:obj.Title
          }
    })
    const renderAddAccessory=()=> <AddAccessory  {...props} diagList={diagList} />

    const renderItemHeader = ({ item, index }) => {
                                      return  index===0?<ListItem
                                                              title="MECHANIC"
                                                              accessory={()=>rowComponent(
                                                                              <Text>Diagnosis</Text>,<Text>Labor</Text>,
                                                                              <Text>Hrs</Text>,<Text>Pieces</Text>,<Text> </Text>,
                                                                          )}
                                                    />:<ListItem
                                                                          title={props.userName}
                                                                          icon={PersonBlueIcon}
                                                                          accessory={renderAddAccessory}
                                                                />
                                                              }
    const renderItemCheck = ({ item, index }) => {

                          var obj = DescomposeNotes(item.notes)   
                            //  console.log("obj",obj)
                          
                          return  <ListItem
                                                                                          title={item.name}
                                                                                          icon={()=><TrashButton deleteFunc={()=>deleteLabor(item.localId,
                                                                                                                                            props.SO_MechanicLabor_OffLine,
                                                                                                                                            props.onUpdate_EDIT_SO)
                                                                                                                              }
                                                                                            />}

                                                                                          description={item.date}
                                                                                          accessory={()=>rowComponent(
                                                                                                        <Text>{obj.diagnosis}</Text>,
                                                                                                        <Text>{obj.activity}</Text>,
                                                                                                        <Text>{item.hrs}</Text>,
                                                                                                        <Text>{obj.pieces}</Text>,
                                                                                                        <Button appearance="ghost" 
                                                                                                                size="giant" 
                                                                                                                style={{marginLeft:15}} 
                                                                                                                icon={LayersIcon} 
                                                                                                                status={"warning"}
                                                                                                                /> 
                                                                                                    )}
                                                      
                                                                              />
                                                                      
                                                                      }
    const renderItem = ({ item, index }) => {

          var diagnosis=item.note===undefined?"---":item.note.split("diagnosis :").length === 0 ? "---" : item.note.split("diagnosis :")[1];
          var activity=item.note===undefined?"---":item.note.split("activity :").length === 0 ? "---" : item.note.split("activity :")[1];

          return  <ListItem
                                    title={item.name}
                                    icon={PersonIcon}
                                    description={item.date}
                                    accessory={()=>rowComponent(
                                                  <Text>{diagnosis}</Text>,<Text>{activity}</Text>,
                                                  <Text>{item.hrs}</Text>,<Text>{item.pieces.map(e=>e.Pieces!==null?e.Pieces:"No used" ).join(" , ")}</Text>,
                                                  <Button appearance="ghost" 
                                                          size="giant" 
                                                          style={{marginLeft:15}} 
                                                          icon={SaveIcon} 
                                                          status={"success"}
                                                          /> 
                                              )}

                        />
                
                }

return (
      <Layout style={styles.tabContainer}>
          <Layout style={{marginTop:20,marginBottom:100}}>
              <List
                    data={header}
                    renderItem={renderItemHeader}
              />
              <Divider/>
              <ScrollView style={{height:400}}>
              <Text category="label" style={{textAlign:"center",marginTop:20}}>Ready to Send   😊😊😊</Text>
              <List
                    data={props.SO_MechanicLabor_OffLine.filter(x=>x.IdMaintenance===props.item.IdMaintenance)}
                    renderItem={renderItemCheck}
              />
              <Divider/>
              <Text category="label" style={{textAlign:"center",marginTop:20}}>Already Sent    😎😎😎</Text>
              <List
                    data={props.MechanicArrayOriginal.filter(x=>x.IdMaintenance===props.item.IdMaintenance)}
                    renderItem={renderItem}
              />
              </ScrollView>
          </Layout>
          
      </Layout>
      );
}


const styles = StyleSheet.create({
    tabContainer: {
      minHeight: 600,
    },
  });


