import { useEffect, useState } from 'react'
import { api } from '../../../service/api'
import { useIsFocused } from '@react-navigation/native'
import { useNavigate } from '../../../hooks/useNavigate'
import ButtonFiltro from '../../../components/buttons/ButtonFiltro'
import MainLayoutAutenticado from '../../../components/layout/MainLayoutAutenticado'

export default function DocumentosScreen() {
  const isFocused = useIsFocused()
  const { navigate } = useNavigate()
  const [loading, setLoading] = useState(true)
  const [documentos, setDocumentos] = useState([])

  async function getTermos() {
    setLoading(true)
    try {
      const response = await api.get(`/documentos`)
      setDocumentos(response.data.results)
    } catch (error: any) {
      console.log(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    getTermos()
  }, [isFocused])


  return (
    <MainLayoutAutenticado bottomDrawer loading={loading}>
      {documentos && documentos.map((documento: any) => (
        <ButtonFiltro
          key={documento.id}
          title={documento.titulo}
          isActive={documento.status}
          onPress={() => navigate('TermoModeloScreen', { documento })}
        />
      ))}
    </MainLayoutAutenticado>
  );
}
