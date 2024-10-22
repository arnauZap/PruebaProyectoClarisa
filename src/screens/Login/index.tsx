import React, { useState } from 'react'
import styles from './Login.styles'
import { View } from 'react-native'
import Text from '../../components/atomicComponents/Text'
import TextInput from '../../components/atomicComponents/TextInput'
import Button from '../../components/atomicComponents/Button'
import AuthService from '../../services/AuthService'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async () => {
    // Aquí puedes manejar la lógica de autenticación
    console.log('Email:', email)
    console.log('Password:', password)
    try {
      const response = await AuthService.signIn(email, password)
      console.log(`handleSubmit ~ response:`, response)
    } catch (error) {
      console.log(`handleSubmit ~ error:`, error)
      
    }
  }

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <Button onPress={handleSubmit}>Login</Button>
    </View>
  )
}

export default Login
