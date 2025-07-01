import React from 'react'
import H3 from '../typography/H3'
import H5 from '../typography/H5'
import { View, Image } from 'react-native'
import Caption from '../typography/Caption'
import { colors } from '../../styles/colors'

interface PropsProduto {
  categoria_cupom: string,
  codigo_cupom: string,
  cupoms_disponiveis: number,
  data_validade: string,
  descricao_completa: string,
  descricao_oferta: string,
  imagem_anunciante: any,
  imagem_cupom: any,
  quantidade_cupons: number,
  titulo_oferta: string,
  vantagem_porcentagem: string,
  vantagem_reais: string
  status: string
}

export default function CardProdutoDetalhes(
  {
    categoria_cupom,
    codigo_cupom,
    cupoms_disponiveis,
    data_validade,
    descricao_completa,
    descricao_oferta,
    imagem_anunciante,
    imagem_cupom,
    quantidade_cupons,
    titulo_oferta,
    vantagem_porcentagem,
    vantagem_reais,
    status,
  }: PropsProduto) {

  function formatarNumeroParaData(numero: number) {
    const numeroString = numero.toString();

    if (numeroString.length !== 8) {
      return 'Formato de entrada inválido';
    }

    const dia = numeroString.slice(0, 2);
    const mes = numeroString.slice(2, 4);
    const ano = numeroString.slice(4, 8);

    const dataFormatada = `${dia}/${mes}/${ano}`;

    return dataFormatada;
  }

  return (
    <View className='rounded-xl p-4' style={{ backgroundColor: '#EEF0FF', borderColor: colors.secondary50, borderWidth: 3 }}>

      {imagem_cupom &&
        <Image className='w-full h-52 rounded-t-xl mb-2' source={{ uri: imagem_cupom }} />
      }

      <View className='flex-row'>
        {imagem_anunciante && imagem_anunciante != '-' &&
          <Image className='w-10 h-10 rounded-full mr-2' source={{ uri: imagem_anunciante }} />
        }
        <View>
          <H3>{titulo_oferta}</H3>
          <Caption color={colors.primary40} fontSize={14}>Categoria: {categoria_cupom}</Caption>
        </View>
      </View>

      <View className='mt-2 flex-row'>
        <H5>Status: </H5>
        {status === '1'
          ? <H5 color={colors.secondary70}>Ativo</H5>
          : <H5 color={colors.error40}>Desativado</H5>
        }
      </View>

      <View className='mt-2 flex-row'>
        <H5>Cupons disponíveis: {cupoms_disponiveis} / {quantidade_cupons}</H5>
      </View>

      <View className='mt-2 flex-row'>
        <H5>Validade: {data_validade}</H5>
      </View>

      <View className='mt-2'>
        <H5>Vantagem </H5>
        {vantagem_porcentagem && vantagem_porcentagem != '-' &&
          <Caption fontSize={16} margintop={4}>
            {vantagem_porcentagem}% de desconto
          </Caption>
        }
        {vantagem_reais && vantagem_reais != '-' &&
          <Caption fontSize={16} margintop={4}>
            R$: {vantagem_reais} de desconto
          </Caption>
        }
      </View>

      <View className='mt-2'>
        <H5>Código do cupom </H5>
        <Caption fontSize={16} margintop={4}>
          {codigo_cupom}
        </Caption>
      </View>

      <View className='mt-2'>
        <H5>Resumo</H5>
        <Caption fontSize={16} margintop={4}>
          {descricao_oferta}
        </Caption>
      </View>

      <View className='mt-2'>
        <H5>Descrição completa</H5>
        <Caption fontSize={16} margintop={4}>
          {descricao_completa}
        </Caption>
      </View>
    </View>

  )
}



