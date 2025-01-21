import React from 'react'
import { ImageBackground, View, StyleSheet, TouchableOpacity } from 'react-native'


export default function CardHome({ title, image, route, navigation }: { title: string, image: any, route: string, navigation: any }) {
  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate(route)}>
      <ImageBackground source={image} resizeMode="cover" style={{ flex: 1 }}>
      </ImageBackground>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  container: {
    width: 160,
    height: 160,
    marginTop: 16,
  }
})
