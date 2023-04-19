export interface User {
  id: string,
  login: string,
  name: string,
  salary: number,
}

export interface UserPayload {
  results: User[];
}
