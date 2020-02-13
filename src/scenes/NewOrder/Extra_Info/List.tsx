import React from 'react';
import { StyleSheet  } from 'react-native';
import {
  Layout,
  CheckBox,
  ListItem,
  List,
  Input,
} from '@ui-kitten/components';
import Carouselexample from "../../../components/Carousel";
import {dataPicturesConstruction} from "../constructionModel"





export const CenterList = (props) => {
         
          var data= props.imgList
       
            return <Layout style={{height:450}}> 
                           
                            <Carouselexample 
                                                    imgList={data}  
                                                    onUpload_Picture={props.onUpdate_DIAGNOSIS}
                                                    vertical={true}
                                                    label="pictures_Diagnosis"
                                                    Dimensions={{
                                                      itemWidth:650,
                                                      sliderWidth:800,
                                                      sliderHeight:300,
                                                      itemHeight:300,
                                                      imgWidth:650,
                                                      imgHeight:300
                                                    }}/>                        
                            
                </Layout>
}




export const LeftList = (props) => {

      const renderItem = ({ item, index }) => (
        <LeftListItem item={item} data={props.data} index={index} setData={(obj)=>props.setData(obj) }/>
      );

      return (
        <List
          data={props.data.arr}
          renderItem={renderItem}
        />
      );
};

export const LeftListItem = (props) => {

const [value, setValue] = React.useState(props.item.value);

const generalSetValue=(val)=>{
  var newObj=Object.assign({},props.data);
  newObj.arr[props.index].value=val;
  setValue(val)
  props.setData(newObj)

}

    const onCheckBoxCheckedChange = (index) => {
      generalSetValue(!value)
    };

    const render_CheckBox_Accessory = (style, index) => (
    <CheckBox
      style={style}
      checked={value}
      onChange={() => onCheckBoxCheckedChange(index)}
    />
    );
    const render_TextArea_Accessory = (style, index) => (
    <Input
            value={value}
            placeholder='Place something extra here'
            onChangeText={(value)=>generalSetValue(value)}
            label={props.item.title}
            style={styles.textarea}
            />
    );
    const render_Input_Accessory = (style, index) => (
    <Input
            value={value}
            placeholder={props.item.description}
            onChangeText={(value)=>generalSetValue(value)}
            label={props.item.title}
            style={styles.textarea}
            />
    );


    return (
    <ListItem
      title={props.item.title}
      accessory={   props.item.inputType==="checkbox" ? render_CheckBox_Accessory:
                    props.item.inputType==="textArea" ? render_TextArea_Accessory:
                    props.item.inputType==="inputArea" ?render_Input_Accessory
                    
                    :null}
    />
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
    
      layout: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: 'center',
      },
      rowContainer: {
        flexDirection: 'row',
      },
        textarea: { borderRadius: 12,width:'100%',height:100 },
        inputText: { borderRadius: 12,width:'100%' },
     
    });