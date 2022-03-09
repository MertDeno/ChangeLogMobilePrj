
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreatedAtComponent from './assets/screens/CreatedAtComponent';
import FilterPage from './assets/screens/FilterPage';
import FirstPage from './assets/screens/FirstPage';
import MaterialNumberPage from './assets/screens/MaterialNumberPage';
import MaterialType from './assets/screens/MaterialType';

export default function App() {
  const { Navigator, Screen } = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <Navigator initialRouteName='FirstPage'>
        <Screen name='FirstPage' component={FirstPage} options={{headerShown:false}}></Screen>
        <Screen name='FilterPage' component={FilterPage} options={{headerShown:false}}></Screen>
        <Screen name='MaterialNumberPage' component={MaterialNumberPage} 
          options={{
            headerShown:true,
            headerTitle:"Filter By: Material Number",
            headerTintColor:"#fff",
            headerStyle:{
              backgroundColor:"rgb(53,74,95)"
            }}}></Screen>
        <Screen name='MaterialType' component={MaterialType} 
          options={{
            headerShown:true,
            headerTitle:"Filter By: Material Type",
            headerTintColor:"#fff",
            headerStyle:{
              backgroundColor:"rgb(53,74,95)"
            }}}></Screen> 
{/*}          <Screen name='CreatedAtComponent' component={CreatedAtComponent} options={{
              headerShown:true,
              headerTitle:"Filter By: Material Type",
              headerTintColor:"#fff",
              headerStyle:{
                backgroundColor:"rgb(53,74,95)"
              }
            }}/>  */}         
      </Navigator>
    </NavigationContainer>
  );
}