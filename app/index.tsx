import Board from "@/components/(board)/Board";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Board />
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
