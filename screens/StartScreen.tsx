import StartPage from '@/components/(start)/StartPage'
import React from 'react'
import { View, StyleSheet } from 'react-native'

const StartScreen = () => {
  return (
    <View style={styles.container}>
      <StartPage />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default StartScreen