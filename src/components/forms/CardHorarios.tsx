import React from 'react';
import { Text, Switch, StyleSheet, View } from 'react-native';
import { colors } from 'src/styles/colors';

export default function CardHorarios({
  fechado,
  setValor,
  valor_default
}: { fechado?: boolean, setValor: (val: boolean) => void, valor_default: boolean }) {

  return (
    <View style={styles.switchContainer}>
      <Text>Aberto</Text>
      <Switch
        style={{ height: 32, marginHorizontal: 4 }}
        trackColor={{ false: '#767577', true: colors.danger }}
        thumbColor={(fechado ?? valor_default) ? '#f4f3f4' : colors.secondary40}
        value={fechado ?? valor_default}
        onValueChange={setValor}
      />
      <Text>Fechado</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
