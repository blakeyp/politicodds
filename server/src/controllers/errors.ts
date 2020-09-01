export class ApplicationError extends Error {
  status: number

  constructor (message: string, status: number) {
    super(message)
    this.status = status
    this.name = this.constructor.name
  }
}

export class BadRequestError extends ApplicationError {
  constructor () {
    super('Bad Request', 404)
  }
}
