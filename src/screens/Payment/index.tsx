import React, { useState } from 'react'
import { View, Text, TextInput, Button, Alert } from 'react-native'
import {
  CardField,
  StripeProvider,
  useStripe,
} from '@stripe/stripe-react-native'
import PaymentService from '../../services/PaymentService'

function App() {
  return (
    <StripeProvider
      publishableKey={
        'pk_live_51HgFjQL7t90Ie9qsGe4n2D6LP0h2K9ZnZ8gvdchGjd1zUhos8BaEg3V5FkdOqC16nXNTCFoOoK8XSJimkAfqfwkl00B2ReYLAe'
      }
      // merchantIdentifier="merchant.identifier" // required for Apple Pay
      // urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    >
      <PaymentScreen />
    </StripeProvider>
  )
}

const PaymentScreen = () => {
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState('EUR')
  const [response, setResponse] = useState<any>(null)
  const stripe = useStripe()
  const [cardDetails, setCardDetails] = useState<any>({
    brand: 'MasterCard',
    complete: true,
    expiryMonth: 2,
    expiryYear: 27,
    last4: '3010',
    postalCode: '08500',
    validCVC: 'Valid',
    validExpiryDate: 'Valid',
    validNumber: 'Valid',
  })

  const handlePayment = async () => {
    const formatedAmount = Number.parseFloat(amount)
    if (!amount || isNaN(formatedAmount) || formatedAmount <= 0) {
      Alert.alert('Error', 'Por favor ingresa un monto válido.')
      return
    }

    console.log(`handlePayment ~ cardDetails:`, cardDetails)
    if (!cardDetails?.complete) {
      Alert.alert(
        'Error',
        'Por favor ingresa los detalles completos de la tarjeta.'
      )
      return
    }

    try {
      const { paymentMethod, error: paymentMethodError }: any =
        await stripe.createPaymentMethod({
          paymentMethodType: 'Card',
        })
      if (paymentMethodError) {
        Alert.alert('Error', paymentMethodError.message)
        return
      }

      if (!paymentMethod) {
        Alert.alert('Error', 'No se pudo crear el método de pago.')
        return
      }

      console.log(`handlePayment ~ paymentMethod:`, paymentMethod)

      // Crear el PaymentIntent en el backend
      console.log(
        `handlePayment ~ {
        amount: formatedAmount,
        currency,
        paymentMethodId: paymentMethod.id,
      }:`,
        {
          amount: formatedAmount,
          currency,
          paymentMethodId: paymentMethod.id,
        }
      )
      const response = await PaymentService.sendPayment({
        amount: formatedAmount,
        currency,
        paymentMethodId: paymentMethod.id,
      })

      if (response.success) {
        Alert.alert(
          'Éxito',
          `Pago realizado con éxito! ID del Pago: ${response.paymentIntent.id}`
        )
        setResponse({ success: true, paymentIntent: response.paymentIntent })
      } else {
        Alert.alert('Error', response.error)
      }
    } catch (error: any) {
      console.log(`handlePayment ~ error:`, error.message)
      setResponse({
        success: false,
        error: error.message || 'Ha ocurrido un error desconocido',
      })
    }
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Realizar un Pago</Text>
      <Text>Monto:</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
        keyboardType="numeric"
        value={amount}
        onChangeText={(text) => setAmount(text)}
      />
      {/* <Text>Moneda:</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
        value={currency}
        onChangeText={(text) => setCurrency(text)}
      /> */}

      <Text style={{ marginBottom: 10 }}>Detalles de la tarjeta:</Text>
      <CardField
        placeholders={{ number: '1234 1234 1234 1234' }}
        onCardChange={(cardDetails) => {
          console.log(`PaymentScreen ~ cardDetails:`, cardDetails)
          setCardDetails(cardDetails)
        }}
        style={{ height: 50, marginVertical: 20 }}
        postalCodeEnabled={false}
      />

      <Button title="Pagar" onPress={handlePayment} />

      {response && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18 }}>Respuesta del servidor:</Text>
          {response.success ? (
            <Text>
              ¡Pago realizado con éxito! ID del Pago:{' '}
              {response.paymentIntent.id}
            </Text>
          ) : (
            <Text>Error: {response.error}</Text>
          )}
        </View>
      )}
    </View>
  )
}

export default App
