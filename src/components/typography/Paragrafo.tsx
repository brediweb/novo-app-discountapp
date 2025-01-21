import React from 'react'
import { Text, StyleSheet } from 'react-native'

export default function Paragrafo({ title, color = "#000", align }: { title: string, color?: string, align?: any }) {
  return (
    <Text style={[styles.text, { color: color ?? '#0000', textAlign: align ?? 'left' }]}>{title}</Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '400',
  }
})

