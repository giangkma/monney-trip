import { Button, Select } from 'antd'
import { PrimaryButton } from 'components/buttons/PrimaryButton'
import { InputSelect } from 'components/inputs/InputSelect'
import { InputText } from 'components/inputs/InputText'
import { Spinner } from 'components/loading/Spinner'
import { PrimaryModal } from 'components/modals/PrimaryModal'
import { IAddAmount } from 'domain/index'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { randomId } from 'utils'

interface IProps {
  onAddAmount: (data: IAddAmount) => void
  users: any[]
}

export const ModalAddAmount = ({ onAddAmount, users }: IProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<IAddAmount>({})

  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: IAddAmount) => {
    try {
      setLoading(true)
      onAddAmount({
        ...data,
        id: randomId()
      })
      setIsOpen(false)
      reset()
    } catch (error: any) {
      toast.error(error.message as string)
    } finally {
      setLoading(false)
    }
  }

  const usersOptions = users.map((user) => ({
    label: user.name,
    value: user.id
  }))

  return (
    <>
      <Spinner loading={loading} />
      <Button onClick={() => setIsOpen(true)} className="h-12">
        + Thêm mục chi
      </Button>
      <PrimaryModal
        title="Thêm mục chi"
        open={isOpen}
        onClose={() => {
          setIsOpen(false)
          reset()
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-end"
        >
          <InputText
            placeholder="Tên mục chi"
            name="name"
            control={control}
            error={errors?.name?.message}
            className="mb-3"
            required
            label="Tên mục chi"
          />
          <InputText
            placeholder="Số tiền chi (VNĐ)"
            name="amount"
            control={control}
            error={errors?.amount?.message}
            className="mb-3"
            required
            type="number"
            label="Số tiền chi (VNĐ)"
          />
          <InputSelect
            label="Người chi"
            name="userPay"
            control={control}
            placeholder="Người chi"
            className="mb-3"
            options={usersOptions}
          />
          <PrimaryButton type="submit" text="Thêm" />
        </form>
      </PrimaryModal>
    </>
  )
}
