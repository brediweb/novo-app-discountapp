import FilledButton from '@components/buttons/FilledButton';
import CardHorarios from '@components/forms/CardHorarios';
import HeaderPrimary from '@components/header/HeaderPrimary';
import MainLayoutAutenticadoSemScroll from '@components/layout/MainLayoutAutenticadoSemScroll';
import H1 from '@components/typography/H1';
import { useNavigate } from '@hooks/useNavigate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, Switch, TextInput, StyleSheet, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import { useGlobal } from 'src/context/GlobalContextProvider';
import { api } from 'src/service/api';
import { colors } from 'src/styles/colors';

const diasDaSemana = [
  "segunda",
  "terca",
  "quarta",
  "quinta",
  "sexta",
  "sabado",
  "domingo",
];

interface propsHorario {
  fechado: boolean,
  horario_abertura: string
  horario_fechamento_almoco: string
  horario_abertura_almoco: string
  horario_fechamento: string
}

export default function FormAtualizarHorarioScreen() {
  const { navigate } = useNavigate()
  const isFocused = useIsFocused()
  const [loading, setLoading] = useState(false)
  const { setSenhaUser, senhaUser, setTelefoneDigitado, setTipoUser } = useGlobal()
  const [diasFechados, setDiasFechados] = useState<{ [key: string]: boolean }>({});
  const [token, setToken] = useState('')
  const [horarios, setHorarios] = useState<any>([]);
  const [segunda1, setSegunda1] = useState(horarios[0]?.segunda?.fechado?.horario_abertura ?? '')
  const [segunda2, setSegunda2] = useState(horarios[0]?.segunda?.fechado?.horario_abertura_almoco ?? '')
  const [segunda3, setSegunda3] = useState(horarios[0]?.segunda?.fechado?.horario_fechamento_almoco ?? '')
  const [segunda4, setSegunda4] = useState(horarios[0]?.segunda?.fechado?.horario_fechamento ?? '')
  const [fechadoSegunda, setFechadoSegunda] = useState(horarios[0]?.segunda?.fechado ?? false)


  const [terca1, setterca1] = useState(horarios[0]?.terca?.fechado?.horario_abertura ?? '')
  const [terca2, setterca2] = useState(horarios[0]?.terca?.fechado?.horario_abertura_almoco ?? '')
  const [terca3, setterca3] = useState(horarios[0]?.terca?.fechado?.horario_fechamento_almoco ?? '')
  const [terca4, setterca4] = useState(horarios[0]?.terca?.fechado?.horario_fechamento ?? '')
  const [fechadoTerca, setFechadoTerca] = useState(horarios[0]?.terca?.fechado ?? false)


  const [quarta1, setquarta1] = useState(horarios[0]?.quarta?.fechado?.horario_abertura ?? '')
  const [quarta2, setquarta2] = useState(horarios[0]?.quarta?.fechado?.horario_abertura_almoco ?? '')
  const [quarta3, setquarta3] = useState(horarios[0]?.quarta?.fechado?.horario_fechamento_almoco ?? '')
  const [quarta4, setquarta4] = useState(horarios[0]?.quarta?.fechado?.horario_fechamento ?? '')
  const [fechadoquarta, setFechadoquarta] = useState(horarios[0]?.quarta?.fechado ?? false)

  const [quinta1, setquinta1] = useState(horarios[0]?.quinta?.fechado?.horario_abertura ?? '')
  const [quinta2, setquinta2] = useState(horarios[0]?.quinta?.fechado?.horario_abertura_almoco ?? '')
  const [quinta3, setquinta3] = useState(horarios[0]?.quinta?.fechado?.horario_fechamento_almoco ?? '')
  const [quinta4, setquinta4] = useState(horarios[0]?.quinta?.fechado?.horario_fechamento ?? '')
  const [fechadoquinta, setFechadoquinta] = useState(horarios[0]?.quinta?.fechado ?? false)

  const [sexta1, setsexta1] = useState(horarios[0]?.sexta?.fechado?.horario_abertura ?? '')
  const [sexta2, setsexta2] = useState(horarios[0]?.sexta?.fechado?.horario_abertura_almoco ?? '')
  const [sexta3, setsexta3] = useState(horarios[0]?.sexta?.fechado?.horario_fechamento_almoco ?? '')
  const [sexta4, setsexta4] = useState(horarios[0]?.sexta?.fechado?.horario_fechamento ?? '')
  const [fechadosexta, setFechadosexta] = useState(horarios[0]?.sexta?.fechado ?? false)

  const [sabado1, setsabado1] = useState(horarios[0]?.sabado?.fechado?.horario_abertura ?? '')
  const [sabado2, setsabado2] = useState(horarios[0]?.sabado?.fechado?.horario_abertura_almoco ?? '')
  const [sabado3, setsabado3] = useState(horarios[0]?.sabado?.fechado?.horario_fechamento_almoco ?? '')
  const [sabado4, setsabado4] = useState(horarios[0]?.sabado?.fechado?.horario_fechamento ?? '')
  const [fechadosabado, setFechadosabado] = useState(horarios[0]?.sabado?.fechado ?? false)

  const [domingo1, setdomingo1] = useState(horarios[0]?.domingo?.fechado?.horario_abertura ?? '')
  const [domingo2, setdomingo2] = useState(horarios[0]?.domingo?.fechado?.horario_abertura_almoco ?? '')
  const [domingo3, setdomingo3] = useState(horarios[0]?.domingo?.fechado?.horario_fechamento_almoco ?? '')
  const [domingo4, setdomingo4] = useState(horarios[0]?.domingo?.fechado?.horario_fechamento ?? '')
  const [fechadodomingo, setFechadodomingo] = useState(horarios[0]?.domingo?.fechado ?? false)

  function maskHorario(value: string) {
    // Remove tudo que não é número
    const cleaned = value.replace(/\D/g, '');
    // Limita a 4 dígitos
    const limited = cleaned.slice(0, 4);
    // Aplica a máscara
    if (limited.length <= 2) return limited;
    return `${limited.slice(0, 2)}:${limited.slice(2)}`;
  }

  async function postSalvaHorarios() {
    setLoading(true)
    const jsonValue = await AsyncStorage.getItem('infos-user')
    if (jsonValue) {
      const newJson = JSON.parse(jsonValue)
      console.log('token', newJson.token);

      try {
        // Mapeia os dias para o formato que a API espera
        const payload = {
          horarios: [
            {
              segunda: {
                fechado: fechadoSegunda,
                horario_abertura: segunda1,
                horario_fechamento_almoco: segunda2,
                horario_abertura_almoco: segunda3,
                horario_fechamento: segunda4,
              },
              terca: {
                fechado: fechadoTerca,
                horario_abertura: terca1,
                horario_fechamento_almoco: terca2,
                horario_abertura_almoco: terca3,
                horario_fechamento: terca4,
              },
              quarta: {
                fechado: fechadoquarta,
                horario_abertura: quarta1,
                horario_fechamento_almoco: quarta2,
                horario_abertura_almoco: quarta3,
                horario_fechamento: quarta4,
              },
              quinta: {
                fechado: fechadoquinta,
                horario_abertura: quinta1,
                horario_fechamento_almoco: quinta2,
                horario_abertura_almoco: quinta3,
                horario_fechamento: quinta4,
              },
              sexta: {
                fechado: fechadosexta,
                horario_abertura: sexta1,
                horario_fechamento_almoco: sexta2,
                horario_abertura_almoco: sexta3,
                horario_fechamento: sexta4,
              },
              sabado: {
                fechado: fechadosabado,
                horario_abertura: sabado1,
                horario_fechamento_almoco: sabado2,
                horario_abertura_almoco: sabado3,
                horario_fechamento: sabado4,
              },
              domingo: {
                fechado: fechadodomingo,
                horario_abertura: domingo1,
                horario_fechamento_almoco: domingo2,
                horario_abertura_almoco: domingo3,
                horario_fechamento: domingo4,
              },
            },
          ],
        };

        const response = await api.post(`/salva/horarios-funcionamento`, payload, {
          headers: {
            Authorization: `Bearer ${newJson.token}`,
          },
        });

        if (response.status === 200) {
          Toast.show({
            type: 'success',
            text1: 'Horários atualizados com sucesso'
          })
          navigate('ClientePerfilScreen')
        }
      } catch (error: any) {
        console.error('Erro ao salvar horários: ', error);
        Toast.show({
          type: 'error',
          text1: 'Erro ao salvar horários',
        });
      }
    }
    setLoading(false)
  }

  async function getHorarios() {
    const jsonValue = await AsyncStorage.getItem('infos-user')
    if (jsonValue) {
      const newJson = JSON.parse(jsonValue)
      try {
        const response = await api.get(`/horarios-funcionamento?user_id=${newJson?.id}`)
        console.log(response.data.results.horarios);

        setHorarios(response.data.results.horarios)
      } catch (error: any) {
        console.error('GET Horários:', error);
      }
    }
  }

  useEffect(() => {
    getHorarios()
  }, [])

  useEffect(() => {
    if (isFocused) {
      getHorarios()
    }
  }, [isFocused])

  console.log(fechadoSegunda);


  return (
    <MainLayoutAutenticadoSemScroll loadign={loading} marginTop={72} marginHorizontal={0}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Segunda */}
        <View style={styles.diaContainer}>
          <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
            <Text style={styles.diaTitulo}>Segunda</Text>
            <CardHorarios
              valor_default={fechadoSegunda}
              fechado={fechadoSegunda}
              setValor={setFechadoSegunda}
            />
          </View>
          {!fechadoSegunda &&
            <View style={styles.inputsContainer}>
              <TextInput
                style={styles.input}
                keyboardType='number-pad'
                placeholder="Horário de Abertura"
                value={segunda1}
                placeholderTextColor={colors.gray}
                onChangeText={(text) => setSegunda1(maskHorario(text))}
              />
              <TextInput
                style={styles.input}
                keyboardType='number-pad'
                placeholder="Horário de Fechamento Almoço"
                placeholderTextColor={colors.gray}
                value={segunda2}
                onChangeText={(text) => setSegunda2(maskHorario(text))}
              />
              <TextInput
                style={styles.input}
                keyboardType='number-pad'
                placeholder="Horário da Volta Almoço"
                placeholderTextColor={colors.gray}
                value={segunda3}
                onChangeText={(text) => setSegunda3(maskHorario(text))}
              />
              <TextInput
                style={styles.input}
                keyboardType='number-pad'
                placeholder="Horário de Fechamento"
                placeholderTextColor={colors.gray}
                value={segunda4}
                onChangeText={(text) => setSegunda4(maskHorario(text))}
              />
            </View>
          }
        </View>

        {/* Terça */}
        <View style={styles.diaContainer}>
          <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
            <Text style={styles.diaTitulo}>Terça</Text>
            <CardHorarios
              valor_default={fechadoTerca}
              fechado={fechadoTerca}
              setValor={setFechadoTerca}
            />
          </View>
          {!fechadoTerca &&
            <View style={styles.inputsContainer}>
              <TextInput
                style={styles.input}
                keyboardType='number-pad'
                placeholder="Horário de Abertura"
                value={terca1}
                placeholderTextColor={colors.gray}
                onChangeText={(text) => setterca1(maskHorario(text))}
              />
              <TextInput
                style={styles.input}
                keyboardType='number-pad'
                placeholder="Horário de Fechamento Almoço"
                placeholderTextColor={colors.gray}
                value={terca2}
                onChangeText={(text) => setterca2(maskHorario(text))}
              />
              <TextInput
                style={styles.input}
                keyboardType='number-pad'
                placeholder="Horário da Volta Almoço"
                placeholderTextColor={colors.gray}
                value={terca3}
                onChangeText={(text) => setterca3(maskHorario(text))}
              />
              <TextInput
                style={styles.input}
                keyboardType='number-pad'
                placeholder="Horário de Fechamento"
                placeholderTextColor={colors.gray}
                value={terca4}
                onChangeText={(text) => setterca4(maskHorario(text))}
              />
            </View>
          }
        </View>

        {/* Quarta */}
        <View style={styles.diaContainer}>
          <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
            <Text style={styles.diaTitulo}>Quarta</Text>
            <CardHorarios
              valor_default={fechadoquarta}
              fechado={fechadoquarta}
              setValor={setFechadoquarta}
            />
          </View>
          {!fechadoquarta &&
            <View style={styles.inputsContainer}>
              <TextInput
                style={styles.input}
                keyboardType='number-pad'
                placeholder="Horário de Abertura"
                value={quarta1}
                placeholderTextColor={colors.gray}
                onChangeText={(text) => setquarta1(maskHorario(text))}
              />
              <TextInput
                style={styles.input}
                keyboardType='number-pad'
                placeholder="Horário de Fechamento Almoço"
                placeholderTextColor={colors.gray}
                value={quarta2}
                onChangeText={(text) => setquarta2(maskHorario(text))}
              />
              <TextInput
                style={styles.input}
                keyboardType='number-pad'
                placeholder="Horário da Volta Almoço"
                placeholderTextColor={colors.gray}
                value={quarta3}
                onChangeText={(text) => setquarta3(maskHorario(text))}
              />
              <TextInput
                style={styles.input}
                keyboardType='number-pad'
                placeholder="Horário de Fechamento"
                placeholderTextColor={colors.gray}
                value={quarta4}
                onChangeText={(text) => setquarta4(maskHorario(text))}
              />
            </View>
          }
        </View>

        {/* Quinta */}
        <View style={styles.diaContainer}>
          <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
            <Text style={styles.diaTitulo}>Quinta</Text>
            <CardHorarios
              valor_default={fechadoquinta}
              fechado={fechadoquinta}
              setValor={setFechadoquinta}
            />
          </View>
          {!fechadoquinta &&
            <View style={styles.inputsContainer}>
              <TextInput
                style={styles.input}
                keyboardType='number-pad'
                placeholder="Horário de Abertura"
                value={quinta1}
                placeholderTextColor={colors.gray}
                onChangeText={(text) => setquinta1(maskHorario(text))}
              />
              <TextInput
                style={styles.input}
                keyboardType='number-pad'
                placeholder="Horário de Fechamento Almoço"
                placeholderTextColor={colors.gray}
                value={quinta2}
                onChangeText={(text) => setquinta2(maskHorario(text))}
              />
              <TextInput
                style={styles.input}
                keyboardType='number-pad'
                placeholder="Horário da Volta Almoço"
                placeholderTextColor={colors.gray}
                value={quinta3}
                onChangeText={(text) => setquinta3(maskHorario(text))}
              />
              <TextInput
                style={styles.input}
                keyboardType='number-pad'
                placeholder="Horário de Fechamento"
                placeholderTextColor={colors.gray}
                value={quinta4}
                onChangeText={(text) => setquinta4(maskHorario(text))}
              />
            </View>
          }
        </View>

        {/* Sexta */}
        <View style={styles.diaContainer}>
          <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
            <Text style={styles.diaTitulo}>Sexta</Text>
            <CardHorarios
              valor_default={fechadosexta}
              fechado={fechadosexta}
              setValor={setFechadosexta}
            />
          </View>
          {!fechadosexta &&
            <View style={styles.inputsContainer}>
              <TextInput
                style={styles.input}
                keyboardType='number-pad'
                placeholder="Horário de Abertura"
                value={sexta1}
                placeholderTextColor={colors.gray}
                onChangeText={(text) => setsexta1(maskHorario(text))}
              />
              <TextInput
                style={styles.input}
                keyboardType='number-pad'
                placeholder="Horário de Fechamento Almoço"
                placeholderTextColor={colors.gray}
                value={sexta2}
                onChangeText={(text) => setsexta2(maskHorario(text))}
              />
              <TextInput
                style={styles.input}
                keyboardType='number-pad'
                placeholder="Horário da Volta Almoço"
                placeholderTextColor={colors.gray}
                value={sexta3}
                onChangeText={(text) => setsexta3(maskHorario(text))}
              />
              <TextInput
                style={styles.input}
                keyboardType='number-pad'
                placeholder="Horário de Fechamento"
                placeholderTextColor={colors.gray}
                value={sexta4}
                onChangeText={(text) => setsexta4(maskHorario(text))}
              />
            </View>
          }
        </View>

        {/* Sábado */}
        <View style={styles.diaContainer}>
          <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
            <Text style={styles.diaTitulo}>Sábado</Text>
            <CardHorarios
              valor_default={fechadosabado}
              fechado={fechadosabado}
              setValor={setFechadosabado}
            />
          </View>
          {!fechadosabado &&
            <View style={styles.inputsContainer}>
              <TextInput
                style={styles.input}
                keyboardType='number-pad'
                placeholder="Horário de Abertura"
                value={sabado1}
                placeholderTextColor={colors.gray}
                onChangeText={(text) => setsabado1(maskHorario(text))}
              />
              <TextInput
                style={styles.input}
                keyboardType='number-pad'
                placeholder="Horário de Fechamento Almoço"
                placeholderTextColor={colors.gray}
                value={sabado2}
                onChangeText={(text) => setsabado2(maskHorario(text))}
              />
              <TextInput
                style={styles.input}
                keyboardType='number-pad'
                placeholder="Horário da Volta Almoço"
                placeholderTextColor={colors.gray}
                value={sabado3}
                onChangeText={(text) => setsabado3(maskHorario(text))}
              />
              <TextInput
                style={styles.input}
                keyboardType='number-pad'
                placeholder="Horário de Fechamento"
                placeholderTextColor={colors.gray}
                value={sabado4}
                onChangeText={(text) => setsabado4(maskHorario(text))}
              />
            </View>
          }
        </View>

        {/* Domingo */}
        <View style={styles.diaContainer}>
          <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
            <Text style={styles.diaTitulo}>Domingo</Text>
            <CardHorarios
              valor_default={fechadodomingo}
              fechado={fechadodomingo}
              setValor={setFechadodomingo}
            />
          </View>
          {!fechadodomingo &&
            <View style={styles.inputsContainer}>
              <TextInput
                style={styles.input}
                keyboardType='number-pad'
                placeholder="Horário de Abertura"
                value={domingo1}
                placeholderTextColor={colors.gray}
                onChangeText={(text) => setdomingo1(maskHorario(text))}
              />
              <TextInput
                style={styles.input}
                keyboardType='number-pad'
                placeholder="Horário de Fechamento Almoço"
                placeholderTextColor={colors.gray}
                value={domingo2}
                onChangeText={(text) => setdomingo2(maskHorario(text))}
              />
              <TextInput
                style={styles.input}
                keyboardType='number-pad'
                placeholder="Horário da Volta Almoço"
                placeholderTextColor={colors.gray}
                value={domingo3}
                onChangeText={(text) => setdomingo3(maskHorario(text))}
              />
              <TextInput
                style={styles.input}
                keyboardType='number-pad'
                placeholder="Horário de Fechamento"
                placeholderTextColor={colors.gray}
                value={domingo4}
                onChangeText={(text) => setdomingo4(maskHorario(text))}
              />
            </View>
          }
        </View>
        <FilledButton title='Salvar Horários' onPress={postSalvaHorarios} />
      </ScrollView>
    </MainLayoutAutenticadoSemScroll >
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
