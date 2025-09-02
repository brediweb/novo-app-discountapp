import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { colors } from '../../styles/colors';

interface PropsFilledButton {
  color?: any,
  title: string,
  onPress: () => void,
  backgroundColor?: any,
  disabled?: any,
  border?: boolean
  borderColor?: any
}

export default function FilledButton({ title, onPress, backgroundColor, color, disabled, border, borderColor }: PropsFilledButton) {
  return (
    <>{disabled ?

      <TouchableOpacity
        onPress={() => { }}
        style={[styles.container, { backgroundColor: '#F4EFF4' }]}
      >
        <Text
          style={[styles.text, { color: '#868687' }]}>{title}</Text>
      </TouchableOpacity>
      :
      <TouchableOpacity
        className='px-6'
        onPress={onPress}
        style={[
          styles.container,
          backgroundColor && { backgroundColor: backgroundColor },
          border && { borderWidth: 2, borderColor: borderColor ?? colors.primary40 }
        ]}>
        <Text
          style={[
            styles.text,
            color && { color: color },
          ]}>{title}</Text>
      </TouchableOpacity>
    }
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 32,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'center',
    backgroundColor: colors.primary40
  },
  text: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
