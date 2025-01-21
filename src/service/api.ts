import axios from 'axios';

export const api_contrato = axios.create({
  baseURL: 'https://api-temp.vercel.app/api/app-discontapp',
});

export const api = axios.create({
  // baseURL: 'https://www.backend.discontapp.com.br/api',
  baseURL: 'https://discont.sitebeta.com.br/api',
});

export const api_cnpj = axios.create({
  baseURL: 'https://publica.cnpj.ws/cnpj',
});

export const api_ibge = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1',
});

export const api_ibge_locais = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades',
});

