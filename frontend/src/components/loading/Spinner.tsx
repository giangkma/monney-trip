import React from 'react'

interface IProps {
  loading: boolean
}

export const Spinner = ({ loading }: IProps) => {
  if (!loading) return
  return (
    <div className="fixed z-[999] w-full h-full top-0 left-0 flex items-center justify-center bg-black bg-opacity-40">
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-white border-r-transparent align-[-0.125em] text-secondary motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      ></div>
    </div>
  )
}
