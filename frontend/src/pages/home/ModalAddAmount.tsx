import { Button, Select } from 'antd'
import { useEffect, useState } from 'react'

import { IAddAmount } from 'domain/index'
import { InputSelect } from 'components/inputs/InputSelect'
import { InputText } from 'components/inputs/InputText'
import { PrimaryButton } from 'components/buttons/PrimaryButton'
import { PrimaryModal } from 'components/modals/PrimaryModal'
import { Spinner } from 'components/loading/Spinner'
import { randomId } from 'utils'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'

interface IProps {
  onAddAmount: (data: IAddAmount) => void
  users: any[]
  dataEdit: any
  onClose: () => void
  onEditAmount: (data: any) => void
}

export const ModalAddAmount = ({
  onAddAmount,
  onClose,
  dataEdit,
  users,
  onEditAmount
}: IProps) => {
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
      if (dataEdit) {
        onEditAmount(data)
      } else {
        onAddAmount({
          ...data,
          id: randomId()
        })
      }
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

  useEffect(() => {
    if (!!dataEdit) {
      setIsOpen(true)
      reset(dataEdit)
    }
  }, [dataEdit])

  return (
    <>
      <Spinner loading={loading} />
      <Button onClick={() => setIsOpen(true)} className="h-12">
        + Thêm mục chi
      </Button>
      <PrimaryModal
        title={dataEdit ? 'Sửa mục chi' : 'Thêm mục chi'}
        open={isOpen}
        onClose={() => {
          setIsOpen(false)
          reset()
          onClose()
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
          <PrimaryButton type="submit" text={dataEdit ? 'Lưu' : 'Thêm'} />
        </form>
      </PrimaryModal>
    </>
  )
}
