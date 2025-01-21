import React from 'react'
import { Text, StyleSheet } from 'react-native'

export default function H2({ title, color = "black", align }: { title: string, color?: string,  align?: any }) {
  return (
    <Text style={[styles.text, { color: color ?? '#1C1B1F', textAlign: align ?? 'left' }]}>{title}</Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 32,
    lineHeight: 42,
    fontWeight: '500',

  }
})

