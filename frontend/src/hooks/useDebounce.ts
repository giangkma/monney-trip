import { useEffect, useState, useRef } from 'react'

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  const debounceTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    // Clear the previous timeout on every value change
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current)
    }

    // Set a new timeout with the updated value
    debounceTimeoutRef.current = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Clean up the timeout on unmount
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }
    }
  }, [value, delay])

  return debouncedValue
}
