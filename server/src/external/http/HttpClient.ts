import axios, { AxiosRequestHeaders, AxiosResponse } from 'axios'

class HttpClient {
  async get <T>(endpoint: string, headers: AxiosRequestHeaders): Promise<AxiosResponse<T>> {
    const response = await axios.get<T>(endpoint, { headers })
    return response
  }

  async post <T>(endpoint: string, headers: AxiosRequestHeaders, body: object | string): Promise<AxiosResponse<T>> {
    const response = await axios.post<T>(endpoint, body, { headers })
    return response
  }
}

export default HttpClient
