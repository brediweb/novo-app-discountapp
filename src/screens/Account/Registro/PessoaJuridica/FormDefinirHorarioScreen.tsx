import React, { useState } from 'react';
import { View, Text, Button, Alert, Switch, TextInput, StyleSheet, ScrollView } from 'react-native';

const diasDaSemana = [
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
  'Domingo',
];

export default function FormDefinirHorarioScreen() {
  const [diasFechados, setDiasFechados] = useState<{ [key: string]: boolean }>({});
  const [horarios, setHorarios] = useState<{
    [key: string]: {
      abertura?: string;
      fechamentoAlmoco?: string;
      voltaAlmoco?: string;
      fechamento?: string;
    };
  }>({});

  const handleSwitch = (dia: string, value: boolean) => {
    setDiasFechados((prev) => ({ ...prev, [dia]: value }));
  };

  const handleHorarioChange = (dia: string, campo: string, value: string) => {
    setHorarios((prev) => ({
      ...prev,
      [dia]: {
        ...prev[dia],
        [campo]: value,
      },
    }));
  };

  async function onSubmit() {
    // Montar o array final com os dados
    const horariosArray = diasDaSemana.map((dia) => {
      const fechado = diasFechados[dia] || false;
      return {
        dia,
        fechado,
        abertura: horarios[dia]?.abertura || '',
        fechamentoAlmoco: horarios[dia]?.fechamentoAlmoco || '',
        voltaAlmoco: horarios[dia]?.voltaAlmoco || '',
        fechamento: horarios[dia]?.fechamento || '',
      };
    });

    // Validação: todos os campos obrigatórios
    for (const item of horariosArray) {
      if (!item.fechado) {
        if (
          !item.abertura ||
          !item.fechamentoAlmoco ||
          !item.voltaAlmoco ||
          !item.fechamento
        ) {
          Alert.alert('Preencha todos os horários para os dias abertos.');
          return;
        }
      }
    }

    // Aqui você pode enviar os dados formatados para a API ou continuar o fluxo
    Alert.alert('Horários salvos com sucesso!');
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {diasDaSemana.map((dia) => (
        <View key={dia} style={styles.diaContainer}>
          <Text style={styles.diaTitulo}>{dia}</Text>
          <View style={styles.switchContainer}>
            <Text>Fechado</Text>
            <Switch
              value={diasFechados[dia] || false}
              onValueChange={(value) => handleSwitch(dia, value)}
            />
          </View>
          {!diasFechados[dia] && (
            <View style={styles.inputsContainer}>
              <TextInput
                style={styles.input}
                keyboardType='number-pad'
                placeholder="Abertura"
                value={horarios[dia]?.abertura || ''}
                onChangeText={(text) => handleHorarioChange(dia, 'abertura', text)}
              />
              <TextInput
                style={styles.input}
                keyboardType='number-pad'
                placeholder="Fechamento Almoço"
                value={horarios[dia]?.fechamentoAlmoco || ''}
                onChangeText={(text) => handleHorarioChange(dia, 'fechamentoAlmoco', text)}
              />
              <TextInput
                style={styles.input}
                keyboardType='number-pad'
                placeholder="Volta Almoço"
                value={horarios[dia]?.voltaAlmoco || ''}
                onChangeText={(text) => handleHorarioChange(dia, 'voltaAlmoco', text)}
              />
              <TextInput
                style={styles.input}
                keyboardType='number-pad'
                placeholder="Fechamento"
                value={horarios[dia]?.fechamento || ''}
                onChangeText={(text) => handleHorarioChange(dia, 'fechamento', text)}
              />
            </View>
          )}
        </View>
      ))}
      <Button title="Salvar Horários" onPress={onSubmit} />
    </ScrollView>
  );
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
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
