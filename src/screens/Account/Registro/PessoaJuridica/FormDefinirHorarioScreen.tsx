import FilledButton from '@components/buttons/FilledButton';
import HeaderPrimary from '@components/header/HeaderPrimary';
import MainLayoutAutenticadoSemScroll from '@components/layout/MainLayoutAutenticadoSemScroll';
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
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
  'Domingo',
];

export default function FormDefinirHorarioScreen({ route }: { route: any }) {
  const { navigate } = useNavigate()
  const isFocused = useIsFocused()
  const [loading, setLoading] = useState(false)
  const { setSenhaUser, senhaUser, setTelefoneDigitado, setTipoUser } = useGlobal()
  const [diasFechados, setDiasFechados] = useState<{ [key: string]: boolean }>({});
  const [emailStorage, setEmailStorage] = useState('')
  const [token, setToken] = useState('')
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
    try {
      // Mapeia os dias para o formato que a API espera
      const payload = {
        horarios: [
          {
            segunda: {
              fechado: diasFechados['Segunda'] || false,
              horario_abertura: horarios['Segunda']?.abertura || "",
              horario_fechamento_almoco: horarios['Segunda']?.fechamentoAlmoco || "",
              horario_abertura_almoco: horarios['Segunda']?.voltaAlmoco || "",
              horario_fechamento: horarios['Segunda']?.fechamento || "",
            },
            terca: {
              fechado: diasFechados['Terça'] || false,
              horario_abertura: horarios['Terça']?.abertura || "",
              horario_fechamento_almoco: horarios['Terça']?.fechamentoAlmoco || "",
              horario_abertura_almoco: horarios['Terça']?.voltaAlmoco || "",
              horario_fechamento: horarios['Terça']?.fechamento || "",
            },
            quarta: {
              fechado: diasFechados['Quarta'] || false,
              horario_abertura: horarios['Quarta']?.abertura || "",
              horario_fechamento_almoco: horarios['Quarta']?.fechamentoAlmoco || "",
              horario_abertura_almoco: horarios['Quarta']?.voltaAlmoco || "",
              horario_fechamento: horarios['Quarta']?.fechamento || "",
            },
            quinta: {
              fechado: diasFechados['Quinta'] || false,
              horario_abertura: horarios['Quinta']?.abertura || "",
              horario_fechamento_almoco: horarios['Quinta']?.fechamentoAlmoco || "",
              horario_abertura_almoco: horarios['Quinta']?.voltaAlmoco || "",
              horario_fechamento: horarios['Quinta']?.fechamento || "",
            },
            sexta: {
              fechado: diasFechados['Sexta'] || false,
              horario_abertura: horarios['Sexta']?.abertura || "",
              horario_fechamento_almoco: horarios['Sexta']?.fechamentoAlmoco || "",
              horario_abertura_almoco: horarios['Sexta']?.voltaAlmoco || "",
              horario_fechamento: horarios['Sexta']?.fechamento || "",
            },
            sabado: {
              fechado: diasFechados['Sábado'] || false,
              horario_abertura: horarios['Sábado']?.abertura || "",
              horario_fechamento_almoco: horarios['Sábado']?.fechamentoAlmoco || "",
              horario_abertura_almoco: horarios['Sábado']?.voltaAlmoco || "",
              horario_fechamento: horarios['Sábado']?.fechamento || "",
            },
            domingo: {
              fechado: diasFechados['Domingo'] || false,
              horario_abertura: horarios['Domingo']?.abertura || "",
              horario_fechamento_almoco: horarios['Domingo']?.fechamentoAlmoco || "",
              horario_abertura_almoco: horarios['Domingo']?.voltaAlmoco || "",
              horario_fechamento: horarios['Domingo']?.fechamento || "",
            },
          },
        ],
      };

      const response = await api.post(`/salva/horarios-funcionamento`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log(response.data);
        Toast.show({
          type: 'success',
          text1: 'Horários salvos com sucesso!',
        });
        navigate('CadastroSucessoAnuncianteScreen')
      } else {
        Toast.show({
          type: 'error',
          text1: 'Erro ao salvar horários',
        });
      }
    } catch (error: any) {
      console.error('Erro ao salvar horários: ', error);
      Toast.show({
        type: 'error',
        text1: 'Erro ao salvar horários',
      });
    }
    setLoading(false)
  }

  async function getEmail() {
    setLoading(true)
    try {
      const storageEmail = await AsyncStorage.getItem('user-email')
      console.log(storageEmail !== null && senhaUser !== null);
      if (storageEmail !== null && senhaUser !== null) {
        setEmailStorage(storageEmail)
        postLogin(storageEmail)
      }
    } catch (error: any) {
      console.log('Error Storage: ', error)
    }
    setLoading(false)
  }

  const submitStorageLogin = async (value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('infos-user', jsonValue)
    } catch (error: any) {
      console.error(error)
    }
  }

  async function postLogin(emailarmazenado: any) {
    const formData = {
      email: emailarmazenado,
      password: senhaUser,
      role: "Anunciante"
    }

    try {
      const response = await api.post(`/login`, formData)
      if (!response.data.error) {
        submitStorageLogin(response.data.results)
        setTipoUser('Anunciante')
        setToken(response.data.results.token)
      } else {
        console.error(response.data.error);
        Toast.show({
          type: 'error',
          text1: 'Erro ao carregar dados do usuário, verifique sua conexão',
        });
      }
    } catch (error: any) {
      console.error('Error Login Horários: ', error)
    }
    setLoading(false)
  }

  useEffect(() => {
    getEmail()
  }, [])

  useEffect(() => {
    if (isFocused) {
      getEmail()
    }
  }, [isFocused])

  return (
    <MainLayoutAutenticadoSemScroll loadign={loading} marginTop={0} marginHorizontal={0}>
      <HeaderPrimary titulo='Informe todos horários de funcionamento' />
      <ScrollView contentContainerStyle={styles.container}>
        {diasDaSemana.map((dia) => (
          <View key={dia} style={styles.diaContainer}>
            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
              <Text style={styles.diaTitulo}>{dia}</Text>
              <View style={styles.switchContainer}>
                <Text>Aberto</Text>
                <Switch
                  style={{
                    height: 32,
                    marginHorizontal: 4
                  }}
                  trackColor={{ false: '#767577', true: colors.danger }}
                  thumbColor={diasFechados[dia] || false ? '#f4f3f4' : colors.secondary40}
                  value={diasFechados[dia] || false}
                  onValueChange={(value) => handleSwitch(dia, value)}
                />
                <Text>Fechado</Text>
              </View>
            </View>
            {!diasFechados[dia] && (
              <View style={styles.inputsContainer}>
                <TextInput
                  style={styles.input}
                  keyboardType='number-pad'
                  placeholder="Horário de Abertura"
                  value={horarios[dia]?.abertura || ''}
                  placeholderTextColor={colors.gray}
                  onChangeText={(text) => handleHorarioChange(dia, 'abertura', maskHorario(text))}
                />
                <TextInput
                  style={styles.input}
                  keyboardType='number-pad'
                  placeholder="Horário de Fechamento Almoço"
                  placeholderTextColor={colors.gray}
                  value={horarios[dia]?.fechamentoAlmoco || ''}
                  onChangeText={(text) => handleHorarioChange(dia, 'fechamentoAlmoco', maskHorario(text))}
                />
                <TextInput
                  style={styles.input}
                  keyboardType='number-pad'
                  placeholder="Horário da Volta Almoço"
                  placeholderTextColor={colors.gray}
                  value={horarios[dia]?.voltaAlmoco || ''}
                  onChangeText={(text) => handleHorarioChange(dia, 'voltaAlmoco', maskHorario(text))}
                />
                <TextInput
                  style={styles.input}
                  keyboardType='number-pad'
                  placeholder="Horário de Fechamento"
                  placeholderTextColor={colors.gray}
                  value={horarios[dia]?.fechamento || ''}
                  onChangeText={(text) => handleHorarioChange(dia, 'fechamento', maskHorario(text))}
                />
              </View>
            )}
          </View>
        ))}
        <View className='my-4'>
          <FilledButton title='Salvar Horários' onPress={postSalvaHorarios} />
        </View>
        <View className='mb-4'>
          <FilledButton backgroundColor={colors.gray} title='Pular' onPress={() => { navigate('CadastroSucessoAnuncianteScreen') }} />
        </View>
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
