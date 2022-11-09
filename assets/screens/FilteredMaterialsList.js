import React, { useEffect, useMemo, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, ActivityIndicator, Pressable, Modal, StyleSheet, Linking } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import SnackbarComponent from '../components/SnackbarComponent';
import  Icon  from 'react-native-vector-icons/Ionicons';
import  IconUser  from 'react-native-vector-icons/AntDesign';
import moment from 'moment'; 
import { changeLogActions } from '../redux/change-log-reducers';
import { Header } from 'react-native-elements';
import { Divider } from 'react-native-paper';

function FilteredMaterialsList({navigation}) {
    const checkedElements = useSelector(state => state.changeLog.checkedElements)
    let timer
    
    const [visible, setVisible] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [dataFetched, setDataFetched] = useState(false)
    const [materials, setMaterials] = useState([])  
    const [modalData, setModalData] = useState([])  

    const renderItem = ({ item }) => (
        <View style={{borderRadius: 20, borderColor:"rgb(53,74,95)", borderWidth:1, margin:3}}>
            <TouchableOpacity style={{padding:10}}>
                <View style={{marginBottom:10}}>
                    <Text style={{fontSize:20}}>{item.Matnr}</Text>
                </View>
                <View>
                    <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                        <Pressable style={{flexDirection:"column", marginBottom:15}} onPress={() => clickedUser(item.Ernam)}>
                            <Text>Created By: <Text style={{color:"blue"}}> {item.Ernam}</Text> </Text> 
                        </Pressable>
                        <View>
                            <Text>Created On: {moment(item.Ersda).format('DD.MM.YYYY')}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                        <Pressable style={{flexDirection:"column"}} onPress={() => clickedUser(item.Aenam)}>
                            <Text>Changed By: <Text style={{color:"blue"}}>{item.Aenam}</Text></Text> 
                        </Pressable>
                        <View>
                            <Text>Changed On: {moment(item.Laeda).format('DD.MM.YYYY')}</Text> 
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>        
    )
 
    const memoizedValue = useMemo(() => renderItem, [materials])

    const dispatch = useDispatch()

    var baseURL = Platform.OS === "android" ? ("http://10.0.2.2:8000/EtMaterialListSet") : ("https://be96-24-133-107-93.eu.ngrok.io/EtMaterialListSet")
    var baseUserURL = Platform.OS === "android" ? ("http://10.0.2.2:8000/EtPersonalsSet") : ("https://be96-24-133-107-93.eu.ngrok.io/EtPersonalsSet")

     const fetchApi = async() => {
        let array = []
        checkedElements.forEach(element => {
            array.push({sPath: element.sPath, operator: element.operator, oValue1: `'${element.oValue1}'`, oValue2: `'${element.oValue2}'`})
        });

        try {
            const response = await fetch(baseURL, {
                method: "POST",
                body: JSON.stringify({
                    array: array
                }),
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
            })

            const data = await response.json()
            data.length > 0 && setVisible(true)
            data.length > 0 && setMaterials(data)
            setDataFetched(true)
            dispatch(changeLogActions.setFilteredNumbersOfMaterial(data.length))
        } catch (error) {
            console.log(error)
        }
    } 

    const clickedUser = async(userName) => {
        const response = await fetch(baseUserURL, {
            method: "POST",
            body: JSON.stringify({
                IvPerson: 'IvPerson',
                userName: userName
            }),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
        })
        const userData = await response.json()
        setModalData(userData)
        setModalVisible(true)
    }

    useEffect(() => {
        fetchApi()
        timer = setTimeout(() => {
        }, 100)

        return () => {
            clearTimeout(timer)
        }
    }, [])

    return (
         (dataFetched ?            
            <>
                <Header 
                    backgroundColor='rgb(53,74,95)'
                    centerComponent={{text: `Materials (${materials.length})`, style: { color: "#fff", marginTop: 5, fontSize: 20 }}}
                    leftComponent={
                        <Icon name='chevron-back-sharp' style={{marginTop: 5, color:"#fff"}} size={25} onPress={() => navigation.navigate("FilterPage")}/>
                }/>
                <View style={{flex:1, height:"100%", flexDirection: "column", justifyContent: "space-between"}}>
                    <FlatList 
                        data={materials} 
                        keyExtractor={(item, index) => item+" "+index}
                        alwaysBounceHorizontal={false} 
                        renderItem={memoizedValue}/>
                        {visible && 
                            <SnackbarComponent>
                                <Text style={{color:"white"}}>{'Successfully filtered.'}</Text>
                            </SnackbarComponent>   
                        }
                        {!visible && 
                            <SnackbarComponent>
                                <Text style={{color:"white"}}>{'Not Found.'}</Text>
                            </SnackbarComponent>   
                        }
                        {modalVisible && 
                            <Modal 
                                visible={modalVisible}
                                animationType='slide'
                                presentationStyle='pageSheet'
/*                                 statusBarTranslucent={true} */
                                style={{marginTop:20}}
                                collapsable>
                                <View>
                                    <View style={{alignItems:"center", padding:15}}>
                                        <Text style={{fontSize:20}}>User Profile for {modalData[0].NameText}</Text>
                                    </View>
                                    <Divider style={{borderWidth:0.5}} />
                                    <View style={{flexDirection: "row"}}>
                                        <IconUser style={{margin: 10, borderWidth:1}} name='user' size={70}/>
                                        <View style={{flexDirection: "column"}}>
                                            <Text style={{margin:10, fontSize:20}}>{modalData[0].IvPerson}</Text>
                                            <Text style={{margin:10, fontSize:15}}>{modalData[0].NameText}</Text>
                                        </View>
                                    </View>
                                    <View style={{marginTop:10}}>
                                        <Text style={{fontSize:20, marginLeft:10}}>Communication</Text>
                                        <View style={{marginLeft:10, marginTop:20}}>
                                            <Text>Work Telephone No:</Text>
                                            <Text>{modalData[0].TelNumber}</Text>
                                        </View>
                                        <View style={{marginLeft:10, marginTop:20}}>
                                            <Text>E-mail Address:</Text>
                                            <Pressable onPress={() => Linking.openURL(`mailto:${modalData[0].SmtpAddr}`)}>
                                                <Text style={{color: "blue"}}>{modalData[0].SmtpAddr}</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                    <View style={{marginTop:30}}>
                                        <Text style={{fontSize:20, marginLeft:10}}>Organizational Information</Text>
                                        <View style={{marginLeft:10, marginTop:20}}>
                                            <Text>Company:</Text>
                                            <Text>{modalData[0].Name1}</Text>
                                        </View>
                                        <View style={{marginLeft:10, marginTop:20}}>
                                            <Text>Function:</Text>
                                            <Text>{modalData[0].Function}</Text>
                                        </View>
                                        <View style={{marginLeft:10, marginTop:20}}>
                                            <Text>Department:</Text>
                                            <Text>{modalData[0].Department}</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Pressable style={{alignSelf:"center", margin:50, borderRadius: 20,padding: 10, elevation: 2, backgroundColor:"rgb(53,74,95)"}} onPress={() => setModalVisible(false)}>
                                            <Text style={{color:"#fff"}}>Hide</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </Modal>
                        }
                </View>
            </>
            :
            <ActivityIndicator animating={true} size={"large"} color="rgb(53,74,95)" style={styles.activityIndicatorStyle} />        
        )
    );
}

const styles = StyleSheet.create({
    activityIndicatorStyle: {
        alignSelf:"center", 
        display:"flex", 
        flex:1
    },
    centeredView: {
        flex:1, 
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22        
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
})

export default FilteredMaterialsList;