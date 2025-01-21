import { create } from 'zustand'

type Item = {
  id_pacote: string,
  tipo_assinatura: string,
  tipo_pagamento: string,
  nome_pessoa: string,
  numero_cartao: string,
  data_validade: string,
  codigo_cvc: string,
  endereco_cobranca: string,
  endereco_numero: string,
  endereco_cep: string,
  endereco_uf: string,
  endereco_cidade: string,
  planos: string,
  cpf_titular: string
}

type DadosPagamento = {
  dadosPagamento: Item;
  setDadosPagamento: (dadosPagamento: Item) => void;
}

export const useDadosPagamento = create<DadosPagamento>((set) => {
  return {
    dadosPagamento: {
      id_pacote: '',
      cpf_titular: '',
      tipo_assinatura: '',
      tipo_pagamento: '',
      nome_pessoa: '',
      numero_cartao: '',
      data_validade: '',
      codigo_cvc: '',
      endereco_cobranca: '',
      endereco_numero: '',
      endereco_cep: '',
      endereco_uf: '',
      endereco_cidade: '',
      planos: ''
    },
    setDadosPagamento: (dadosPagamento: Item) => set({ dadosPagamento })
  }
})