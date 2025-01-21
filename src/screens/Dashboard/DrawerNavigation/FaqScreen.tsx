import { api } from '../../../service/api'
import { useEffect, useState } from 'react'
import { useNavigate } from '../../../hooks/useNavigate'
import ButtonFiltro from '../../../components/buttons/ButtonFiltro'
import MainLayoutAutenticado from '../../../components/layout/MainLayoutAutenticado'

export default function FaqScreen() {
  const { navigate } = useNavigate()
  const [faqs, setFaqs] = useState([])
  const [loading, setLoading] = useState(true)

  async function getFaq() {
    setLoading(true)
    try {
      const response = await api.get(`/faq`)
      setFaqs(response.data.results)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    getFaq()
  }, [])


  return (
    <MainLayoutAutenticado bottomDrawer loading={loading}>

      {faqs && faqs.map((item: any) => (
        <ButtonFiltro
          key={item.id}
          isActive={1}
          title={item.categoria}
          onPress={() => navigate('FaqDetalhesScreen', { item })}
        />
      ))}

    </MainLayoutAutenticado>
  );
}
