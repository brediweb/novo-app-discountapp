import FilledButton from '@components/buttons/FilledButton';
import CardHorarios from '@components/forms/CardHorarios';
import MainLayoutAutenticadoSemScroll from '@components/layout/MainLayoutAutenticadoSemScroll';
import { useNavigate } from '@hooks/useNavigate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import { useGlobal } from 'src/context/GlobalContextProvider';
import { api } from 'src/service/api';
import { colors } from 'src/styles/colors';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const diasDaSemana = [
  "segunda", "terca", "quarta", "quinta", "sexta", "sabado", "domingo"
];

type DiaHorario = {
  fechado: boolean;
  abertura: string;
  almocoSaida: string;
  almocoVolta: string;
  fechamento: string;
};

type HorariosState = Record<string, DiaHorario>;

export default function FormAtualizarHorarioScreen() {
  const { navigate } = useNavigate();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [horarios, setHorarios] = useState<HorariosState>(() =>
    diasDaSemana.reduce((acc, dia) => {
      acc[dia] = { fechado: false, abertura: "", almocoSaida: "", almocoVolta: "", fechamento: "" };
      return acc;
    }, {} as HorariosState)
  );

  // Controle único do relógio
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [currentDia, setCurrentDia] = useState<string | null>(null);
  const [currentField, setCurrentField] = useState<keyof DiaHorario | null>(null);

  function showDatePicker(dia: string, field: keyof DiaHorario) {
    setCurrentDia(dia);
    setCurrentField(field);
    setPickerVisible(true);
  }

  function hideDatePicker() {
    setPickerVisible(false);
  }

  function handleConfirm(date: Date) {
    if (currentDia && currentField) {
      const time = date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      });
      updateHorario(currentDia, currentField, time);
    }
    hideDatePicker();
  }

  function updateHorario(dia: string, field: keyof DiaHorario, value: string | boolean) {
    setHorarios(prev => ({
      ...prev,
      [dia]: { ...prev[dia], [field]: value }
    }));
  }

  async function postSalvaHorarios() {
    setLoading(true);
    const jsonValue = await AsyncStorage.getItem('infos-user');
    if (!jsonValue) return;

    const newJson = JSON.parse(jsonValue);

    try {
      // Estado -> API
      const payload = {
        horarios: [
          diasDaSemana.reduce((acc, dia) => {
            acc[dia] = {
              fechado: horarios[dia].fechado,
              horario_abertura: horarios[dia].abertura,
              horario_fechamento_almoco: horarios[dia].almocoSaida,
              horario_abertura_almoco: horarios[dia].almocoVolta,
              horario_fechamento: horarios[dia].fechamento,
            };
            return acc;
          }, {} as any),
        ],
      };

      const response = await api.post(`/salva/horarios-funcionamento`, payload, {
        headers: { Authorization: `Bearer ${newJson.token}` },
      });

      if (response.status === 200) {
        Toast.show({ type: 'success', text1: 'Horários atualizados com sucesso' });
        navigate('ClientePerfilScreen');
      }
    } catch (error: any) {
      console.error('Erro ao salvar horários: ', error);
      Toast.show({ type: 'error', text1: 'Erro ao salvar horários' });
    }
    setLoading(false);
  }

  async function getHorarios() {
    const jsonValue = await AsyncStorage.getItem('infos-user');
    if (!jsonValue) return;

    const newJson = JSON.parse(jsonValue);
    try {
      const response = await api.get(`/horarios-funcionamento?user_id=${newJson?.id}`);
      if (response.data.results?.horarios?.length) {
        const apiData = response.data.results.horarios[0];

        // Mapeamento API -> estado interno
        const mapped: HorariosState = diasDaSemana.reduce((acc, dia) => {
          acc[dia] = {
            fechado: apiData[dia]?.fechado ?? false,
            abertura: apiData[dia]?.horario_abertura ?? "",
            almocoSaida: apiData[dia]?.horario_fechamento_almoco ?? "",
            almocoVolta: apiData[dia]?.horario_abertura_almoco ?? "",
            fechamento: apiData[dia]?.horario_fechamento ?? "",
          };
          return acc;
        }, {} as HorariosState);

        setHorarios(mapped);
      }
    } catch (error: any) {
      console.error('GET Horários:', error);
    }
  }

  useEffect(() => { getHorarios(); }, []);
  useEffect(() => { if (isFocused) getHorarios(); }, [isFocused]);

  return (
    <MainLayoutAutenticadoSemScroll loadign={loading} marginTop={72} marginHorizontal={0}>
      <ScrollView contentContainerStyle={styles.container}>
        {diasDaSemana.map((dia) => (
          <View key={dia} style={styles.diaContainer}>
            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
              <Text style={styles.diaTitulo}>{dia.charAt(0).toUpperCase() + dia.slice(1)}</Text>
              <CardHorarios
                fechado={horarios[dia].fechado}
                valor_default={horarios[dia].fechado}
                setValor={(val) => updateHorario(dia, "fechado", val)}
              />
            </View>

            {!horarios[dia].fechado && (
              <View style={styles.inputsContainer}>
                {[
                  { field: "abertura", label: "Horário de Abertura" },
                  { field: "almocoSaida", label: "Horário de Fechamento Almoço" },
                  { field: "almocoVolta", label: "Horário da Volta Almoço" },
                  { field: "fechamento", label: "Horário de Fechamento" },
                ].map(({ field, label }) => (
                  <TouchableOpacity
                    key={field}
                    style={styles.input}
                    onPress={() => showDatePicker(dia, field as keyof DiaHorario)}
                  >
                    <Text style={{ color: horarios[dia][field as keyof DiaHorario] ? colors.dark : colors.gray }}>
                      {horarios[dia][field as keyof DiaHorario] || label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}
        <FilledButton title="Salvar Horários" onPress={postSalvaHorarios} />
      </ScrollView>

      {/* Picker único controlado */}
      <DateTimePickerModal
        mode="time"
        isVisible={isPickerVisible}
        onCancel={hideDatePicker}
        onConfirm={handleConfirm}
        locale="pt-BR"
        timeZoneName="America/Sao_Paulo"
      />
    </MainLayoutAutenticadoSemScroll>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  diaContainer: {
    marginBottom: 24,
    backgroundColor: '#f7f7f7',
    borderRadius: 8,
    padding: 12,
  },
  diaTitulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  inputsContainer: { marginTop: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
});
