import { api } from '../../../service/api';
import Toast from 'react-native-toast-message';
import React, { useEffect, useState } from 'react';
import { useNavigate } from '../../../hooks/useNavigate';
import LinearGradient from 'react-native-linear-gradient';
import Paragrafo from '../../../components/typography/Paragrafo';
import ButtonPerfil from '../../../components/buttons/ButtonPerfil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainLayoutAutenticado from '../../../components/layout/MainLayoutAutenticado';
import {
  View,
  TouchableOpacity,
  RefreshControl,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  Text,
} from 'react-native';
import ButtonOutline from '@components/buttons/ButtonOutline';
import { colors } from 'src/styles/colors';

export default function ClientePerfilCategoriaScreen() {
  const { navigate } = useNavigate();
  const [loading, setLoading] = useState(false);
  const screenWidth = Dimensions.get('window').width;
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [listaCategorias, setListaCategorias] = useState([]);
  const [listaCategoriasPerfil, setListaCategoriasPerfil] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<any[]>(
    []
  );
  const [needSave, setNeedSave] = useState(false);

  const handleSelectOption = (option: string) => {
    let updatedOptions: string[];
    if (selectedOptions.includes(option)) {
      updatedOptions = selectedOptions.filter(
        (selectedOption) => selectedOption !== option
      );
    } else {
      if (selectedOptions.length < 3) {
        updatedOptions = [...selectedOptions, option];
      } else {
        Toast.show({
          type: 'error',
          text1: 'O limite máximo é 3 perfis !',
        });
        return;
      }
    }
    setSelectedOptions(updatedOptions);
  };

  async function getCategorias() {
    try {
      const response = await api.get('/categorias/cadastro');
      setListaCategorias(response.data.results);
    } catch (error: any) {
      console.log('Erro ao buscar categorias', error.response.data);
    }
  }

  async function savePerfil() {
    const jsonValue = await AsyncStorage.getItem('infos-user');
    if (jsonValue) {
      const newJson = JSON.parse(jsonValue);
      try {
        const headers = {
          Authorization: `Bearer ${newJson.token}`,
        };
        const response = await api.post(
          '/atualiza-categorias',
          { categorias: selectedOptions },
          { headers }
        );
        // navigate('ClientePerfilScreen')
        Toast.show({
          type: 'success',
          text1: 'Categorias atualizadas!',
        });
        setNeedSave(false);
        getPerfil();
      } catch (error: any) {
        console.log('ERROR POST Atualizar Categorias', error.response.data);
      }
    }
  }

  async function getPerfil() {
    const jsonValue = await AsyncStorage.getItem('infos-user');
    if (jsonValue) {
      const newJson = JSON.parse(jsonValue);
      try {
        const response = await api.get(`/perfil/pessoa-juridica/${newJson.id}`);
        setListaCategoriasPerfil(response.data.results.perfil_id);
      } catch (error: any) {
        console.log('Error GET Perfil: ', error.response.data);
      }
    }
  }

  const renderItemSegundo = ({ item }: any) => {
    const isSelected = selectedOptions.some(
      (categoria: any) => categoria === item.id
    );

    return (
      <View style={styles.container}>
        <View style={styles.column}></View>
        <LinearGradient
          style={[
            styles.block,
            isSelected && { borderColor: '#775AFF', borderWidth: 4 },
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1.2 }}
          colors={[
            isSelected ? '#C9BFFF' : '#775AFF',
            isSelected ? '#C9BFFF' : '#B2C5FF',
          ]}
        >
          <TouchableOpacity
            className="flex-1 items-center justify-center"
            onPress={() => handleSelectOption(item.id)}
          >
            {item.categorias !== '' ? (
              <View className="mb-3">
                {item.icon ? (
                  item.icon
                ) : (
                  <Image className="w-14 h-14" source={{ uri: item.icone }} />
                )}
              </View>
            ) : item.icon ? (
              item.icon
            ) : (
              <Image className="w-14 h-14" source={{ uri: item.icone }} />
            )}
            {item.categorias !== '' && (
              <View className="absolute bottom-1">
                <Paragrafo color={'#2F009C'} title={item.categorias} />
              </View>
            )}
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  useEffect(() => {
    getPerfil();
    getCategorias();
  }, []);

  useEffect(() => {
    if (categoriasSelecionadas) {
      setSelectedOptions(selectedOptions.sort((a, b) => a - b));
      const categorias = categoriasSelecionadas
        .map((categoria: any) => categoria.categoria_id)
        .sort((a, b) => a - b);
      if (JSON.stringify(selectedOptions) !== JSON.stringify(categorias)) {
        setNeedSave(true);
      }
    }
  }, [selectedOptions]);

  return (
    <MainLayoutAutenticado notScroll marginTop={20}>
      <ButtonPerfil
        mt={64}
        fontsize={24}
        title="Perfil - Categorias"
        onPress={() => { }}
        image={
          needSave
            ? require('../../../../assets/img/icons/save.png')
            : require('../../../../assets/img/icons/save-mark.png')
        }
      />
      <View style={{ width: '100%', height: 100, display: 'flex', justifyContent: 'center', position: 'absolute', bottom: 180, zIndex: 100, backgroundColor: colors.white }}>
        <ButtonOutline
          title='Atualizar'
          onPress={() => savePerfil()}
        />
      </View>
      <FlatList
        data={listaCategorias}
        renderItem={renderItemSegundo}
        numColumns={screenWidth > 375 ? 3 : 2}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
        contentContainerStyle={{ paddingBottom: 200 }}
      />

    </MainLayoutAutenticado>
  );
}

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    maxWidth: screenWidth > 375 ? '30%' : '100%',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    alignItems: 'center',
  },
  block: {
    height: 100,
    width: '100%',
    borderRadius: 8,
    marginVertical: 5,
    backgroundColor: 'blue',
  },
});
