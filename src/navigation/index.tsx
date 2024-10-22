import { DarkTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from './types'
import Login from '../screens/Login'

function Navigation() {
  const Stack = createNativeStackNavigator<RootStackParamList>()

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'Login'}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name={'Login'} component={() => <Login/>} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
