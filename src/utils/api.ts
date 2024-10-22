/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from 'axios'

export function objectToQuery(params: any) {
	const queryParts = []
	for (const key in params) {
		if (Object.prototype.hasOwnProperty.call(params, key)) {
			queryParts.push(
				encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
			)
		}
	}
	return queryParts.join('&')
}

export function debounce(func: any, delay: number) {
	let timeout: NodeJS.Timeout
	return function (...args: any) {
		clearTimeout(timeout)
		timeout = setTimeout(() => {
			func(...args)
		}, delay)
	}
}

export function debounceFirst(fn:any, delay:any) {
	let timer = 0

	return function (...args:any) {
		if (Date.now() - timer > delay) {
			fn.apply(this , args)
		}
		timer = Date.now()
	}
}

export function encodeBasicAuthorization({
	username,
	password
}: {
	username: string
	password: string
}) {
	const str = `${username}:${password}`
	const chars =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=:'
	let output = ''

	for (
		let block = 0, charCode, i = 0, map = chars;
		str.charAt(i | 0) || ((map = '='), i % 1);
		output += map.charAt(63 & (block >> (8 - (i % 1) * 8)))
	) {
		charCode = str.charCodeAt((i += 3 / 4))

		if (charCode > 0xff) {
			throw new Error(
				'"btoa" failed: The string to be encoded contains characters outside of the Latin1 range.'
			)
		}

		block = (block << 8) | charCode
	}

	return output
}

export function decodeBasicAuthorization(encoded: string): string {
	const chars =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=:'
	let output = ''
	let block = 0
	let charCode = 0
	let bitCount = 0

	for (let i = 0; i < encoded.length; i++) {
		const char = encoded.charAt(i)
		if (char === '=') {
			break
		}

		const index = chars.indexOf(char)
		if (index === -1) {
			throw new Error('Invalid character in encoded string')
		}

		block = (block << 6) | index
		bitCount += 6

		if (bitCount >= 8) {
			charCode = (block >> (bitCount - 8)) & 0xff
			output += String.fromCharCode(charCode)
			bitCount -= 8
		}
	}

	const separatorIndex = output.indexOf(':')
	if (separatorIndex === -1) {
		throw new Error('Decoded string does not contain separator ":"')
	}

	return output
}

export const unPrintCurl = () => {
	axios.interceptors.request.clear()
}

export const printCurl = () => {
	axios.interceptors.request.use((config: any) => {
		let curlCmd = `curl -X ${config.method.toUpperCase()} '${config.url}'`

		if (config.headers) {
			Object.entries(config.headers).forEach(([key, value]) => {
				curlCmd += ` -H '${key}: ${value}'`
			})
		}

		if (config.data instanceof FormData) {
			for (const [key, value] of config.data._parts) {
				if (typeof value === 'string') {
					curlCmd += ` -F "${key}=${value}"`
				} else {
					curlCmd += ` -F "${key}=@${(value as any).uri}"`
				}
			}
		} else if (
			typeof config.data === 'object' ||
			typeof config.data === 'string'
		) {
			curlCmd += ` -d '${JSON.stringify(config.data)}'`
		}

		console.info(curlCmd)
		return config
	})
}

export const filterObjectEmpty = (obj: any) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const objFilteredEntries = Object.entries(obj).filter(([, value]) => !!value)
	const objFiltered = Object.fromEntries(objFilteredEntries)
	return objFiltered
}
