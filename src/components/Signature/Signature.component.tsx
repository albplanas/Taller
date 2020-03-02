import React from 'react';
import {
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {
  EdgeInsets,
  useSafeArea,
} from 'react-native-safe-area-context';

import {
  Button,
  Layout,
  Select,
  Input,
  Card,
  Divider,
  CardHeader,
  CheckBox,
  Text,
  LayoutElement,
} from '@ui-kitten/components';
import { SignUpScreenProps } from '../../navigation/auth.navigator';
import { Toolbar } from '../../components/toolbar.component';

import {EyeOffIcon,EyeIcon}from "../../assets/icons";

import {AppRoute} from '../../navigation/app-routes'



export const SignUpScreen = (props: SignUpScreenProps): LayoutElement => {

  const insets: EdgeInsets = useSafeArea();
  const [selectedOption, setSelectedOption] = React.useState(null);

  const [value, setValue] = React.useState('');
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);


  const onIconPress = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  var keyName=selectedOption===null?null:selectedOption.text
  var key=password.filter(e=>e.text===keyName).length>0?
          password.filter(e=>e.text===keyName)[0].password:""

 

  return (
    <React.Fragment>
      <ImageBackground
        style={[styles.appBar, { paddingTop: insets.top }]}
        source={require('../../assets/image-background.jpeg')}>
        <Toolbar
          appearance='control'
          onBackPress={props.navigation.goBack}
        />
      </ImageBackground>
 
      <Layout style={styles.formContainer}>
        <Layout style={{minWidth:600,}}>
              <Select
                data={data}
                size='large'
                style={styles.select}
                selectedOption={selectedOption}
                placeholder={"SELECT SUPERVISOR"}
                onSelect={setSelectedOption}
                
              />
              <Input
                    placeholder='Password'
                    status={value.length>0 ? value===key? 'success':'primary'  : 'danger'}
                    caption={value.length>0 ? value===key? 'RIGHT PASSWORD':'Wrong Password' : 'Can not be empty'}
                    value={value}
                    onChangeText={setValue}
                    secureTextEntry={secureTextEntry}
                    icon={secureTextEntry ? EyeOffIcon : EyeIcon}
                    onIconPress={onIconPress}
            />
              <Button
                style={styles.submitButton}
                onPress={()=>value!==key?alert("THAT PASSWORD IS INCORRECT, TRY AGAIN OR LEAVE THIS PAGE CLICKING ON THE GO_BACK ARROW ( ⬅️ )"):props.navigation.navigate(AppRoute.TODO_DONE,{send:true})}>
                CLOSE THAT ORDER
              </Button>
      </Layout>
      </Layout>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  appBar: {
    height: 296,
  },
  select: {
    marginTop: 8,
    marginBottom: 8,
    height:50
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  formContainerOne: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  formControl: {
    marginVertical: 4,
  },
  submitButton: {
    marginVertical: 24,
  },
  haveAccountButton: {
    alignSelf: 'center',
  },
  checkbox: {
    margin: 8,
  },
});


const data = [
  { text: 'ANGEL OSCAR' },
  { text: 'ARIEL' },
];
const password = [
  { password: 's3232o',text: 'ANGEL OSCAR' },
  { password: '6600',text: 'ARIEL' },
];







const CardWithHeader = (props) => {
  const Header = () => (
    <CardHeader
      title={props.item.number}
    />
  );
  const [activeChecked, setActiveChecked] = React.useState(props.item.scheduledmaint===1);


  const onActiveChange = (isChecked) => {
    setActiveChecked(isChecked);
  };


  return (
    <Card header={Header} status='success' style={{width:750,marginTop:-150}} >
      <Text category="h3" > EQUIPMENT : {props.item.cod}</Text>
      <Divider style={{marginBottom:10, marginTop:10}}/>
      <Text category="h6"> DATE : {props.item.date.date.slice(0,10)}</Text>
      <Divider style={{marginBottom:10, marginTop:10}}/>
      <Text category="h6"> Diagnosis : {props.item.diagnosis}</Text>
      <Divider style={{marginBottom:10, marginTop:10}}/>
      <Text category="h6"> Explanation : {props.item.explanation}</Text>
      <Divider style={{marginBottom:10, marginTop:10}}/>
      <Layout style={{flexDirection: 'row'}}>
      <CheckBox
        style={styles.checkbox}
        text='Maintenance'
        checked={activeChecked}
        onChange={onActiveChange}
      />

      {props.item.scheduledmaint===0?  
    
      <Text category="c3" status="danger" style={{marginTop:10}}> ( This Service Order have not been placed as Maintenance. )</Text>
      :null}
      </Layout>
    </Card>
  );
}









