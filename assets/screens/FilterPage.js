import React, { useEffect } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Chip, Header } from "react-native-elements";
import {
  BaseRow,
  NavigateRow,
  SectionRow,
  SettingsPage,
} from "react-native-settings-view";
import Icon from "react-native-vector-icons/Feather";

function FilterPage({ navigation }) {
<<<<<<< HEAD
  const materialNumberPage = () => navigation.navigate("MaterialNumberPage");
  const materialTypePage = () => navigation.navigate("MaterialType");
  const createdAtComponent = () => navigation.navigate("CreatedAtComponent");
  const PlantsPage = () => navigation.navigate("PlantsPage");
  const SalesOrganization = () => navigation.navigate("SalesOrganization");

  return (
    <SettingsPage backgroundColor="rgb(247,247,247)" scrollEnabled={false}>
      <Header
        backgroundColor="rgb(53,74,95)"
        centerComponent={{
          text: "Filter Page",
          style: { color: "#fff", marginTop: 5, fontSize: 15 },
        }}
        rightComponent={
          <TouchableOpacity>
            <Icon name="menu" color={"#fff"} size={25}></Icon>
          </TouchableOpacity>
        }
      ></Header>
      <SectionRow>
        <NavigateRow
          onPress={materialNumberPage}
          leftIcon={{ name: "material-ui", type: "material-community" }}
          text="Material Number"
        ></NavigateRow>
      </SectionRow>
      <SectionRow>
        <NavigateRow
          onPress={materialTypePage}
          leftIcon={{ name: "type", type: "feather" }}
          text="Material Type"
        ></NavigateRow>
      </SectionRow>
      <SectionRow>
        <NavigateRow
          leftIcon={{ name: "object-group", type: "font-awesome" }}
          text="Material Group"
        ></NavigateRow>
      </SectionRow>
      <SectionRow>
        <NavigateRow
          onPress={PlantsPage}
          leftIcon={{ name: "factory", type: "material-community" }}
          text="Plants"
        ></NavigateRow>
      </SectionRow>
      <SectionRow>
        <NavigateRow
          onPress={SalesOrganization}
          leftIcon={{ name: "finance", type: "material-community" }}
          text="Sales Organization"
        ></NavigateRow>
      </SectionRow>
      <SectionRow>
        <NavigateRow
          leftIcon={{ name: "date-range", type: "material" }}
          text="Created At"
        ></NavigateRow>
      </SectionRow>
      <SectionRow>
        <NavigateRow
          leftIcon={{ name: "person-sharp", type: "ionicon" }}
          text="Created By"
        ></NavigateRow>
      </SectionRow>
      <SectionRow>
        <NavigateRow
          leftIcon={{ name: "date-range", type: "material" }}
          text="Changed At"
        ></NavigateRow>
      </SectionRow>
      <SectionRow>
        <NavigateRow
          leftIcon={{ name: "person", type: "material" }}
          text="Changed By"
        ></NavigateRow>
      </SectionRow>
      <View style={{ alignContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          style={{
            borderRadius: 20,
            marginVertical: 25,
            alignItems: "center",
            justifyContent: "center",
            width: 100,
            height: 30,
            backgroundColor: "rgb(53,74,95)",
          }}
        >
          <Text style={{ color: "#fff" }}>Filter</Text>
        </TouchableOpacity>
      </View>
    </SettingsPage>
  );
=======
    const materialNumberPage  = () => navigation.navigate("MaterialNumberPage")
    const materialTypePage = () => navigation.navigate("MaterialType")
    const createdAtComponent = () => navigation.navigate("CreatedAtComponent")
    const materialGroupPage = () => navigation.navigate("MaterialGroup")

    return (
        <SettingsPage backgroundColor="rgb(247,247,247)" scrollEnabled={false}>
            <Header backgroundColor='rgb(53,74,95)' centerComponent={{text:"Filter Page", style:{color:"#fff", marginTop:5, fontSize:15}}}
                    rightComponent={
                        <TouchableOpacity>
                            <Icon name='menu' color={"#fff"} size={25}></Icon>
                        </TouchableOpacity>
                    }>
            </Header>
            <SectionRow>
                <NavigateRow onPress={materialNumberPage} leftIcon={{name:"material-ui", type:"material-community"}} text='Material Number'></NavigateRow>
            </SectionRow>
            <SectionRow>
                <NavigateRow onPress={materialTypePage} leftIcon={{name:"type", type:"feather"}} text='Material Type'></NavigateRow>
            </SectionRow>
            <SectionRow>
                <NavigateRow onPress={materialGroupPage} leftIcon={{name:"object-group", type:"font-awesome"}} text='Material Group'></NavigateRow>
            </SectionRow>
            <SectionRow>
                <NavigateRow leftIcon={{name:"factory", type:"material-community"}} text='Plants'></NavigateRow>
            </SectionRow>
            <SectionRow>
                <NavigateRow leftIcon={{name:"finance", type:"material-community"}} text='Sales Organization'></NavigateRow>
            </SectionRow>   
            <SectionRow>
                <NavigateRow onPress={() => alert(1)} leftIcon={{name:"date-range", type:"material"}} text='Created At'></NavigateRow>
            </SectionRow>
            <SectionRow>
                <NavigateRow leftIcon={{name:"person-sharp", type:"ionicon"}} text='Created By'></NavigateRow>
            </SectionRow>                    
            <SectionRow>
                <NavigateRow leftIcon={{name:"date-range", type:"material"}} text='Changed At'></NavigateRow>
            </SectionRow>
            <SectionRow>
                <NavigateRow leftIcon={{name:"person", type:"material"}} text='Changed By'></NavigateRow>
            </SectionRow>
            <View style={{alignContent:"center",alignItems:"center"}}>
                <TouchableOpacity style={{borderRadius:20, marginVertical:25, alignItems:"center", justifyContent:"center",  width:100, height:30, backgroundColor:"rgb(53,74,95)"}}>
                    <Text style={{color:"#fff"}}>Filter</Text>
                </TouchableOpacity>
            </View>                                                          
        </SettingsPage>
    );
>>>>>>> 950d9759067ff7e0f2086543a8a6c0e3647a08f0
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(247,247,247)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FilterPage;
