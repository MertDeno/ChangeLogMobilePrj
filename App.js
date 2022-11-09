import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialNumberScreenStyle from "./assets/css/MaterialNumberScreenStyle";
import MaterialTypeScreenStyle from "./assets/css/MaterialTypeScreenStyle";
import PlantsScreenStyle from "./assets/css/PlantsScreenStyle"
import SalesOrganizationStyle from "./assets/css/SalesOrganizationScreenStyle";
import CreatedAtPageStyle from "./assets/css/CreatedAtPageStyle";
import CreatedByPageStyle from "./assets/css/CreatedByPageStyle";
import MaterialGroupPageStyle from "./assets/css/MaterialGroupPageStyle";
import CreatedAtPage from "./assets/screens/CreatedAtPage";
import CreatedByPage from "./assets/screens/CreatedByPage";
import FilterPage from "./assets/screens/FilterPage";
import FirstPage from "./assets/screens/FirstPage";
import MaterialGroupPage from "./assets/screens/MaterialGroupPage";
import MaterialNumberPage from "./assets/screens/MaterialNumberPage";
import MaterialType from "./assets/screens/MaterialType";
import PlantsPage from "./assets/screens/PlantsPage";
import SalesOrganizationPage from "./assets/screens/SalesOrganizationPage";
import ChangedAtPageStyle from "./assets/css/ChangedAtScreenStyle";
import ChangedByPageStyle from "./assets/css/ChangedByPageStyle";
import ChangedAtPage from "./assets/screens/ChangedAtPage";
import ChangedByPage from "./assets/screens/ChangedByPage";
import FilteredMaterialsList from "./assets/screens/FilteredMaterialsList";
import { Provider } from "react-redux"
import store from "./assets/redux/index.js";

const Root = () => {
  const { Navigator, Screen } = createNativeStackNavigator();
  
  return(
      <NavigationContainer>
        <Navigator initialRouteName="FirstPage" screenOptions={{headerShown:false}}>
          <Screen name="FirstPage" component={FirstPage} options={{ headerShown: false }}/>
          <Screen name="FilterPage" component={FilterPage} options={{ headerShown: false }}/>
          <Screen name="MaterialNumberPage" component={MaterialNumberPage} options={MaterialNumberScreenStyle}/>
          <Screen name="MaterialTypePage" component={MaterialType} options={MaterialTypeScreenStyle} />
          <Screen name="MaterialGroupPage" component={MaterialGroupPage} options={MaterialGroupPageStyle} />
          <Screen name="PlantsPage" component={PlantsPage} options={PlantsScreenStyle} />
          <Screen name="SalesOrganizationPage" component={SalesOrganizationPage} options={SalesOrganizationStyle} />
          <Screen name="CreatedAtPage" component={CreatedAtPage} options={CreatedAtPageStyle} />
          <Screen name="CreatedByPage" component={CreatedByPage} options={CreatedByPageStyle} />
          <Screen name="ChangedAtPage" component={ChangedAtPage} options={ChangedAtPageStyle} />
          <Screen name="ChangedByPage" component={ChangedByPage} options={ChangedByPageStyle} />
          <Screen name="FilteredMaterialsList" 
            component={FilteredMaterialsList} 
            options={{headerShown: false, headerStyle:{backgroundColor: "red"}}}/>
        </Navigator>
      </NavigationContainer>
  )
}


export default function App() {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}
