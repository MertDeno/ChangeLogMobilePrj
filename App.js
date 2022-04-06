<<<<<<< HEAD
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreatedAtComponent from "./assets/screens/CreatedAtComponent";
import FilterPage from "./assets/screens/FilterPage";
import FirstPage from "./assets/screens/FirstPage";
import MaterialNumberPage from "./assets/screens/MaterialNumberPage";
import MaterialType from "./assets/screens/MaterialType";
import PlantsPage from "./assets/screens/PlantsPage";
import SalesOrganization from "./assets/screens/SalesOrganization";
=======

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreatedAtComponent from './assets/screens/CreatedAtComponent';
import FilterPage from './assets/screens/FilterPage';
import FirstPage from './assets/screens/FirstPage';
import MaterialGroupPage from './assets/screens/MaterialGroupPage';
import MaterialNumberPage from './assets/screens/MaterialNumberPage';
import MaterialType from './assets/screens/MaterialType';
>>>>>>> 950d9759067ff7e0f2086543a8a6c0e3647a08f0


export default function App() {
  const { Navigator, Screen } = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Navigator initialRouteName="FirstPage">
        <Screen
          name="FirstPage"
          component={FirstPage}
          options={{ headerShown: false }}
        ></Screen>
        <Screen
          name="FilterPage"
          component={FilterPage}
          options={{ headerShown: false }}
        ></Screen>
        <Screen
          name="MaterialNumberPage"
          component={MaterialNumberPage}
          options={{
            headerShown: true,
            headerTitle: "Filter By: Material Number",
            headerTintColor: "#fff",
            headerStyle: {
              backgroundColor: "rgb(53,74,95)",
            },
          }}
        ></Screen>
        <Screen
          name="MaterialType"
          component={MaterialType}
          options={{
<<<<<<< HEAD
            headerShown: true,
            headerTitle: "Filter By: Material Type",
            headerTintColor: "#fff",
            headerStyle: {
              backgroundColor: "rgb(53,74,95)",
            },
          }}
        ></Screen>
        <Screen
          name="PlantsPage"
          component={PlantsPage}
          options={{
            headerShown: true,
            headerTitle: "Filter By: Plant",
            headerTintColor: "#fff",
            headerStyle: {
              backgroundColor: "rgb(53,74,95)",
            },
          }}
        ></Screen>
        <Screen
          name="SalesOrganization"
          component={SalesOrganization}
          options={{
            headerShown: true,
            headerTitle: "Filter By: Sales Organization",
            headerTintColor: "#fff",
            headerStyle: {
              backgroundColor: "rgb(53,74,95)",
            },
          }}
        ></Screen>
        {/*}          <Screen name='CreatedAtComponent' component={CreatedAtComponent} options={{
=======
            headerShown:true,
            headerTitle:"Filter By: Material Type",
            headerTintColor:"#fff",
            headerStyle:{
              backgroundColor:"rgb(53,74,95)"
            }}}/> 
          <Screen name='CreatedAtComponent' component={CreatedAtComponent} options={{
>>>>>>> 950d9759067ff7e0f2086543a8a6c0e3647a08f0
              headerShown:true,
              headerTitle:"Filter By: Material Type",
              headerTintColor:"#fff",
              headerStyle:{
                backgroundColor:"rgb(53,74,95)"
              }
<<<<<<< HEAD
            }}/>  */}
=======
            }}/>    
          <Screen name='MaterialGroup' component={MaterialGroupPage} options={{
            headerShown:true,
            headerTitle:"Filter By: Material Group",
            headerTintColor:"#fff",
            headerStyle:{
              backgroundColor:"rgb(53,74,95)"
            }}}/>         
>>>>>>> 950d9759067ff7e0f2086543a8a6c0e3647a08f0
      </Navigator>
    </NavigationContainer>
  );
}
