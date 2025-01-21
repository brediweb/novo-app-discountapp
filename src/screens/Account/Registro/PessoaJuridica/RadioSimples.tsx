import IcoPet from '../../../../svg/IcoPet'
import { api } from '../../../../service/api'
import IcoSaude from '../../../../svg/IcoSaude'
import IcoCamisa from '../../../../svg/IcoCamisa'
import React, { useEffect, useState } from 'react'
import IcoCarrinhos from '../../../../svg/IcoCarrinhos'
import LinearGradient from 'react-native-linear-gradient'
import IcoRestaurante from '../../../../svg/IcoRestaurante'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import Paragrafo from '../../../../components/typography/Paragrafo'
import { View, TouchableOpacity, Image, StyleSheet, FlatList, RefreshControl, Dimensions } from 'react-native'

interface RadioButtonProps {
  selectedOptions: string[];
  onSelectOption: (options: string[]) => void;
}

const RadioSimples: React.FC<RadioButtonProps> = ({ selectedOptions, onSelectOption }) => {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const screenWidth = Dimensions.get('window').width
  const handleSelectOption = (option: string) => {
    let updatedOptions: string[];

    if (selectedOptions.includes(option)) {
      // Remove option if it is already selected
      updatedOptions = selectedOptions.filter((selectedOption) => selectedOption !== option);
    } else {
      // Add option if it is not selected
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

    onSelectOption(updatedOptions);
  }
  const [listaCategorias, setListaCategorias] = useState([])

  async function getCategorias() {
    try {
      const response = await api.get('/categorias')
      setListaCategorias(response.data.results);

    } catch (error: any) {

    }
  }

  const renderItemSegundo = ({ item }: any) => (
    <View style={styles.container} >
      <View style={styles.column}>
        <LinearGradient
          style={[styles.block,
          selectedOptions?.includes(item.id) && { borderColor: '#775AFF', borderWidth: 4 }
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1.2 }}
          colors={[selectedOptions?.includes(item.id) ? '#C9BFFF' : '#775AFF', selectedOptions?.includes(item.id) ? '#C9BFFF' : '#B2C5FF']}
        >
          <TouchableOpacity
            className="flex-1 items-center justify-center"
            onPress={() => handleSelectOption(item.id)} >
            {item.categorias != '' ?
              <View className='mb-3'>
                {item.icon ? item.icon : <Image className='w-14 h-14' source={{ uri: item.icone }} />}
              </View>
              : item.icon ? item.icon : <Image className='w-14 h-14' source={{ uri: item.icone }} />
            }
            {item.categorias != '' &&
              <View className='absolute bottom-1'>
                <Paragrafo color={'#2F009C'} title={item.categorias} />
              </View>
            }
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  )

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 2000)
  }

  useEffect(() => {
    getCategorias()
  }, [])

  return (
    <View className='w-full flex-1 mt-4'>
      <FlatList
        data={listaCategorias}
        renderItem={renderItemSegundo}
        numColumns={3}
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
          />
        }
      />
    </View>
  );
};

export default RadioSimples;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    maxWidth: '33%',
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
