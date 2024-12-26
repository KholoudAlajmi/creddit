import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";

const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator
    screenOptions={{
        headerShown: false,     
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
            headerShown: false,   
          }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;