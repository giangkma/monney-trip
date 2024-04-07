import { ILoginForm, ILoginResponse } from 'domain/login'
import { getData } from 'libs/firebase'

export const loginAPI = async (data: ILoginForm): Promise<ILoginResponse> => {
  const users = (await getData('users')) as ILoginResponse[]
  const user = users.find((user) => user.id === data.username)
  if (!user) throw new Error('Người dùng không tồn tại, hãy ấn đăng ký !')
  return user
}
