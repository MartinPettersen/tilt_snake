import { RootStackParamList } from "@/utils/types";
import { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");


const StartPage = () => {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Board")} style={{alignItems: "center", justifyContent: "center"}}>
        <Text>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
})

export default StartPage;
