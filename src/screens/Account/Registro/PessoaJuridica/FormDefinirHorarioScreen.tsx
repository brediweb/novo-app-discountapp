import FilledButton from '@components/buttons/FilledButton';
import HeaderPrimary from '@components/header/HeaderPrimary';
import MainLayoutAutenticadoSemScroll from '@components/layout/MainLayoutAutenticadoSemScroll';
import { useNavigate } from '@hooks/useNavigate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Switch } from 'react-native';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';
import Toast from 'react-native-toast-message';
import { useGlobal } from 'src/context/GlobalContextProvider';
import { api } from 'src/service/api';
import { colors } from 'src/styles/colors';

const diasDaSemana = [
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
  'Domingo',
];

const InputHorario = ({ label, value, onChangeText }: any) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <MaskedTextInput
      mask="99:99"
      keyboardType="numeric"
      value={value}
      onChangeText={onChangeText}
      style={styles.input}
      placeholder="00:00"
    />
  </View>
);

export default function HorariosFuncionamento({ route }: { route: any }) {
  const [horarios, setHorarios] = useState({}) as any;
  const infoForm = route.params
  const { navigate } = useNavigate()
  const [loading, setLoading] = useState(false)
  const { setSenhaUser, setTelefoneDigitado, setTipoUser } = useGlobal()
  const [diasFechados, setDiasFechados] = useState<{ [key: string]: boolean }>({});

  const isDiaAberto = (dia: string) => !diasFechados[dia];

  const toggleFechado = (dia: string) => {
    setDiasFechados((prev) => ({
      ...prev,
      [dia]: !prev[dia],
    }));
  };

  const handleChange = (dia: any, campo: any, valor: any) => {
    setHorarios((prev: any) => ({
      ...prev,
      [dia]: {
        ...prev[dia],
        [campo]: valor,
      },
    }));
  };

  async function onSubmit() {
    setLoading(true)
    if (!horarios) {
      Toast.show({
        type: 'error',
        text1: 'Informe os horários de funconamento'
      })
    }
    if (!infoForm) {
      Toast.show({
        type: 'error',
        text1: 'Não conseguimos exibir algumas informações !',
      })
      return;
    }

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
      }
    }
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
    setLoading(false)
  }

  return (
    <MainLayoutAutenticadoSemScroll loadign={loading} marginHorizontal={0} marginTop={0}>
      <HeaderPrimary titulo='Informe todos horários de funcionamento' />
      <ScrollView contentContainerStyle={styles.container}>
        {diasDaSemana.map((dia) => {
          const aberto = isDiaAberto(dia);

          return (
            <View key={dia} style={styles.diaContainer}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.diaTitulo}>{dia}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ marginRight: 8 }}>Fechado</Text>
                  <Switch
                    value={diasFechados[dia] || false}
                    onValueChange={() => toggleFechado(dia)}
                    thumbColor={diasFechados[dia] ? colors.danger : colors.secondary70}
                  />
                </View>
              </View>

              {aberto && (
                <>
                  <InputHorario
                    label="Abertura"
                    value={horarios[dia]?.abertura || ''}
                    onChangeText={(text: any) => handleChange(dia, 'abertura', text)}
                  />
                  <InputHorario
                    label="Fechamento para almoço"
                    value={horarios[dia]?.fechamentoAlmoco || ''}
                    onChangeText={(text: any) => handleChange(dia, 'fechamentoAlmoco', text)}
                  />
                  <InputHorario
                    label="Volta do almoço"
                    value={horarios[dia]?.voltaAlmoco || ''}
                    onChangeText={(text: any) => handleChange(dia, 'voltaAlmoco', text)}
                  />
                  <InputHorario
                    label="Fechamento do dia"
                    value={horarios[dia]?.fechamento || ''}
                    onChangeText={(text: any) => handleChange(dia, 'fechamento', text)}
                  />
                </>
              )}
            </View>
          );
        })}
      </ScrollView>
      <View className='mx-4 mt-6'>
        <FilledButton
          title='Próximo'
          disabled={horarios ? false : true}
          onPress={onSubmit}
        />
      </View>
    </MainLayoutAutenticadoSemScroll>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 100,
  },
  diaContainer: {
    marginBottom: 24,
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 10,
  },
  diaTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: colors.secondary70
  },
  inputContainer: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.secondary70,
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
  },
});
