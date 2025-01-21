import React from 'react'
import { useNavigate } from '../../../../hooks/useNavigate'
import ButtonFiltro from '../../../../components/buttons/ButtonFiltro'
import MainLayoutAutenticado from '../../../../components/layout/MainLayoutAutenticado'

export default function FiltrosScreen() {
  const { navigate } = useNavigate()
  return (
    <>
      <MainLayoutAutenticado bottomDrawer>
        <ButtonFiltro
          isActive={1}
          title='Localização'
          onPress={() => navigate('FiltroLocalizacaoScreen')}
        />
        <ButtonFiltro
          isActive={1}
          title='Melhores avaliações'
          onPress={() => navigate('FiltroAvaliacoesScreen')}
        />
        <ButtonFiltro
          isActive={1}
          title='Melhores ofertas'
          onPress={() => navigate('FiltroOfertasScreen')}
        />
        <ButtonFiltro
          isActive={1}
          onPress={() => navigate('FiltroCuponVigenteScreen')}
          title='Cupons vigentes'
        />
      </MainLayoutAutenticado>
    </>
  )
}
