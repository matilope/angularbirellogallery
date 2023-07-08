export interface UsersObservable {
  status: string,
  users: User[]
}

export interface UserObservable {
  status: string,
  users: User
}

export interface User {
  _id?: string,
  email: string,
  password: string,
  token?: string
}
