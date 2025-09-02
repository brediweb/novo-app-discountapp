import { View, Text, Image, TouchableOpacity, Touchable } from 'react-native';
import React, { useState } from 'react';
import { useGlobal } from '../../context/GlobalContextProvider';
import { useNavigate } from '../../hooks/useNavigate';
import { colors } from 'src/styles/colors';

export default function OnBoardingScreen() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const { tipoUser } = useGlobal();
  const { navigate } = useNavigate();

  const onBoardingCupom = [
    {
      id: 1,
      img: require('../../../assets/img/onBoarding/cupom/01.png'),
      text1: 'Vamos começar pelo menu:',
      text2: 'Aqui você tem acesso a todas as funcionalidades do app.',
    },
    {
      id: 2,
      img: require('../../../assets/img/onBoarding/cupom/02.png'),
      text1: 'Esta é a funcionalidade de notificações:',
      text2: 'Aqui você tem acesso as comunicações e novidades sobre o app.',
    },
    {
      id: 3,
      img: require('../../../assets/img/onBoarding/cupom/03.png'),
      text1: 'Esta é a funcionalidade de localização:',
      text2: 'Aqui você tem acesso as ofertas mais próximas de você.',
    },
    {
      id: 4,
      img: require('../../../assets/img/onBoarding/cupom/04.png'),
      text1: 'Esta é a funcionalidade de filtro:',
      text2: 'Aqui você realiza buscas por categorias.',
    },
    {
      id: 5,
      img: require('../../../assets/img/onBoarding/cupom/05.png'),
      text1: 'Esta é a funcionalidade de gerar cupom:',
      text2:
        'Aqui você cria um cupom de desconto para ser utilizado no estabelecimento selecionado.',
    },
    {
      id: 6,
      img: require('../../../assets/img/onBoarding/cupom/06.png'),
      text1: 'Esta é a página inicial, a nossa timeline:',
      text2: 'Aqui você pode visualizar todas as ofertas do app.',
    },
    {
      id: 7,
      img: require('../../../assets/img/onBoarding/cupom/07.png'),
      text1: 'Esta é a página de favoritos:',
      text2: 'Aqui você pode visualizar todas as ofertas que você mais gostou.',
    },
    {
      id: 8,
      img: require('../../../assets/img/onBoarding/cupom/08.png'),
      text1: 'Esta é a página de cupons utilizados:',
      text2: 'Aqui você pode visualizar todos os cupons que você já utilizou.',
    },
    {
      id: 9,
      img: require('../../../assets/img/onBoarding/cupom/09.png'),
      text1: 'Esta é a página do seu perfil:',
      text2: 'Aqui você pode editar suas informações e dados pessoais.',
    },
  ];

  const onBoardingAnunciante = [
    {
      id: 1,
      img: require('../../../assets/img/onBoarding/anunciante/01.png'),
      text1: 'Vamos começar pelo menu:',
      text2: 'Aqui você tem acesso a todas as funcionalidades do app.',
    },
    {
      id: 2,
      img: require('../../../assets/img/onBoarding/anunciante/02.png'),
      text1: 'Esta é a funcionalidade de notificações:',
      text2: 'Aqui você tem acesso as comunicações e novidades sobre o app.',
    },
    {
      id: 3,
      img: require('../../../assets/img/onBoarding/anunciante/03.png'),
      text1: 'Esta é a funcionalidade de filtro:',
      text2:
        'Aqui você realiza buscas por localização, melhores avaliações, melhores ofertas e cupons vigentes.',
    },
    {
      id: 4,
      img: require('../../../assets/img/onBoarding/anunciante/04.png'),
      text1: 'Esta é a página do seu perfil:',
      text2: 'Aqui você pode consultar o uso de seus cupons.',
    },
    {
      id: 5,
      img: require('../../../assets/img/onBoarding/anunciante/05.png'),
      text1: 'Esta é a página de criar cupons:',
      text2:
        'Aqui você pode criar seus anúncios/cupons para divulgar seus produtos.',
    },
    {
      id: 6,
      img: require('../../../assets/img/onBoarding/anunciante/06.png'),
      text1: 'Esta é a página de cupons utilizados:',
      text2: 'Aqui você pode visualizar todos os cupons que você já utilizou.',
    },
  ];

  const onBoarding = tipoUser === 'Anunciante' ? onBoardingAnunciante : onBoardingCupom;

  const ArrowPrev = () => (
    <TouchableOpacity
      onPress={() => {
        if (currentIdx > 0) {
          setCurrentIdx(currentIdx - 1);
        }
      }}
    >
      <Image
        source={require('../../../assets/img/onBoarding/arrowPrev.png')}
        className="h-4"
        resizeMode="contain"
      />
    </TouchableOpacity>
  );

  const ArrowNext = () => (
    <TouchableOpacity
      onPress={() => {
        if (currentIdx < onBoarding.length - 1) {
          setCurrentIdx(currentIdx + 1);
        }
      }}
    >
      <Image
        source={require('../../../assets/img/onBoarding/arrowNext.png')}
        className="h-4"
        resizeMode="contain"
      />
    </TouchableOpacity>
  );

  const handleComplete = () => {
    return navigate('HomeDrawerNavigation');
  };

  return (
    <View className="relative flex-1 bg-white">
      <Image
        source={require('../../../assets/img/onBoarding/top.png')}
        className="h-[16vh] w-full"
        resizeMode="stretch"
      />

      <View className="absolute top-[4vh] w-[88vw] rounded-sm self-center flex flex-row items-center justify-between gap-2">
        <ArrowPrev />
        <View className="flex flex-row gap-2 h-4 pb-2 justify-center items-center">
          {onBoarding.map((item, idx) => (
            <View
              key={item.id}
              className="w-4 h-2 rounded-sm"
              style={{
                backgroundColor: idx == currentIdx ? '#ABABAB' : '#FFFFFF',
              }}
            />
          ))}
        </View>
        <ArrowNext />
      </View>

      <View>
        <Image
          source={onBoarding[currentIdx].img}
          className="h-[50vh] w-full"
          resizeMode="contain"
        />
        <View className="px-4">
          <Text className="text-lg text-center font-bold mt-4">
            {onBoarding[currentIdx].text1}
          </Text>
          <Text className="text-sm text-center font-regular mt-2">
            {onBoarding[currentIdx].text2}
          </Text>
        </View>
      </View>

      {currentIdx < onBoarding.length - 1 ? (
        <View className="absolute bottom-4 w-full self-center flex flex-row justify-center gap-3">
          <TouchableOpacity
            onPress={handleComplete}
            className="w-[44vw] border border-brand-gray60 py-4 rounded-full"
          >
            <Text className="text-center font-bold">Pular</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (currentIdx < onBoarding.length - 1) {
                setCurrentIdx(currentIdx + 1);
              }
            }}
            className="w-[44vw] bg-black  py-4 rounded-full"
            style={{ backgroundColor: colors.secondary70 }}
          >
            <Text className="text-center text-white font-bold">Próximo</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          onPress={handleComplete}
          className="absolute bottom-4 self-center w-[44vw]  py-4 rounded-full"
          style={{ backgroundColor: colors.secondary70 }}
        >
          <Text className="text-center text-white font-bold">Concluir</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
