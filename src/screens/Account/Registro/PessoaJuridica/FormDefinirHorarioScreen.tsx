import FilledButton from '@components/buttons/FilledButton';
import HeaderPrimary from '@components/header/HeaderPrimary';
import MainLayoutAutenticadoSemScroll from '@components/layout/MainLayoutAutenticadoSemScroll';
import { useNavigate } from '@hooks/useNavigate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
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
  const infoForm = route.params
  const { navigate } = useNavigate()
  const [loading, setLoading] = useState(false)
  const { setSenhaUser, setTelefoneDigitado, setTipoUser } = useGlobal()
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

  function maskHorario(value: string) {
    // Remove tudo que não é número
    const cleaned = value.replace(/\D/g, '');
    // Limita a 4 dígitos
    const limited = cleaned.slice(0, 4);
    // Aplica a máscara
    if (limited.length <= 2) return limited;
    return `${limited.slice(0, 2)}:${limited.slice(2)}`;
  }


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

    setLoading(true)
    const novaImage = { uri: infoForm?.dataform?.logomarca?.path ?? '', type: 'image/.png', name: ' ' }
    const formdata = new FormData()

    formdata.append('nome_fantasia', `${infoForm.dataform.nome_fantasia}`)
    formdata.append('nome_empresarial', `${infoForm.dataform.nome_empresarial}`)
    formdata.append('cnpj', `${infoForm.dataform.cnpj}`)
    formdata.append('endereco', `${infoForm.dataform.endereco}`)
    formdata.append('estado', `${infoForm.dataform.estado}`)
    formdata.append('cidade', `${infoForm.dataform.cidade}`)
    formdata.append('cep', `${infoForm.dataform.cep}`)
    formdata.append('bairro', `${infoForm.dataform.bairro}`)
    formdata.append('rua', `${infoForm.dataform.rua}`)
    formdata.append('numero', `${infoForm.dataform.numero}`)
    formdata.append('email', `${infoForm.dataform.email}`)
    formdata.append('telefone', `${infoForm.dataform.telefone}`)
    formdata.append('nome_representante', `${infoForm.dataform.nome_represetante}`)
    formdata.append('endereco_representante', `${infoForm.dataform.endereco_represetante}`)
    formdata.append('cpf_representante', `${infoForm.dataform.cpf_represetante}`)
    formdata.append('senha', `${infoForm.dataform.senha}`)
    formdata.append('perfil_id', `${infoForm.categorias}`)
    formdata.append('latitude', infoForm.dataform.latitude as any)
    formdata.append('longitude', infoForm.dataform.longitude as any)

    if (infoForm?.dataform?.logomarca) {
      if (infoForm?.dataform?.logomarca?.path != undefined && infoForm?.dataform?.logomarca?.path != '') {
        formdata.append('logomarca', novaImage as any)
        try {
          const response = await api.post("/cadastro/pessoa-juridica", formdata,
            { headers: { 'Content-Type': 'multipart/form-data' } })
          if (!response.data.error) {
            await AsyncStorage.setItem('user-email', infoForm?.dataform.email)
            await AsyncStorage.setItem('id-user', response.data.results.id.toString())
            setSenhaUser(infoForm?.dataform.senha)
            setTipoUser('Anunciante')
            Toast.show({
              type: 'success',
              text1: 'Cadastro realizado !',
            })
            // console.log('Cadastrado:', response.data);

            setTelefoneDigitado(infoForm.dataform.telefone)
            navigate('ValidaCodigoScreen')
          } else {
            Toast.show({
              type: 'error',
              text1: response.data.erro.message ?? 'Ocorreu um erro, tente novamente mais tarde !',
            })
            console.error('Cadastro Pessoa Jurídica: ', response.data.erro.message)
          }
        } catch (error: any) {
          Toast.show({
            type: 'error',
            text1: error?.response?.data.message ?? 'Ocorreu um erro, tente novamente mais tarde !',
          })
          console.error('Cadastro Pessoa Jurídica2 ', error.response.data)
        }
      }
    } else {
      try {
        const response = await api.post("/cadastro/pessoa-juridica", formdata,
          { headers: { 'Content-Type': 'multipart/form-data' } })
        if (!response.data.error) {
          await AsyncStorage.setItem('user-email', infoForm?.dataform.email)
          await AsyncStorage.setItem('id-user', response.data.results.id.toString())
          setSenhaUser(infoForm?.dataform.senha)
          setTipoUser('Anunciante')
          Toast.show({
            type: 'success',
            text1: 'Cadastro realizado !',
          })
          // console.log('Cadastrado:', response.data);

          setTelefoneDigitado(infoForm.dataform.telefone)
          navigate('ValidaCodigoScreen')
        } else {
          Toast.show({
            type: 'error',
            text1: response.data.erro.message ?? 'Ocorreu um erro, tente novamente mais tarde !',
          })
          console.error('Cadastro Pessoa Jurídica: ', response.data.erro.message)
          setLoading(false)
        }
      } catch (error: any) {
        Toast.show({
          type: 'error',
          text1: error?.response?.data.message ?? 'Ocorreu um erro, tente novamente mais tarde !',
        })
        console.error('Cadastro Pessoa Jurídica2 ', error.data)
        setLoading(false)
      }
    }
    setLoading(false)
  }

  return (
    <MainLayoutAutenticadoSemScroll loadign={loading} marginTop={0} marginHorizontal={0}>
      <HeaderPrimary titulo='Informe todos horários de funcionamento' />
      <ScrollView contentContainerStyle={styles.container}>
        {diasDaSemana.map((dia) => (
          <View key={dia} style={styles.diaContainer}>
            <Text style={styles.diaTitulo}>{dia}</Text>
            <View style={styles.switchContainer}>
              <Text>Fechado</Text>
              <Switch
                value={diasFechados[dia] || false}
                thumbColor={colors.secondary70}
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
                  onChangeText={(text) => handleHorarioChange(dia, 'abertura', maskHorario(text))}
                />
                <TextInput
                  style={styles.input}
                  keyboardType='number-pad'
                  placeholder="Fechamento Almoço"
                  value={horarios[dia]?.fechamentoAlmoco || ''}
                  onChangeText={(text) => handleHorarioChange(dia, 'fechamentoAlmoco', maskHorario(text))}
                />
                <TextInput
                  style={styles.input}
                  keyboardType='number-pad'
                  placeholder="Volta Almoço"
                  value={horarios[dia]?.voltaAlmoco || ''}
                  onChangeText={(text) => handleHorarioChange(dia, 'voltaAlmoco', maskHorario(text))}
                />
                <TextInput
                  style={styles.input}
                  keyboardType='number-pad'
                  placeholder="Fechamento"
                  value={horarios[dia]?.fechamento || ''}
                  onChangeText={(text) => handleHorarioChange(dia, 'fechamento', maskHorario(text))}
                />
              </View>
            )}
          </View>
        ))}
        <View className='my-4'>
          <FilledButton title='Salvar Horários' onPress={onSubmit} />
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
