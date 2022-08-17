import { useState } from 'react';
import { Dimensions, StyleSheet, Text, View  } from 'react-native';
import { Header } from 'react-native-elements';
import { Provider, Snackbar } from 'react-native-paper';
import { NavigateRow, SectionRow, SettingsPage } from 'react-native-settings-view';
import { useDispatch, useSelector } from 'react-redux';
import FilterPageButton from '../components/FilterPageButton';
import MenuComponent from '../components/MenuComponent';
import SnackbarComponent from '../components/SnackbarComponent';
import { changeLogActions } from '../redux/change-log-reducers';

function FilterPage({ navigation }) {
    const materialNumberPage = () => navigation.navigate("MaterialNumberPage")
    const materialTypePage = () => navigation.navigate("MaterialTypePage")
    const materialGroupPage = () => navigation.navigate("MaterialGroupPage")
    const createdAtPage = () => navigation.navigate("CreatedAtPage")
    const createdByPage = () => navigation.navigate("CreatedByPage")
    const PlantsPage = () => navigation.navigate("PlantsPage");
    const SalesOrganizationPage = () => navigation.navigate("SalesOrganizationPage");
    const changedAtPage = () => navigation.navigate("ChangedAtPage");
    const changedByPage = () => navigation.navigate("ChangedByPage");

    const screenHeight = Dimensions.get('window').height;
    const [filterClicked, setFilterClicked] = useState(null)

    const openSnackbar = () => dispatch(changeLogActions.setShowSnackbar(true))
    const navigateToFilteredMaterials = () => navigation.navigate("FilteredMaterialsList")

    const dispatch = useDispatch()  

    const onReset = () => {
        setFilterClicked(false)
        dispatch(changeLogActions.resetFilterList())
        openSnackbar()
    }

    const onFilter = () => {
        setFilterClicked(true)
        openSnackbar()
        navigateToFilteredMaterials()
        dispatch(changeLogActions.resetFilterList())
    }

    return (
        <Provider>
            <SettingsPage style={{height: screenHeight}} backgroundColor="rgb(247,247,247)" scrollEnabled={false}>
                <Header backgroundColor='rgb(53,74,95)' centerComponent={{ text: "Filter Page", style: { color: "#fff", marginTop: 5, fontSize: 15 } }}
                    rightComponent={
                        <MenuComponent />
                    }>
                </Header>
                <SectionRow>
                    <NavigateRow onPress={materialNumberPage} leftIcon={{ name: "material-ui", type: "material-community" }} text='Material Number'></NavigateRow>
                </SectionRow>
                <SectionRow>
                    <NavigateRow onPress={materialTypePage} leftIcon={{ name: "type", type: "feather" }} text='Material Type'></NavigateRow>
                </SectionRow>
                <SectionRow>
                    <NavigateRow onPress={materialGroupPage} leftIcon={{ name: "object-group", type: "font-awesome" }} text='Material Group'></NavigateRow>
                </SectionRow>
                <SectionRow>
                    <NavigateRow onPress={PlantsPage} leftIcon={{ name: "factory", type: "material-community" }} text='Plants'></NavigateRow>
                </SectionRow>
                <SectionRow>
                    <NavigateRow onPress={SalesOrganizationPage} leftIcon={{ name: "finance", type: "material-community" }} text='Sales Organization'></NavigateRow>
                </SectionRow>
                <SectionRow>
                    <NavigateRow onPress={createdAtPage} leftIcon={{ name: "date-range", type: "material" }} text='Created At'></NavigateRow>
                </SectionRow>
                <SectionRow>
                    <NavigateRow onPress={createdByPage} leftIcon={{ name: "person-sharp", type: "ionicon" }} text='Created By'></NavigateRow>
                </SectionRow>
                <SectionRow>
                    <NavigateRow onPress={changedAtPage} leftIcon={{ name: "date-range", type: "material" }} text='Changed At'></NavigateRow>
                </SectionRow>
                <SectionRow>
                    <NavigateRow onPress={changedByPage} leftIcon={{ name: "person", type: "material" }} text='Changed By'></NavigateRow>
                </SectionRow>
            </SettingsPage>
            <View style={{flexDirection: "column-reverse", justifyContent: "flex-end", height:"28%"}}>
                <FilterPageButton onFilter={onFilter} onReset={onReset}/>   
                {!filterClicked && 
                    <SnackbarComponent>                    
                        <Text style={{color:"white"}}>Successfully resetted.</Text>
                    </SnackbarComponent>                          
                }
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgb(247,247,247)",
        justifyContent: "center",
        alignItems: "center",

    }
})

export default FilterPage;