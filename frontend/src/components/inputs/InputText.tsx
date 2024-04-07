import { Input } from 'antd'
import { useState } from 'react'
import { Control, Controller } from 'react-hook-form'

interface IProps {
  control: Control<any>
  name: string
  placeholder: string
  error?: string
  label?: string
  type?: string
  required?: boolean
  className?: string
}

export const InputText = ({
  control,
  label,
  error,
  placeholder,
  name,
  required,
  className,
  type
}: IProps) => {
  const [isShowText, setIsShowText] = useState(false)
  const [typeInput, setTypeInput] = useState(type)
  const onToggleShowText = () => {
    setIsShowText((p) => !p)
    setTypeInput((p) => (p === 'password' ? 'text' : 'password'))
  }
  return (
    <div className={`relative w-full ${className}`}>
      {label && (
        <p className="mb-1 text-sm text-slate-600 dark:text-slate-200">
          {label}
        </p>
      )}
      <Controller
        control={control}
        name={name}
        rules={{
          required: required && 'This field is required'
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder={placeholder}
            onBlur={onBlur}
            onChange={onChange}
            className="w-full px-4 py-3 font-medium text-slate-800"
            value={value}
            type={typeInput}
          />
        )}
      />
      {type === 'password' &&
        (isShowText ? (
          <img
            src="svg/eye-slash.svg"
            onClick={onToggleShowText}
            className="absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2 cursor-pointer"
            alt=""
          />
        ) : (
          <img
            onClick={onToggleShowText}
            src="svg/eye.svg"
            className="absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2 cursor-pointer"
            alt=""
          />
        ))}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
