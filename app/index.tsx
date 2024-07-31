import Board from "@/components/(board)/Board";
import { Text, View } from "react-native";

import BoardScreen from "@/screens/BoardScreen";
import StartScreen from "@/screens/StartScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function Index() {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Board" component={BoardScreen} />
      </Stack.Navigator>
  );
}
