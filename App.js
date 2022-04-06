
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreatedAtPage from './assets/screens/CreatedAtPage';
import CreatedByPage from './assets/screens/CreatedByPage';
import FilterPage from './assets/screens/FilterPage';
import FirstPage from './assets/screens/FirstPage';
import MaterialGroupPage from './assets/screens/MaterialGroupPage';
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
            }}}/> 
          <Screen name='CreatedAtPage' component={CreatedAtPage} options={{
              headerShown:true,
              headerTitle:"Filter By: Created At",
              headerTintColor:"#fff",
              headerStyle:{
                backgroundColor:"rgb(53,74,95)"
              }
            }}/>    
          <Screen name='CreatedBy' component={CreatedByPage} options={{
              headerShown:true,
              headerTitle:"Filter By: Created By",
              headerTintColor:"#fff",
              headerStyle:{
                backgroundColor:"rgb(53,74,95)"
              }
            }}/>                
          <Screen name='MaterialGroup' component={MaterialGroupPage} options={{
            headerShown:true,
            headerTitle:"Filter By: Material Group",
            headerTintColor:"#fff",
            headerStyle:{
              backgroundColor:"rgb(53,74,95)"
            }}}/>         
      </Navigator>
    </NavigationContainer>
  );
}