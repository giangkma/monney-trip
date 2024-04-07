import { ILoginResponse } from 'domain/login'

export const getToken = () => {
  const user = JSON.parse(
    localStorage.getItem('user') ?? '{}'
  ) as ILoginResponse

  return user?.id
}
