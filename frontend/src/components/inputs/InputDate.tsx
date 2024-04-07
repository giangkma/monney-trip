import classNames from 'classnames'
import { Control, Controller, RegisterOptions } from 'react-hook-form'

interface IProps {
  control: Control<any>
  name: any
  error?: string
  label?: string
  disabled?: boolean
  rules?: RegisterOptions<any>
  type?: string
}

export const InputDate = ({
  control,
  disabled,
  label,
  error,
  name,
  rules,
  type = 'datetime-local'
}: IProps) => {
  return (
    <div className="w-full">
      {label && (
        <p className="text-slate-600 dark:text-slate-200 text-sm mb-1">
          {label}
        </p>
      )}
      <Controller
        control={control}
        name={name}
        rules={{
          required: 'This field is required',
          ...rules
        }}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <input
              type={type}
              onBlur={onBlur}
              onChange={onChange}
              className={classNames(
                'w-full bg-white px-6 py-3 mb-1 border border-slate-600 rounded-lg font-medium text-slate-800',
                {
                  '!bg-gray-400 pointer-events-none': disabled
                }
              )}
              value={value}
              disabled={disabled}
            />
          )
        }}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
