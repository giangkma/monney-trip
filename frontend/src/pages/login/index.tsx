import { loginAPI } from 'apis/login'
import { InputText } from 'components/inputs/InputText'
import ThemeToggle from 'components/layout/header/ThemeToggle'
import { Spinner } from 'components/loading/Spinner'
import { useAuthProvider } from 'contexts/AuthContext'
import { ILoginForm } from 'domain/login'
import { getData } from 'libs/firebase'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

export const Login = () => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<ILoginForm>({})

  const { setUser } = useAuthProvider()

  const [loading, setLoading] = useState(false)
  const username = getValues('username')

  const onSubmit = async (data: ILoginForm) => {
    try {
      setLoading(true)
      const user = await loginAPI(data)
      setUser(user)
    } catch (error: any) {
      toast.error(error.message as string)
    } finally {
      setLoading(false)
    }
  }

  const onSignUp = async () => {
    try {
      setLoading(true)
      const username = getValues('username')
    } catch (error: any) {
      toast.error(error.message as string)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Spinner loading={loading} />
      <div className="max-w-[360px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center"
        >
          <ThemeToggle />
          <h2 className="my-5 font-mono font-bold text-center text-xl">
            Đăng Nhập
          </h2>
          <InputText
            placeholder="Tên đăng nhập"
            name="username"
            control={control}
            error={errors?.username?.message}
            className="mb-3"
            required
          />
          <button
            type="submit"
            className="bg-slate-500 hover:bg-slate-700 text-white text-base rounded-lg py-2.5 px-5 transition-colors w-full text-[19px] mt-6"
          >
            Đăng Nhập
          </button>
        </form>
        <button
          onClick={onSignUp}
          className="bg-green-500 hover:bg-green-700 text-white text-base rounded-lg py-2.5 px-5 transition-colors w-full text-[19px] mt-3"
        >
          Đăng Ký Ngay
        </button>
      </div>
    </div>
  )
}
