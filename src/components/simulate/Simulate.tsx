import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useGlobal } from '../../context/GlobalContextProvider'
import useShowSimulator from '../../stores/useShowSimulator'

export default function Simulate() {

  return (
    <View style={styles.container}>
      
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 88,
    right: 0,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  successButton: {
    backgroundColor: '#106a10ba',
    paddingVertical: 4,
    borderTopLeftRadius: 8,
    paddingHorizontal: 8,
  },
  errorButton: {
    backgroundColor: '#ff000072',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderBottomLeftRadius: 8,
  }
})
