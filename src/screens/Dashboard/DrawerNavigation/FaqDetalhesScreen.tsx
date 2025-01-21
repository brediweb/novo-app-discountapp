import H3 from '../../../components/typography/H3'
import { ScrollView, View } from 'react-native'
import H2 from '../../../components/typography/H2'
import Caption from '../../../components/typography/Caption'
import MainLayoutAutenticado from '../../../components/layout/MainLayoutAutenticado'
import HeaderPrimary from '../../../components/header/HeaderPrimary'
import { useNavigate } from '../../../hooks/useNavigate'

export default function FaqDetalhesScreen(props: any) {
  const detalhhes = props.route.params.item.faq
  const titulo = props.route.params.item.categoria
  const { navigate } = useNavigate()

  return (
    <MainLayoutAutenticado bottomDrawer marginTop={0} marginHorizontal={0}>
      <HeaderPrimary titulo={titulo} voltarScreen={() => navigate('FaqScreen')} />
      {detalhhes && detalhhes.map((item: any) => (
        <View className='mt-4 px-6' key={item.id}>
          <H3>{item.pergunta}</H3>
          <Caption>{item.resposta}</Caption>
        </View>
      ))}
    </MainLayoutAutenticado>
  );
}
