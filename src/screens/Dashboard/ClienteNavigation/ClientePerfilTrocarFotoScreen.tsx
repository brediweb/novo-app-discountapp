import React, { useEffect, useState } from 'react';
import H5 from '../../../components/typography/H5';
import { View, TouchableOpacity, Image, Text, Alert } from 'react-native';
import ButtonPerfil from '../../../components/buttons/ButtonPerfil';
import MainLayoutAutenticado from '../../../components/layout/MainLayoutAutenticado';
import { AnuncianteAtualizaPerfil } from '../../../@types/Anunciate';
import { useNavigate } from '../../../hooks/useNavigate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../../../service/api';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';

export default function ClientePerfilTrocarFotoScreen() {
  const [cpf, setCpf] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const { goBack, navigate } = useNavigate();
  const [editar, setEditar] = useState(false);
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalFoto, setModalFoto] = useState(false);
  const [imagemEnvio, setImagemEnvio] = useState('');
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [logomarca, setLogomarca] = useState<any>(null);
  const [categoriaPerfil, setCategoriaPerfil] = useState([]);
  const [nomeEmpresarial, setNomeEmpresarial] = useState('');
  const [imagemSelecionada, setImagemSelecionada] =
    useState<AnuncianteAtualizaPerfil>();

  async function getPerfil() {
    const jsonValue = await AsyncStorage.getItem('infos-user');

    if (jsonValue) {
      const newJson = JSON.parse(jsonValue);
      try {
        const response = await api.get(`/perfil/pessoa-juridica/${newJson.id}`);
        console.log(response.data.results);
        setLogomarca(response.data.results.logomarca);
      } catch (error: any) {
        console.log('Error GET Perfil: ', error.response.data);
      }
    }
  }

  async function handleAtualizaLogoPerfil(logo: any) {
    console.log({
      uri: logo.path,
      type: logo.mime,
      name: logo.filename,
    });
    const jsonValue = await AsyncStorage.getItem('infos-user');
    if (jsonValue) {
      const newJsonUsuario = JSON.parse(jsonValue);
      try {
        const headers = {
          Authorization: `Bearer ${newJsonUsuario.token}`,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        };
        const formdata = new FormData();
        formdata.append(
          'logomarca',
          {
            uri: logo.path,
            type: logo.mime,
            name: 'logomarca.jpg',
          },
          logo.path
        );
        const response = await api.post('/atualiza-logomarca', formdata, {
          headers,
        });
        Toast.show({
          type: 'success',
          text1: response.data.message ?? 'Logomarca Atualizada!',
        });
      } catch (error) {
        console.log(error.request);
        Toast.show({
          type: 'error',
          text1:
            error?.response?.data?.message ?? 'Erro ao atualizar logomarca!',
        });
      }
    }
  }

  function pickSingle({ cropit, circular = false, mediaType }: any) {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: cropit,
      cropperCircleOverlay: circular,
      sortOrder: 'none',
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      compressVideoPreset: 'MediumQuality',
      includeExif: false,
      cropperStatusBarColor: '#fff',
      cropperToolbarColor: '#fff',
      cropperActiveWidgetColor: '#fff',
      cropperToolbarWidgetColor: '#3498DB',
      mediaType: 'photo',
    })
      .then((image: any) => {
        const lastSlashIndex = image.path.lastIndexOf('/');
        const imageName = image.path.substring(lastSlashIndex + 1);
        setImagemSelecionada(image.path);
        setImagemEnvio(image);
        handleAtualizaLogoPerfil(image);
      })
      .catch((error) => {
        console.log(error);
        Alert.alert(error.message ? error.message : error);
      });
  }

  useEffect(() => {
    getPerfil();
  }, []);

  return (
    <MainLayoutAutenticado notScroll marginTop={20} marginHorizontal={16}>
      <ButtonPerfil
        mt={64}
        title="Perfil - Trocar logo"
        fontsize={24}
        onPress={() => navigate('ClientePerfilScreen')}
        image={require('../../../../assets/img/icons/edit.png')}
      />
      <View className="mt-6">
        <TouchableOpacity
          className="border rounded p-3"
          onPress={() => pickSingle(false)}
        >
          {logomarca && !imagemSelecionada && (
            <Image
              source={{ uri: logomarca }}
              className=" w-24 h-24 rounded-full mx-auto my-4"
            />
          )}

          {imagemSelecionada && (
            <Image
              source={{ uri: imagemSelecionada }}
              className=" w-24 h-24 rounded-full mx-auto my-4"
            />
          )}
          <Text className="font-semibold text-xl text-center">
            Toque para alterar logomarca
          </Text>
        </TouchableOpacity>
      </View>
    </MainLayoutAutenticado>
  );
}
