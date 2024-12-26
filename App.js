import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainNavigation from './src/navigations/MainNavigation';
import PostDetailsScreen from './src/screens/PostDetailsScreen';
//import AddCommentsScreen from './src/screens/AddCommentsScreen';
import AddPostsScreen from './src/screens/AddPostsScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
const Stack = createStackNavigator();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MainNavigation" component={MainNavigation} options={{ headerShown: false }} />
        <Stack.Screen name="PostDetailsScreen" component={PostDetailsScreen} options={{ headerShown: false }}  />
        {/* <Stack.Screen name="AddCommentsScreen" component={AddCommentsScreen} options={{ headerShown: false }} /> */}
        <Stack.Screen name="AddPostsScreen" component={AddPostsScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider> 
    </QueryClientProvider>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
