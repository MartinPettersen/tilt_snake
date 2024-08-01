import { RootStackParamList } from "@/utils/types";
import { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type Props = {
    score: number
}

const ScorePage = ({score}: Props) => {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();


  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your Score Was {score}</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Start")} style={{alignItems: "center", justifyContent: "center"}}>
        <Text style={styles.text}>Home</Text>
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
    text: {
      fontWeight: "bold",
      fontSize: 30,
    }
  })

export default ScorePage;
