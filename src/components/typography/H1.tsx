import React from 'react'
import { Text, StyleSheet } from 'react-native'

interface PropsH1 {
  title: string,
  color?: string,
  align?: any,
  fontWeight?: any,
  fontsize?: number,
}

export default function H1({ title, color = "black", align, fontWeight, fontsize }: PropsH1) {
  return (
    <Text style={{
      color: color,
      textAlign: align ?? 'left',
      fontWeight: fontWeight ?? "bold",
      fontSize: fontsize ?? 24
    }}>{title}</Text>
  )
}


