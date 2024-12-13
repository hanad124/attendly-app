import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Header } from '@/components/shared/Header'

export default function Account() {
    
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Account" showBackButton={true} />
      <View style={styles.header}>
        <Text style={styles.title}>Account</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
})