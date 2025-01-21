import React from 'react'
import { useNavigate } from '../../../../hooks/useNavigate'
import ButtonFiltro from '../../../../components/buttons/ButtonFiltro'
import MainLayoutAutenticado from '../../../../components/layout/MainLayoutAutenticado'

export default function FiltroOfertas() {
  const { navigate } = useNavigate()

  return (
    <MainLayoutAutenticado bottomDrawer>
      <ButtonFiltro
        isActive={1}
        title='Melhores ofertas (em reais)'
        onPress={() => navigate('FiltroOfertasReaisScreen')}
      />
      <ButtonFiltro
        isActive={1}
        title='Melhores ofertas (em porcentagem)'
        onPress={() => navigate('FiltroOfertasPorcentagemScreen')}
      />
    </MainLayoutAutenticado>
  )
}
