import React, { Component, useState } from 'react'
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import api from '../services/api'

export default class Perfil extends Component {

    state = {
        nome: '',
        foto: '',
        user: ''
    }

    loadNome = async (usuario) => {
        const response = await api.get('/'+usuario)
        const user = response.data

        this.setState({
            nome: user.name,
            foto: user.avatar_url
        })
    }

    handleUser = (text) => {
        this.setState({ user: text })
    }

    handleButton = () => {
        this.loadNome(this.state.user)
    }

    render() {
        const pic = {
            uri: this.state.foto
        }

        return (
            <View style={ styles.container }>
                <TextInput style={ styles.textInput } onChangeText={ this.handleUser } ></TextInput>
                <TouchableOpacity style={ styles.button } onPress={ this.handleButton } >
                    <Text style={ styles.buttonText }>Enviar</Text>
                </TouchableOpacity>
                <Text style={ styles.nome }>{ this.state.nome }</Text>
                <Image style={ styles.foto } source={ pic } />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    nome: {
      fontFamily: 'Roboto',
      fontSize: '2em',
      color: '#f55',
      fontWeight: 'bold'
    },
    foto: {
        width: 200,
        height: 200,
        borderRadius: 100
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        height: 40, 
        backgroundColor: '#fff', 
        marginTop: 20, 
        borderRadius: 10,
        border: '5px solid',
        padding: 10, 
        fontSize: '1.2em', 
        textAlign: 'center', 
        color: '#f55'
    },
    button: {
        backgroundColor: '#f55',
        padding: 10,
        margin: 15,
        height: 40,
        width: '100%',
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff'
    }
});