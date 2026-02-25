import React, { type ChangeEvent, type KeyboardEvent, type ClipboardEvent, type RefCallback } from 'react'
import { useTheme } from '../../../shared/hooks'

interface Props {
  value: string
  index: number
  inputRef: RefCallback<HTMLInputElement>
  onChange: (index: number, e: ChangeEvent<HTMLInputElement>) => void
  onKeyDown: (index: number, e: KeyboardEvent<HTMLInputElement>) => void
  onPaste: (e: ClipboardEvent<HTMLInputElement>) => void
}

export const VerifyCodeInput: React.FC<Props> = ({ value, index, inputRef, onChange, onKeyDown, onPaste }) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <input
      ref={inputRef}
      type='text'
      inputMode='numeric'
      maxLength={1}
      value={value}
      onChange={(e) => onChange(index, e)}
      onKeyDown={(e) => onKeyDown(index, e)}
      onPaste={onPaste}
      className={`
        w-14 h-14 text-center text-xl font-semibold rounded-lg border transition-colors duration-200 outline-none
        ${isDark ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}
        ${value
          ? 'border-indigo-500'
          : isDark ? 'border-gray-600' : 'border-gray-300'
        }
        focus:border-indigo-500
        ${isDark ? 'focus:ring-indigo-900' : 'focus:ring-indigo-100'}
        focus:ring-2
      `}
    />
  )
}