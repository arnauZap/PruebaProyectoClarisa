/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from 'axios'
import { objectToQuery } from '../utils/api'
import AuthService from './AuthService'

export class ApiClientError extends Error {
  statusCode: number
  message: any
  name: string

  constructor(status: number, body: any) {
    super()

    if (body) {
      this.message = body
    }

    this.statusCode = status
    this.name = 'ApiClientError'
  }
}

class ApiClient {
  public static get(
    baseUrl: string,
    rute: string,
    data?: { [key: string]: any },
    headers?: any
  ) {
    return this._handleFetch(
      baseUrl,
      data ? `${rute}/?${objectToQuery(data)}` : rute,
      {
        method: 'GET',

        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      }
    )
  }

  private static formatData(data: any, headers: any) {
    let auxData: FormData | string | undefined = undefined

    if (!!data && headers['Content-Type'] == 'multipart/form-data') {
      auxData = new FormData()

      Object.entries(data).forEach(([key, value]: any) => {
        value && (auxData as FormData).append(key, value)
      })
    } else if (data) {
      auxData = JSON.stringify(data)
    }
    return auxData
  }
  public static post(
    baseUrl: string,
    rute: string,
    data: any = {},
    headers: any = {}
  ) {
    const formedData = this.formatData(data, headers)
    return this._handleFetch(baseUrl, rute, {
      method: 'POST',
      data: formedData,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    })
  }

  public static patch(
    baseUrl: string,
    rute: string,
    data: any,
    headers: any = {}
  ) {
    const formedData = this.formatData(data, headers)
    if (headers['Content-Type'] !== 'multipart/form-data') {
      headers['Content-Type'] = 'application/json'
    }
    return this._handleFetch(baseUrl, rute, {
      method: 'PATCH',
      data: formedData ?? null,
      headers,
    })
  }

  public static put(
    baseUrl: string,
    rute: string,
    data: any,
    headers: any = {}
  ) {
    const formedData = this.formatData(data, headers)
    return this._handleFetch(baseUrl, rute, {
      method: 'PUT',
      data: formedData ?? null,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    })
  }

  public static delete(baseUrl: string, rute: string) {
    return this._handleFetch(baseUrl, rute, {
      method: 'DELETE',
    })
  }

  private static async _handleFetch(
    baseUrl: string,
    route: string,
    options: Omit<RequestInit, 'data'> & { data?: any }
  ) {
    try {
      const { basic_access } = await AuthService.getAuthInfo()
      const url = `${baseUrl}/${route}`
      const headers = {
        ...(basic_access && {
          Authorization: `Basic ${basic_access}`,
        }),
        ...options.headers,
      } as any

      if (
        Object.keys(options.headers ?? {}).includes('Authorization') &&
        !(options.headers as any).Authorization
      ) {
        delete (headers as any).Authorization
      }

      const data = await axios
        .request({
          ...options,
          url,
          headers,
        } as any)
        .then((response) => {
          if (response.status < 200 || response.status >= 300) {
            throw new ApiClientError(response.status, response.data)
          } else return response.data
        })
        .catch((error) => {
          throw new ApiClientError(
            error.response?.status ?? 400,
            error.response?.data ?? error.message
          )
        })

      return data
    } catch (error) {
      throw new ApiClientError(
        (error as any).response?.status ?? 500,
        (error as any).message
      )
    }
  }
}

export default ApiClient
