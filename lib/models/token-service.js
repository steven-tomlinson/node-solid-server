'use strict'

const ulid = require('ulid')

class TokenService {
  constructor () {
    this.tokens = {}
  }

  generate (data = {}) {
    const token = ulid()

    const value = {
      exp: new Date(Date.now() + 20 * 60 * 1000)
    }

    this.tokens[token] = Object.assign({}, value, data)

    return token
  }

  verify (token) {
    const now = new Date()

    let tokenValue = this.tokens[token]

    if (tokenValue && now < tokenValue.exp) {
      return tokenValue
    } else {
      return false
    }
  }

  remove (token) {
    delete this.tokens[token]
  }
}

module.exports = TokenService
