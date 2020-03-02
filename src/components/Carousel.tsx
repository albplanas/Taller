import Carousel, { Pagination } from 'react-native-snap-carousel';
import React, { useState,useEffect }  from 'react';
import { StyleSheet, Image, Dimensions, Alert,ToastAndroid, Text  } from 'react-native';
import {
    Layout,
    Button,
  } from '@ui-kitten/components';

import AsyncStorage from '@react-native-community/async-storage';










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

    const [activeSlide,setactiveSlide]=useState(0);
    const [imgList,setimgList]=useState([]);

    useEffect(()=>{

            setimgList(props.imgList)
          },[props.imgList.length])

    const _carouselR=(c) => { var _carousel = c; }

    const renderItem= ({item, index})=> {
        
        
        const   onPress=()=>{
          Alert.alert(
            'Alert Title',
            'My Alert Msg',
            [
              {
                text: 'Cancel',
                onPress:()=>null,
                style: 'cancel',
              },
              {text: 'Delete', onPress: () => { const  newList=imgList.filter(e=>e.PictureID!==item.PictureID ); 
                                                setimgList(newList)    
                                                props.onUpload_Picture(props.label,newList);
                                                storeData(props.label,newList);}},
            ],
            {cancelable: false},
          );
                                  
                      }

                return (
                    <CardImg    item={item} 
                                width={props.Dimensions.imgWidth}
                                height={props.Dimensions.imgHeight}
                                list={props.imgList} 
                                label={props.label}
                                onPress={onPress}
                                />

                );
            }

    const PaginationDot =()=> {
              
              return (
                  <Pagination
                    dotsLength={props.imgList.length}
                    activeDotIndex={activeSlide}
                    containerStyle={{ backgroundColor: '#868e96',borderRadius:12 }}
                    dotStyle={{
                        width: 6,
                        height: 6,
                        borderRadius: 3,
                        marginHorizontal: 2,
                        backgroundColor: 'rgba(255, 255, 255, 0.92)'
                    }}
                    inactiveDotStyle={{
                        // Define styles for inactive dots here
                    }}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.7}
                  />
              );
          }        
  
            return (
                <Layout style={[styles.container,{minHeight:200}]}>
                       {imgList.length===0?
                       <Text style={{textAlign:"center"}}>No Picture Found !!!</Text>:
                        <Layout style={styles.layoutGlobal}>
                     
                                    <Carousel
                                            ref={_carouselR}
                                            data={imgList}
                                            layout={'stack'} layoutCardOffset={`18`}
                                            renderItem={renderItem}
                                            vertical={props.vertical===true?true:false}
                                            sliderWidth={props.Dimensions.sliderWidth}
                                            itemWidth={props.Dimensions.itemWidth}
                                            sliderHeight={props.Dimensions.sliderHeight}
                                            itemHeight={props.Dimensions.itemHeight}
                                            onSnapToItem={setactiveSlide}
                                            />
                                  {props.pagination? <PaginationDot/>   :null} 
                        </Layout>
                    } 
    
                    
                    
            </Layout>
            );

}




const CardImg=(props)=>{
    return   <Layout style={{flex:1}}>
               
              <Image source={{uri: props.item.uri}} style={{width: props.width, height: props.height ,marginBottom:10}} />
                 <Button status="danger" appearance="outline" style={{maxWidth:200,alignSelf:"center"}} onPress={props.onPress}>Delete </Button>      
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
