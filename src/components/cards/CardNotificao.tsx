import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native'

interface propsNotificacao {
  title: string,
  conteudo: string,
  link?: any,
  props?: any,
}

export default function CardNotificao({ title, conteudo, link, ...props }: propsNotificacao) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.conteudo}>{conteudo}</Text>
        <TouchableOpacity onPress={() => { Linking.openURL(link) }} >
          <Text style={styles.button}>Acessar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  card: {
    padding: 20,
    width: '100%',
    minHeight: 140,
    borderRadius: 8,
    marginVertical: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cardHeader: {
    width: '100%',
    flexDirection: 'column',
  },
  title: {
    fontSize: 24,
    color: '#0079BD',
    fontWeight: 'bold',
  },
  conteudo: {
    fontSize: 16,
    color: '#6F8790',
    fontWeight: 'normal',
  },
  button: {
    fontSize: 24,
    width: '100%',
    color: '#0079BD',
    fontWeight: 'bold',
    textAlign: 'right',
  },
});
