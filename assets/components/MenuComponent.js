import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Divider, Menu } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';

function MenuComponent(props) {
    const [visible, setVisible] = useState(false)

    const openMenu = () => setVisible(true)
    const closeMenu = () => setVisible(false)

    const menuAnchor = 
        <TouchableOpacity onPress={openMenu}>
            <Icon name='menu' color={"#fff"} size={25}></Icon>
        </TouchableOpacity>

    return (
        <Menu visible={visible} onDismiss={closeMenu} anchor={menuAnchor} contentStyle={[styles.menuContentStyle, styles.shadowProp]}>
            <Menu.Item onPress={() => {}} title="User Profile" titleStyle={{color:"white"}}/>
            <Divider />
            <Menu.Item onPress={() => {}} title="Logout" titleStyle={{color:"white"}}/>
        </Menu>
    );
}

const styles = StyleSheet.create({
    menuContentStyle:{
        backgroundColor: "rgb(53,74,95)"
    },
    shadowProp:{
        shadowColor: '#000',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.5,
        shadowRadius: 3,        
    }
})

export default MenuComponent;