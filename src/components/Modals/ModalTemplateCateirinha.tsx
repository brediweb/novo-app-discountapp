import H3 from '../typography/H3'
import React, { useState } from 'react'
import IcoClose from '../../svg/IcoClose'
import Caption from '../typography/Caption'
import { colors } from '../../styles/colors'
import FilledButton from '../buttons/FilledButton'
import { useNavigate } from '../../hooks/useNavigate'
import { Modal, View, TouchableOpacity, StyleSheet } from 'react-native'

interface ModalProps {
    width?: any
    padding?: any
    maxWidth?: any
    visible: boolean
    onClose: () => void
    backgroundColor?: any
    closeSecondary?: boolean
    backgroundColorSecondary?: any
}

const ModalTemplateCateirinha: React.FC<ModalProps> = ({ visible, onClose, width, padding, maxWidth, backgroundColor, closeSecondary, backgroundColorSecondary }) => {
    if (!visible) return null
    const { navigate } = useNavigate()

    const styles = StyleSheet.create({
        modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: backgroundColorSecondary ?? 'rgba(0, 0, 0, 0.5)',
        },
        modalContent: {
            backgroundColor: backgroundColor ?? '#fff',
            padding: padding ?? 20,
            borderRadius: 8,
            width: width ?? '80%',
            maxWidth: maxWidth ?? 400,
        },
        closeButton: {
            marginTop: 10,
            alignSelf: 'flex-end',
        },
    })

    function onLogin() {
        navigate('LoginAnuncianteScreen')
        onClose()
    }

    function onCreate() {
        navigate('FormPessoaJuridicaScreen')
        onClose()
    }

    return (
        <Modal animationType="slide" transparent visible={visible}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TouchableOpacity onPress={onClose} className='absolute right-1 z-50 top-1'>
                        <IcoClose />
                    </TouchableOpacity>
                    <View className='mt-4'>
                        <H3 align={'center'} color='#000'>Para acessar essa área você precisa estar logado!</H3>
                        <Caption align={'center'}>
                            Crie uma conta ou faça login em uma conta existente
                        </Caption>
                        <View className='h-2'></View>
                        <FilledButton backgroundColor={colors.secondary50} onPress={onCreate} title='Criar conta' />
                        <View className='h-2'></View>
                        <FilledButton backgroundColor={colors.secondary50} onPress={onLogin} title='Fazer login' />
                    </View>
                </View>
            </View>
        </Modal>
    )
}


export default ModalTemplateCateirinha
