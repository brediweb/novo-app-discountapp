import React, { ReactNode } from 'react'
import IcoClose from '../../svg/IcoClose'
import { Modal, View, TouchableOpacity, StyleSheet } from 'react-native'

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  width?: any
  padding?: any
  maxWidth?: any
  backgroundColor?: any
  closeSecondary?: boolean
  zIndex?: any
  backgroundColorSecondary?: any
}


const ModalTemplate: React.FC<ModalProps> = ({ visible, zIndex, onClose, children, width, padding, maxWidth, backgroundColor, closeSecondary, backgroundColorSecondary }) => {
  if (!visible) return null;

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

  return (
    <Modal animationType="slide" transparent visible={visible} style={{ zIndex: zIndex ?? 40 }}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {closeSecondary ?
            <></>
            :
            <TouchableOpacity onPress={onClose} className='absolute right-4 z-50 top-10'>
              <IcoClose />
            </TouchableOpacity>
          }
          {children}
        </View>
      </View>
    </Modal>
  );
};


export default ModalTemplate;
