import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import reproductor from './Screens/reproductor';
import agregarcancion from './Screens/agregarcancion';
import listacanciones from './Screens/listacanciones';
import detallescancion from './Screens/detallescancion';

const Stack = createStackNavigator();
//
export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Lista cancion" component={listacanciones} />
          <Stack.Screen name="Agregar cancion" component={agregarcancion} />
          <Stack.Screen name="Reproductor" component={reproductor} />
          <Stack.Screen name="Detalles" component={detallescancion} />
        </Stack.Navigator>
      </NavigationContainer>
    );
}