import Carousel, { Pagination } from 'react-native-snap-carousel';
import React  from 'react';
import { StyleSheet, Image, Dimensions, Alert,ToastAndroid  } from 'react-native';
import {
    Layout,
    Text,
    Button,
    CardHeader,
    Card 
  } from '@ui-kitten/components';

import AsyncStorage from '@react-native-community/async-storage';

import {TrashAltIcon,TrashButton} from "../assets/icons"




var storeData = async (label,value) => {
    try {
      await AsyncStorage.setItem(label, JSON.stringify(value))
      ToastAndroid.showWithGravityAndOffset(
        "This picture has been eliminated 🗑🗑🗑",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        15,
        50,
      )
    } catch (e) {
      alert("Something was wrong: "+e)
    }
  }



export default Carouselexample =(props)=>{

    const _carouselR=(c) => { var _carousel = c; }

    const renderItem= ({item, index})=> {
        
        const  newList=props.imgList.filter(e=>e.PictureID!==item.PictureID );
                return (
                    <CardImg    item={item} 
                                width={props.Dimensions.imgWidth}
                                height={props.Dimensions.imgHeight}
                                list={props.imgList} 
                                label={props.label}
                                onPress={()=>{
                                    
                                        props.onUpload_Picture(props.label,newList);
                                        storeData(props.label,newList);         
                                    }}/>

                );
            }
           
            return (
                <Layout style={[styles.container,{minHeight:200}]}>
                       {props.imgList.length===0?
                       <Card style={styles.card} header={()=><CardHeader title='Notice !!!'/>} status='warning'>
                            <Text >There is no picture in record ! , 
                                    If you like to take pictures push the BUTTON (NEW !)</Text>
                        </Card>:
                        <Layout style={styles.layoutGlobal}>
                     
                                    <Carousel
                                            ref={_carouselR}
                                            data={props.imgList}
                                            layout={'default'}
                                            renderItem={renderItem}
                                            vertical={props.vertical===true?true:false}
                                            sliderWidth={props.Dimensions.sliderWidth}
                                            itemWidth={props.Dimensions.itemWidth}
                                            sliderHeight={props.Dimensions.sliderHeight}
                                            itemHeight={props.Dimensions.itemHeight}
                                            />
                        </Layout>
                    } 
    
                    
                    
            </Layout>
            );

}




const CardImg=(props)=>{
    return   <Layout style={{flex:1,flexDirection:"row"}}>
               
              <Image source={{uri: props.item.uri}} style={{width: props.width, height: props.height ,marginBottom:10}} />
                 <TrashButton  deleteFunc={()=>props.onPress()} />      
            </Layout>
}

var styles=StyleSheet.create({
    container: {
        flex: 1,
      },
      card: {
        marginVertical: 8,
      },
      layout: {
       // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin:10,
      },
      layoutGlobal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin:10,
        padding:10,
      //  marginBottom:120
      },
    gradient: {
        ...StyleSheet.absoluteFillObject
    },
    scrollview: {
        flex: 1
    },
    exampleContainer: {
        paddingVertical: 30
    },

    exampleContainerLight: {
        backgroundColor: 'white'
    },
    title: {
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    subtitle: {
        marginTop: 5,
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.75)',
        fontSize: 13,
        fontStyle: 'italic',
        textAlign: 'center'
    },
    slider: {
        marginTop: 15,
        overflow: 'visible' // for custom animations
    },
    sliderContentContainer: {
        paddingVertical: 10 // for custom animation
    },
    paginationContainer: {
        paddingVertical: 8
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 8
    }
});