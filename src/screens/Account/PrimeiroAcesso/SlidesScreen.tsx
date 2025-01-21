import React from 'react'
import TabView from './TabView'
import { View } from 'react-native'
import IcoMulherTablet from '../../../svg/IcoMulherTablet'
import IcoCupomDesconto from '../../../svg/IcoCupomDesconto'
import IcoHomenPensativo from '../../../svg/IcoHomenPensativo'
import CardPerfilAcesso from '../../../components/cards/CardPerfilAcesso'

export default function SlidesScreen({ navigation }: { navigation: any }) {

  return (
    <View className='flex-1 bg-white'>
      <TabView>
        <View className='flex-1 relative items-center justify-center mb-8'>
          <CardPerfilAcesso
            buttons={true}
            navigation={navigation}
            titulo='Crie seu perfil'
            svg={<IcoMulherTablet />}
            imagemIndicator={require('../../../../assets/img/primeiro-acesso/tab-1.png')}
            descricao='Quer anunciar? Quer descontos? Crie seu perfil de usuário e começe a buscar por cupons de desconto ou crie um cupom para melhorar as suas vendas!'
          />
        </View>

        <View className='flex-1 relative items-center justify-center mb-8'>
          <CardPerfilAcesso
            buttons={true}
            navigation={navigation}
            titulo='Crie seus Cupons'
            svg={<IcoHomenPensativo />}
            imagemIndicator={require('../../../../assets/img/primeiro-acesso/tab-2.png')}
            descricao='Crie cupons para seus produtos que estão em promoção e publique na timeline para os seus clientes, ajudando a melhorar as vendas!'
          />
        </View>

        <View className='flex-1 relative items-center justify-center mb-8'>
          <CardPerfilAcesso
            buttons={false}
            navigation={navigation}
            titulo='Escolha seus Cupons'
            svg={<IcoCupomDesconto />}
            imagemIndicator={require('../../../../assets/img/primeiro-acesso/tab-3.png')}
            descricao='Escolha a oferta que melhor atende a sua necessidades, clique em gerar cupom e pronto, é só apresentar na loja selecionada e realize a sua compra com descontos!'
          />
        </View>
      </TabView >
    </View >
  );
}
