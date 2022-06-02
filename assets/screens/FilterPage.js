
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Header } from 'react-native-elements';
import { NavigateRow, SectionRow, SettingsPage } from 'react-native-settings-view';
import Icon from 'react-native-vector-icons/Feather';
import { useSelector } from "react-redux"


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
    const selectedItems = useSelector(state => state.changeLog.checkedElements)
    console.log(selectedItems)
    return (
        <SettingsPage backgroundColor="rgb(247,247,247)" scrollEnabled={false}>
            <Header backgroundColor='rgb(53,74,95)' centerComponent={{ text: "Filter Page", style: { color: "#fff", marginTop: 5, fontSize: 15 } }}
                rightComponent={
                    <TouchableOpacity>
                        <Icon name='menu' color={"#fff"} size={25}></Icon>
                    </TouchableOpacity>
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
            <View style={{ alignContent: "center", alignItems: "center" }}>
                <TouchableOpacity style={{ borderRadius: 20, marginVertical: 25, alignItems: "center", justifyContent: "center", width: 100, height: 30, backgroundColor: "rgb(53,74,95)" }}>
                    <Text style={{ color: "#fff" }}>Filter</Text>
                </TouchableOpacity>
            </View>
        </SettingsPage>
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