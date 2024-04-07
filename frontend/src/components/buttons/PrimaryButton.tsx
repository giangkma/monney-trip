interface IProps {
  text: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

export const PrimaryButton = ({
  text,
  type = 'button',
  className,
  onClick
}: IProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`dark:bg-slate-700 bg-slate-300 p-2 border rounded-lg px-6 hover:bg-slate-200 hover:scale-105 transition-all duration-300 ease-in-out ${className}`}
    >
      {text}
    </button>
  )
}
