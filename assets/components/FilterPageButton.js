import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

function FilterPageButton(props) {
    const [isBtnDisabled, setIsBtnDisabled] = useState(false)
    
    const checkedElements = useSelector(state => state.changeLog.checkedElements)
    const startDateValue = useSelector(state => state.changeLog.createdDateStart)
    const endDateValue = useSelector(state => state.changeLog.createdDateEnd)

    useEffect(() => {
        checkedElements.length > 0 || (startDateValue != '' && endDateValue != '')  ? setIsBtnDisabled(false) : setIsBtnDisabled(true) 
    }, [checkedElements, startDateValue, endDateValue])

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