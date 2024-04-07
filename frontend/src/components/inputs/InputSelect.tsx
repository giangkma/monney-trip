import { Select } from 'antd'
import { Control, Controller } from 'react-hook-form'

interface IProps {
  control: Control<any>
  name: string
  placeholder: string
  error?: string
  label?: string
  required?: boolean
  className?: string
  options: any[]
}

export const InputSelect = ({
  control,
  label,
  error,
  placeholder,
  name,
  required,
  className,
  options
}: IProps) => {
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
          <Select
            placeholder={placeholder}
            onBlur={onBlur}
            onChange={onChange}
            className="w-full h-12"
            value={value}
            options={options}
          />
        )}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
