import React, { useState } from 'react'
import { Image, Switch, Text, TouchableOpacity, StyleSheet, View } from 'react-native'
import { colors } from 'src/styles/colors'


export default function CardHorarios({ fechado, valor_default, setValor }: { fechado: boolean, valor_default: boolean, setValor: any }) {
  return (
    <View style={styles.switchContainer}>
      <Text>Aberto</Text>
      <Switch
        style={{
          height: 32,
          marginHorizontal: 4
        }}
        trackColor={{ false: '#767577', true: colors.danger }}
        thumbColor={fechado || false ? '#f4f3f4' : colors.secondary40}
        value={valor_default}
        onValueChange={setValor}
      />
      <Text>Fechado</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  diaContainer: {
    marginBottom: 24,
    backgroundColor: '#f7f7f7',
    borderRadius: 8,
    padding: 12,
  },
  diaTitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputsContainer: {
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
});

