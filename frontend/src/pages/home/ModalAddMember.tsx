import { Button } from 'antd'
import { PrimaryButton } from 'components/buttons/PrimaryButton'
import { InputText } from 'components/inputs/InputText'
import { Spinner } from 'components/loading/Spinner'
import { PrimaryModal } from 'components/modals/PrimaryModal'
import { IAddMember } from 'domain/index'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { randomId } from 'utils'

interface IProps {
  setUsers: React.Dispatch<React.SetStateAction<any[]>>
  users: any[]
}

export const ModalAddMember = ({ setUsers, users }: IProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [userSelected, setUserSelected] = useState<any>()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<IAddMember>({
    defaultValues: {
      name: userSelected?.name ?? '',
      deposit: userSelected?.deposit ?? 0
    }
  })

  const [loading, setLoading] = useState(false)
  const onSubmit = async (data: IAddMember) => {
    try {
      setLoading(true)
      if (userSelected) {
        setUsers((p) => {
          const index = p.findIndex((user) => user.id === userSelected.id)
          p[index] = {
            ...userSelected,
            ...data
          }
          return [...p]
        })
      } else {
        setUsers((p) => [
          ...p,
          {
            ...data,
            id: randomId()
          }
        ])
      }
      resetForm()
    } catch (error: any) {
      toast.error(error.message as string)
    } finally {
      setLoading(false)
    }
  }

  const removeUser = () => {
    setUsers((p) => {
      const index = p.findIndex((user) => user.id === userSelected.id)
      p.splice(index, 1)
      return [...p]
    })
    resetForm()
  }

  const resetForm = () => {
    setUserSelected(undefined)
    setIsOpen(false)
    reset({
      name: '',
      deposit: 0
    })
  }

  return (
    <div>
      <Spinner loading={loading} />
      <Button onClick={() => setIsOpen(true)} className="h-12">
        + Thêm thành viên
      </Button>
      <div className="mt-3 flex items-center gap-2 flex-wrap">
        {users?.map((user) => {
          return (
            <Button
              onClick={() => {
                setUserSelected(user)
                setIsOpen(true)
                reset(user)
              }}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              }
              className="flex items-center"
            >
              <span>{user.name}</span>
            </Button>
          )
        })}
      </div>
      <PrimaryModal
        title={`${!!userSelected ? 'Sửa thông tin' : 'Thêm'} thành viên`}
        open={isOpen}
        onClose={() => {
          resetForm()
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-end"
        >
          <InputText
            placeholder="Họ và tên"
            name="name"
            control={control}
            error={errors?.name?.message}
            className="mb-3"
            required
            label="Họ và tên"
          />
          <InputText
            placeholder="Tiền đã cọc (VNĐ)"
            name="deposit"
            control={control}
            error={errors?.deposit?.message}
            className="mb-3"
            required
            type="number"
            label="Tiền đã cọc (VNĐ)"
          />
          <div className="flex items-center gap-3">
            {userSelected && (
              <PrimaryButton
                onClick={removeUser}
                className="bg-red-600 text-white"
                text={'Xoá'}
              />
            )}
            <PrimaryButton type="submit" text={'Lưu'} />
          </div>
        </form>
      </PrimaryModal>
    </div>
  )
}
