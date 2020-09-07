import axios, { AxiosResponse } from 'axios'

class HttpClient {
  async get (endpoint: string, headers: object): Promise<AxiosResponse> {
    const response = await axios.get(endpoint, { headers })
    return response
  }

  async post (endpoint: string, headers: object, body: object | string): Promise<AxiosResponse> {
    const response = await axios.post(endpoint, body, { headers })
    return response
  }
}

export default HttpClient
