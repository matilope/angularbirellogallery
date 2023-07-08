export interface TokensObservable {
  status: string,
  tokens: Token[]
}

export interface TokenObservable {
  status: string,
  tokens: Token
}

export interface Token {
  _id: string,
  token: Token
}
