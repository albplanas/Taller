import React from 'react';
import { StyleSheet ,SafeAreaView,ScrollView, RefreshControl,} from 'react-native';
import {
  Divider,
  Layout,
  Text
} from '@ui-kitten/components';
import { SettingScreenProps } from '../../navigation/setting.navigator';
import { Toolbar } from '../../components/toolbar.component';
import {
  SafeAreaLayout,
  SafeAreaLayoutElement,
  SaveAreaInset,
  

} from '../../components/safe-area-layout.component';
import { MenuIcon } from '../../assets/icons';

import {SettingScreenComponent} from "./setting.component.layout.js"
import {RefreshFunct} from "../NewOrder/globalJSFunctions"

export const SettingScreen = (props: SettingScreenProps): SafeAreaLayoutElement => {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(()=>RefreshFunct(props.onUpdate_LIST,setRefreshing), [refreshing]);
 return (
    <SafeAreaLayout
      style={styles.safeArea}
      insets={SaveAreaInset.TOP}>
         <SafeAreaView >
                    <ScrollView
                                  refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                                  
                    >
                        <Toolbar
                                title='SETTINGS'
                                backIcon={MenuIcon}
                                onBackPress={props.navigation.toggleDrawer}
                              />
                              <Divider/>
                              <Layout style={styles.container}>
                                <SettingScreenComponent 
                              {...props}
                                />
                              </Layout>
                    </ScrollView>
         </SafeAreaView>
     
    </SafeAreaLayout>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});











