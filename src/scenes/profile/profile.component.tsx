import React from 'react';
import { StyleSheet,ScrollView,RefreshControl } from 'react-native';
import {
  Divider,
  Layout,
  Button,
  Text,
  Input,
  ListItem,
  List
} from '@ui-kitten/components';
import { ProfileScreenProps } from '../../navigation/profile.navigator';
import {
  SafeAreaLayout,
  SafeAreaLayoutElement,
  SaveAreaInset,
} from '../../components/safe-area-layout.component';
import { CarIcon, SearchIcon } from '../../assets/icons';
import {CARD_TRUCK_Profil} from "../../components/Profile/Equiment_Profile.component"




export const ProfileScreen = (props: ProfileScreenProps): SafeAreaLayoutElement => {

  const [refreshing, setRefreshing] = React.useState(false);
  const [text, setText] = React.useState("");
  const [select, setSelect] = React.useState(null);
  const onRefresh = React.useCallback(() => {}, [refreshing]);
  
  return (

    <SafeAreaLayout
      style={styles.safeArea}
      insets={SaveAreaInset.TOP}>
      <Header text={text} setText={setText} select={select} />
      <Divider/>

     {  (select===null)?
              <VerticalLayout  {...props} 
                                refreshing ={refreshing}setRefreshing= {setRefreshing}
                                text={text} setText={setText}
                                select={select} setSelect={setSelect}
                                onRefresh={onRefresh}
                                />:
              <HorizontalLayout  {...props} 
                                  refreshing ={refreshing}setRefreshing= {setRefreshing}
                                  text={text} setText={setText}
                                  select={select} setSelect={setSelect}
                                  onRefresh={onRefresh}
                                  />
             
     } 
    </SafeAreaLayout>
  );
}



/****************   COMPONENT  *****************/
const HorizontalLayout=(props)=>{
  return   <Layout style={styles.containerDist}>

                  <Layout style={styles.layoutDist} >
                         <CARD_TRUCK_Profil  {...props} />
                  </Layout>
                  <Layout style={styles.layoutDist} > 
                         <VerticalLayout {...props}/>
                  </Layout>
            </Layout> 
}

const VerticalLayout=(props)=>{
  return <Layout style={styles.containerDist}>
                  <ScrollView refreshControl={ <RefreshControl refreshing={props.refreshing} onRefresh={props.onRefresh} />}
                                    style={props.select===null?null:{marginBottom:20}}              
                        >
                        <Listed {...props} text={props.text} setSelect={props.setSelect}/>
            
                  </ScrollView>
  </Layout>
}

const styles = StyleSheet.create({
  containerDist: {
    flex: 1,
    flexDirection: 'row',
  },
  layoutDist: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  buttonGroup: {
    margin: 8,
  },
  controlContainer: {
    borderRadius: 4,
    margin: 8,
    backgroundColor: '#3366FF',
  },
  containerL: {
    flex: 1,
  },
  containerM: {
    flex: 1,
    flexDirection: 'row',
    maxHeight:80
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin:10
  },
  layout1: {
    flex: 1,
    width:'50%',
    marginLeft:'25%',
    marginTop:30
  },
  text: {
    margin: 8,
  }

});

const Header=(props)=>{
  
      return  <Layout style={styles.containerM}>

            <Layout style={styles.layout} >
              <Text category={"h5"}>{ props.select===null?"  EQUIPMENT PROFILE 🚚":props.select+"  EQUIPMENT PROFILE 🚚"}</Text>
            </Layout>
            <Layout style={styles.layout} level='4'>
            <Input
                    placeholder='SEARCH BY TRUCK ...'
                    value={props.text}
                    onChangeText={props.setText}
                    icon={SearchIcon}
                  />
            </Layout>
        </Layout>
}
const Listed =(props)=>{

    var arr=props.text.length===0?props.FeaturesTruck:props.FeaturesTruck.filter(x=>x.cod.indexOf(props.text)!==-1).sort((a,b)=>{return a.cod>b.cod?1:-1})
    var newArr=arr.slice(0,10);
  return  <Layout style={styles.containerL}>

              <Layout style={styles.layout1} level='2'>
                    { arr.length===0?<NoFound/>: <ListCompositeItemShowcase  data={newArr} setSelect={props.setSelect} /> }    
              </Layout>
                  
                    
      </Layout>
  }


const NoFound=()=>{
  return <Layout >
        <Text style={styles.text} status="warning"category='h1'>SEARCH NO FOUND ... </Text>
  
      </Layout>
  }



  const ListCompositeItemShowcase = (props) => {
  
   const renderItem = ({ item, index }) => {
      const renderItemAccessory = (style) => (
        <Button style={style}
                onPress={()=>props.setSelect(item.cod)}>SELECT</Button>
      );
      return (
        <ListItem
          title={`${item.cod} `}
          description={`${item.descrip} / ${item.Brand} / ${item.year} `}
          icon={CarIcon}
          accessory={renderItemAccessory}
        />
      );
    }
  
    return (
      
      <List
        data={props.data}
        renderItem={renderItem}
      />
    );
  };
  
  

  
  

  
  
