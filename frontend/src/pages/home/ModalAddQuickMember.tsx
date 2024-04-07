import { Button } from 'antd'
import { IAddMember } from 'domain/index'
import { InputText } from 'components/inputs/InputText'
import { PrimaryButton } from 'components/buttons/PrimaryButton'
import { PrimaryModal } from 'components/modals/PrimaryModal'
import { Spinner } from 'components/loading/Spinner'
import { randomId } from 'utils'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

interface IProps {
  setUsers: React.Dispatch<React.SetStateAction<any[]>>
}

export const ModalAddQuickMember = ({ setUsers }: IProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<IAddMember>({})

  const [loading, setLoading] = useState(false)
  const onSubmit = async (data: IAddMember) => {
    try {
      setLoading(true)
      const listNames = data.name.split(',')
      const newUsers = listNames.map((name) => ({
        ...data,
        name,
        paid: false,
        id: randomId()
      }))
      setUsers((p) => [...p, ...newUsers])
      resetForm()
    } catch (error: any) {
      toast.error(error.message as string)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setIsOpen(false)
    reset({
      name: '',
      deposit: 0
    })
  }

  return (
    <div>
      <Spinner loading={loading} />
      <Button
        onClick={() => setIsOpen(true)}
        className="h-12 ml-3 bg-blue-500 text-white"
      >
        + Nhanh
      </Button>
      <PrimaryModal
        title={`Thêm nhanh`}
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
            placeholder="Tên"
            name="name"
            control={control}
            error={errors?.name?.message}
            className="mb-3"
            required
            label="Tên (cách nhau bởi dấu phẩy)"
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
            <PrimaryButton type="submit" text={'Lưu'} />
          </div>
        </form>
      </PrimaryModal>
    </div>
  )
}
