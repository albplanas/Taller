import React from 'react';
import {
  ImageBackground,
  StyleSheet,Alert
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
  LayoutElement,
  Divider,Text
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

 const Pass=()=>{
                  props.route.params.callback()
                  props.navigation.goBack();
 }
 const Reject=()=>{
  Alert.alert(
    'Incorrect Password',
    'Check your password and try again',
    [
      
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ],
    {cancelable: false},
  );
 }
 const onPress=()=>{value.length>0 ? value===key?Pass():Reject():Reject()}

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
      <Text category="h2">
                            {props.route.params.name}
       </Text>
       <Divider/>
        <Layout style={{minWidth:600,marginTop:20}}>
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
                    status={value.length>0 ? value===key? 'success':'danger'  : 'danger'}
                    caption={value.length>0 ? value===key? 'RIGHT PASSWORD':'Wrong Password' : 'Can not be empty'}
                    value={value}
                    size="large"
                    onChangeText={setValue}
                    secureTextEntry={secureTextEntry}
                    icon={secureTextEntry ? EyeOffIcon : EyeIcon}
                    onIconPress={onIconPress}
                    style={{marginTop:20}}
            />
            <Divider style={{marginTop:30}}/>
              <Button
                style={styles.submitButton}
                size="giant"
                onPress={onPress}>
                Certificate
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
    maxWidth:220,
    alignSelf:"center"
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















