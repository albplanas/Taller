import React, { Component } from 'react';
import { Input, Layout ,Button} from '@ui-kitten/components';

import {EditIcon} from "../assets/icons"
import AsyncStorage from '@react-native-community/async-storage';
export class ExtraNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes:''
        };
        this.setValue=this.setValue.bind(this)
      }
      setValue(val){
        this.props.onUpdate_DIAGNOSIS("notes",val);
        var storeData = async () => {
            try {
              await AsyncStorage.setItem('notes', val)
            } catch (e) {
              alert("Something was wrong: "+e)
            }
          }
          storeData();
      }

UNSAFE_componentWillMount(){
    this.setState({
      notes:(this.props.notes===null || this.props.notes===undefined)?"":this.props.notes
    })
}
UNSAFE_componentWillReceiveProps(nextProps){
  if(nextProps.notes!==undefined && nextProps.notes!==null )
    if(this.state.notes.length!==nextProps.notes.length){
        this.setState({notes:nextProps.notes})
    }
}
      
render(){

    return (
        <Layout>

             <Input
                        placeholder='Add an extra note to this Service Order'
                        value={this.state.notes}
                        onChangeText={(val)=>this.setValue(val)}
                        style={{margin:10, borderRadius: 12,maxWidth:'60%' ,marginLeft:"20%" }}
                        icon={EditIcon}
                    
                        />
        </Layout>
      );
}

};