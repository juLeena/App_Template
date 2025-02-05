import React, { useState } from 'react';
import { useWindowDimensions, View, Text, TextInput, TouchableOpacity, PermissionsAndroid, Platform, StyleSheet, ScrollView, Switch} from 'react-native';
import { Divider } from 'react-native-paper';
import Modal from "react-native-modal";
import SwitchToggle from 'react-native-switch-toggle';
import realm from './src/localDB/document';
import * as repository from './src/localDB/document';
import PushNotification from "react-native-push-notification";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';


const ChangeProfile = () => {
    const {height,width}=useWindowDimensions();
    const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [job, setJob] = useState('');
    const [jobDefault, setJobDefault] = useState('');
    const [nameDefault, setNameDefault] = useState('');
    const [birthday, setBirthday] = useState(new Date());
    const [showingBirthday,setShowingBirthday] = useState('');
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

    const formatDate = (rawDate:Date) => {
        let date = new Date(rawDate);
        return `${date.getFullYear()}/${String(date.getMonth()+1).padStart(2,'0')}/${String(date.getDate()).padStart(2,'0')}`
    }

    AsyncStorage.getItem('@UserInfo:job').then(data => {
        setJobDefault(String(data));
    })
    AsyncStorage.getItem('@UserInfo:userName').then(data => {
        setNameDefault(String(data));
    })
    AsyncStorage.getItem('@UserInfo:birthShow').then(data => {
        setShowingBirthday(String(data));
    })
    return (
    <TouchableOpacity onPress={() => {
        setIsProfileModalVisible(!isProfileModalVisible);
        }}>
        <View
            style={{
                paddingHorizontal: 20,
                paddingBottom: 20,
                paddingTop: 20,
            }}>
            <Text style={{fontSize: 17, color:"#495057"}}>프로필 설정 변경</Text>
        </View>
        <Modal isVisible={isProfileModalVisible}
        animationIn={"fadeIn"}
        animationInTiming={200}
        animationOut={"fadeOut"}
        animationOutTiming={200}
        onBackdropPress={async ()=>{
            var birth;
            await AsyncStorage.getItem('@UserInfo:birth').then(data => {
                birth=data;
            })
            AsyncStorage.setItem('@UserInfo:birthShow',String(birth));
            setIsProfileModalVisible(!isProfileModalVisible);
        }}
        backdropColor='#CCCCCC'//'#FAFAFA'
        backdropOpacity={0.8}
        style={{
            alignItems:'center'
        }}>
            <View style={{
                backgroundColor:"#FFFFFF",
                width:'85%',
                height:'70%',
                paddingHorizontal: '5%',
                paddingBottom: '5%',
                paddingTop: '5%',
                //justifyContent:'center',
                //alignItems:'center',
                borderRadius:10
            }}>
                <View style={{paddingBottom: 40,
                            }}>
                                <Text style={{fontSize: 17, color:"#495057"}}>프로필 설정 변경</Text>
                </View>
                <ScrollView>
                    <View style={{paddingBottom: 10,
                        }}>
                            <Text style={{fontSize: 17, color:'#666666'}}>이름</Text>
                    </View>
                    <View style={{paddingBottom: 15,
                        }}>
                            <TextInput
                            style={styles.input}
                            defaultValue={nameDefault}
                            placeholderTextColor='#E2E2E2'
                            onChangeText={(text) => setName(text)}
                            />
                    </View>
                    <View style={{paddingBottom: 25,
                        }}>
                            <Text style={{fontSize: 17, color:'#666666'}}>생일</Text>
                    </View>
                    <View style={{paddingBottom: 30,
                        }}>
                        <TouchableOpacity onPress={() => {setIsDatePickerVisible(!isDatePickerVisible)}}
                        style={{paddingBottom:10}}>
                            <Text style={{fontSize:20, paddingHorizontal:10, color: '#666666'}}>{showingBirthday}</Text>
                        </TouchableOpacity>
                        <Divider style={{backgroundColor:'#E2E2E2',width:'100%'}}/>
                        <Divider style={{backgroundColor:'#E2E2E2',width:'100%'}}/>
                        <Divider style={{backgroundColor:'#E2E2E2',width:'100%'}}/>
                    </View>
                    <View style={{paddingBottom: 10,
                    paddingTop:5
                        }}>
                            <Text style={{fontSize: 17, color:'#666666'}}>직업</Text>
                    </View>
                    <View style={{paddingBottom: 20,
                        }}>
                            <TextInput
                            style={styles.input}
                            defaultValue={jobDefault}
                            placeholderTextColor='#E2E2E2'
                            onChangeText={(text) => setJob(text)}
                            />
                    </View>
                </ScrollView>
                <View style={{
                    paddingHorizontal: "5%",
                    paddingBottom: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                    }}>
                <TouchableOpacity onPress={async ()=>{
                    var birth;
                    await AsyncStorage.getItem('@UserInfo:birth').then(data => {
                        birth=data;
                    })
                    AsyncStorage.setItem('@UserInfo:birthShow',String(birth));
                    setIsProfileModalVisible(!isProfileModalVisible);
                    }}>
                    <Text style={{fontSize: 17}}>취소</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={async ()=>{
                    if(job!=='') await AsyncStorage.setItem('@UserInfo:job', job);
                    if(name!=='') await AsyncStorage.setItem('@UserInfo:userName', name);
                    await AsyncStorage.setItem('@UserInfo:birth', showingBirthday);
                    setIsProfileModalVisible(!isProfileModalVisible);
                }}>
                    <Text style={{fontSize: 17}}>저장</Text>
                </TouchableOpacity>
                </View>
            </View>
        </Modal>
        <Modal isVisible={isDatePickerVisible}
            animationIn={"fadeIn"}
            animationInTiming={200}
            animationOut={"fadeOut"}
            animationOutTiming={200}
            onBackdropPress={() => {
                setIsDatePickerVisible(!isDatePickerVisible);
            }}
            backdropColor='#CCCCCC'//'#FAFAFA'
            backdropOpacity={0.8}
            style={{
                alignItems:'center'
            }}>
            <View style={{
                    backgroundColor:"#FFFFFF",
                    width:'90%',
                    height:'45%',
                    paddingHorizontal: 20,
                    paddingBottom: 20,
                    paddingTop: 20,
                    //justifyContent:'center',
                    //alignItems:'center',
                    borderRadius:10
                    }}>
                <View style={{
                    paddingBottom: 20,
                    }}>
                        <Text style={{fontSize: 17, color:"#495057"}}>생일 입력</Text>
                </View>
                <View style={{
                    paddingBottom: 20,
                    alignItems:'center',
                    }}>
                    <DatePicker date={birthday}
                    onDateChange={(changedDate) => {
                        setBirthday(changedDate);}}
                    mode='date'/>
                </View>
                <TouchableOpacity style={{alignItems:'center',}}
                onPress={async ()=>{
                    await AsyncStorage.setItem('@UserInfo:birthShow', formatDate(birthday));
                    setIsDatePickerVisible(!isDatePickerVisible);
                }}>
                    <Text style={{paddingTop: 20, fontSize: 17,}}>저장</Text>
                </TouchableOpacity>  
            </View>     
        </Modal>
    </TouchableOpacity>);
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    view: {
      position: 'relative',
      backgroundColor: '#ffffff',
      justifyContent: 'center',
      alignItems: 'center',
      flex:1,
    },
    title: {
      fontSize: 25,
      fontWeight: 'bold',
      marginBottom: 10,
      paddingBottom: 15
    },
    input: {
      fontSize:20,
      color: '#666666',
      width: '100%',
      padding: 10,
      marginBottom: 20,
      borderBottomWidth:1,
      borderBottomColor:'#E2E2E2',
    },
    button: {
      position: 'absolute',
      bottom: 20,
      width: '90%',
      alignItems: 'center',
      backgroundColor: '#EFEFEF',
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: '#000000',
      fontSize: 16,
    },
  });
  
export default ChangeProfile;