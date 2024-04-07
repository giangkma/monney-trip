import React from 'react'

interface IProps {
  title: string
  children: React.ReactNode
  open: boolean
  onClose: () => void
  className?: string
}

export const PrimaryModal = ({
  className,
  title,
  open,
  onClose,
  children
}: IProps) => {
  if (!open) return null
  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 shadow-xl bg-black bg-opacity-80 w-full h-full flex items-start justify-center z-50">
      <div
        className={`mx-4 sm:min-w-[30rem] max-h-[calc(100%-5rem)] overflow-auto rounded-lg mt-40 bg-white dark:bg-slate-800 sm:p-6 p-4 ${className}`}
      >
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-xl">{title}</h1>
          <button className="" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <hr className="my-4" />
        {children}
      </div>
    </div>
  )
}
