import { BACKEND_BASE_URL_V1 } from '../constants/servicesUrls'
import ApiClient from './ApiClient'
import CookieService from './CookieService'

export interface AuthParams {
	username: string
	password: string
	remember?: boolean
}

type AuthenticateResponse = {
	refresh: string
	access: string
	basic_access: string
	user_id: number
	farmer_id: number
	username: string
	email: string
	first_name: string
	last_name: string
}
class AuthService {
	
	public static signIn = async (username: string, password: string) => {
		const response = await ApiClient.get(
			BACKEND_BASE_URL_V1,
			``,
			undefined,
			{ Authorization: undefined }
		)
		console.log(`AuthService ~ signIn= ~ response:`, response)

	
	}

	public static getAuthInfo = async (): Promise<
		Partial<AuthenticateResponse> & { credential?: string }
	> => {
		try {
			const userLabels = CookieService.USER_INFO_LABELS
			const entriesUser = await Promise.all(
				Object.values(userLabels).map(async (key) => {
					const value = await CookieService.getData(key)
					return [key, value]
				})
			)
			return Object.fromEntries(entriesUser)
		} catch (error) {
			return {}
		}
	}
}

export default AuthService
