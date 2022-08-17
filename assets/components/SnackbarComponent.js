import React from 'react';
import { Snackbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { changeLogActions } from '../redux/change-log-reducers';

function SnackbarComponent(props) {
    const isSnackbarVisibe = useSelector(state => state.changeLog.showSnackbar)
    const dispatch = useDispatch()
    const dismissSnackbar = () => dispatch(changeLogActions.setShowSnackbar(false))  

    return (
        <Snackbar
            visible={isSnackbarVisibe}
            style={{backgroundColor: "rgb(53,74,95)", borderRadius:20}}
            onDismiss={dismissSnackbar}
            action={{
                label: 'Close'
            }}>
            {props.children}
        </Snackbar>  
    );
}

export default SnackbarComponent;