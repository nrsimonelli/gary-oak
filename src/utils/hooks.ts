import { useCallback, useEffect, useRef, useState } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useInput = (initialValue: string | number) => {
  const [value, setValue] = useState(initialValue)

  const handleChange = (event: { target: { value: any } }) => {
    setValue(event.target.value)
  }

  return {
    value,
    onChange: handleChange,
  }
}

export const useThrottle = (fn: Function, limit: number) => {
  const [isReady, setIsReady] = useState(true)
  const lastRan = useRef<number | undefined>(undefined)

  const throttledFunction = useCallback(
    (...args) => {
      if (!isReady) {
        return
      }
      setIsReady(false)
      fn(...args)
    },
    [isReady, fn]
  )

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!isReady) {
        lastRan.current = window.setTimeout(() => {
          setIsReady(true)
        }, limit)

        return () => window.clearTimeout(lastRan.current)
      }
    } else {
      console.warn('useThrottle: window is undefined.')
    }
  }, [isReady, limit])

  return [throttledFunction, isReady]
}
