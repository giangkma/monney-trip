import { Control, Controller } from 'react-hook-form'

interface IProps {
  label?: string
  name: string
  control: Control<any>
}

export const CheckBox = ({ label, name, control }: IProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => {
        return (
          <div className="block  mt-2">
            <input
              className="cursor-pointer w-4 h-4"
              type="checkbox"
              checked={!!value}
              onBlur={onBlur}
              id={name}
              name={name}
              onChange={onChange}
            />
            {label && (
              <label
                className="inline-block pl-2 hover:cursor-pointer mb-0 text-lg"
                htmlFor={name}
              >
                {label}
              </label>
            )}
          </div>
        )
      }}
    />
  )
}
