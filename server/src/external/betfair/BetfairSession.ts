import config from '../../config'
import HttpClient from '../http/HttpClient'

class BetfairSession {
  private token?: Token

  constructor (
    private http: HttpClient
  ) {}

  async getToken (): Promise<Token> {
    if (!this.token || this.token.hasExpired()) {
      this.token = await this.generateNewToken()
    }
    return this.token
  }

  private async generateNewToken (): Promise<Token> {
    const headers = {
      Accept: 'application/json',
      'X-Application': config.betfair.appKey,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const body = `username=${config.betfair.username}&password=${config.betfair.password}`
    const response = await this.http.post(
      config.betfair.sessionUrl,
      headers,
      body
    )
    return new Token(response.data.token)
  }
}

class Token {
  public expiresAt: Date

  constructor (public value: string) {
    // Expires 8 hours from creation
    this.expiresAt = new Date()
    this.expiresAt.setHours(this.expiresAt.getHours() + 8)
  }

  hasExpired (): boolean {
    const now = new Date()
    return now >= this.expiresAt
  }
}

export default BetfairSession
