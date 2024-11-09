import { BACKEND_BASE_URL_V1 } from '../constants/servicesUrls'
import ApiClient from './ApiClient'

class PaymentService {
  public static sendPayment = async (form:{
    amount: number,
    currency: string,
    paymentMethodId: string
  }) => {
    const response = await ApiClient.post(
      BACKEND_BASE_URL_V1,
      `payment`,
      form,
      { Authorization: undefined }
    )
    console.log(`AuthService ~ signIn= ~ response:`, response)
    return response
  }
}

export default PaymentService
