import { Control, Controller } from 'react-hook-form'

interface IProps {
  control: Control<any>
  name: string
  error?: any
  min?: number
  max?: number
  className?: string
  label?: string
  required?: boolean
  show?: boolean
}

export const InputNumber = ({
  control,
  className,
  error,
  name,
  min,
  label,
  max,
  required = true,
  show = true
}: IProps) => {
  if (!show) return null
  return (
    <div>
      {label && (
        <p className="mb-1 text-sm text-slate-600 dark:text-slate-200">
          {label}
        </p>
      )}
      <Controller
        control={control}
        name={name}
        rules={{
          required: required && 'Required',
          min:
            min != undefined
              ? {
                  value: min,
                  message: `Min is ${min}`
                }
              : '',
          max: max && {
            value: max,
            message: `Max is ${max}`
          }
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <input
            onBlur={onBlur}
            onChange={(e) => {
              onChange(Number(e.target.value))
            }}
            type="number"
            className={`w-10 rounded-md border border-slate-400 bg-white py-1 text-center text-slate-800 ${className}`}
            value={value}
          />
        )}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
