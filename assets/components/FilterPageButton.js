import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { changeLogActions } from '../redux/change-log-reducers';

function FilterPageButton(props) {
    const [isBtnDisabled, setIsBtnDisabled] = useState(false)

    const checkedElements = useSelector(state => state.changeLog.checkedElements)
    const dispatch = useDispatch()

    useEffect(() => {
        checkedElements.length > 0 ? setIsBtnDisabled(false) : setIsBtnDisabled(true) 
    }, [checkedElements])

    return (
        <View>
            <View style={styles.containerViewStyle}>
                <TouchableOpacity 
                    disabled={isBtnDisabled}
                    onPress={props.onFilter}
                    style={[styles.btnStyle ,{backgroundColor: isBtnDisabled ? "grey" : "rgb(53,74,95)" }]}>
                    <Text style={{ color: "#fff" }}>Filter</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    disabled={isBtnDisabled}
                    onPress={props.onReset}
                    style={[styles.btnStyle ,{backgroundColor: isBtnDisabled ? "grey" : "rgb(53,74,95)" }]}>
                    <Text style={{ color: "#fff" }}>Reset</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    btnStyle: { 
        borderRadius: 20, 
        marginVertical: 25, 
        alignItems: "center", 
        justifyContent: "center", 
        width: 120,
        padding:10 
    },
    containerViewStyle: { 
        flexDirection:"row", 
        justifyContent:"space-evenly", 
        width: "100%"
    }
})

export default FilterPageButton;