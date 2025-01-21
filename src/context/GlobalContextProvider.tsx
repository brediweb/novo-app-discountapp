import { GlobalContextData } from './type'
import React, { useState, createContext, useContext } from 'react'

export const GlobalContext = createContext<GlobalContextData>({} as GlobalContextData)

export function GlobalContextProvider({ children }: { children: React.ReactNode }) {
  const [telefoneDigitado, setTelefoneDigitado] = useState('')
  const [userData, setUserData] = useState({ hasKeysRegistered: true })
  const [tipoUser, setTipoUser] = useState('')
  const [senhaUser, setSenhaUser] = useState('')
  const [usuarioLogado, setUsuarioLogado] = useState(false)
  const [statusTesteGratis, setStatusTesteGratis] = useState(false)
  const [update, setUpdate] = useState(0)

  const data = {
    userData,
    setUserData,
    telefoneDigitado,
    setTelefoneDigitado,
    tipoUser,
    setTipoUser,
    senhaUser,
    setSenhaUser,
    statusTesteGratis,
    setStatusTesteGratis,
    usuarioLogado,
    setUsuarioLogado,
    update,
    setUpdate
  }

  return (
    <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
  )
}

export const useGlobal = () => {
  return useContext(GlobalContext)
}
