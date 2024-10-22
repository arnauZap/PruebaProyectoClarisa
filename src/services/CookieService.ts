import AsyncStorage from '@react-native-async-storage/async-storage'

export type UserInfoLabels =
	(typeof CookieService.USER_INFO_LABELS)[keyof typeof CookieService.USER_INFO_LABELS]
class CookieService {
	public static USER_INFO_LABELS = {
		REFRESH: 'refresh',
		ACCESS: 'access',
		BASIC_ACCESS: 'basic_access',
		USER_ID: 'user_id',
		FARMER_ID: 'farmer_id',
		USERNAME: 'username',
		EMAIL: 'email',
		FIRST_NAME: 'first_name',
		LAST_NAME: 'last_name'
	} as const

	public static async storeData(key: UserInfoLabels, value: string) {
		try {
			await AsyncStorage.setItem(key.toString() ?? '', value.toString())
		} catch (err) {
			throw new Error('Error storing data in LocalStorage')
		}
	}
	public static async getData(key: UserInfoLabels): Promise<string> {
		try {
			const value = await AsyncStorage.getItem(key ?? '')

			return value || ''
		} catch (err) {
			throw new Error('Error getting data in LocalStorage')
		}
	}

	public static async getNumericData(
		key: UserInfoLabels
	): Promise<number | undefined> {
		try {
			const value = await AsyncStorage.getItem(key)
			return parseInt(value!)
		} catch (err) {
			throw new Error('Error getting data in LocalStorage')
		}
	}
	public static removeAllCookies() {
		Object.values(this.USER_INFO_LABELS).forEach((key: string) => {
			AsyncStorage.removeItem(key)
		})
	}
}

export default CookieService
