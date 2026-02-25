import React, { useRef, type ClipboardEvent, type KeyboardEvent, type ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
import { AuthLayout } from '../../layouts'
import { VerifyHeader, VerifyCodeInput, VerifyResend } from './components'
import { SpinnerContainer } from '../../shared/components/spinner'
import { LoginButton } from '../../shared/components/button'
import { useUsers } from '../../shared/hooks'
import { ErrorMessageForm } from '../../shared/components/error-message'

const CODE_LENGTH = 6
const DIGIT_INDEXES = Array.from({ length: CODE_LENGTH }, (_, i) => i)

interface VerifyFormInputs {
  digit_0: string
  digit_1: string
  digit_2: string
  digit_3: string
  digit_4: string
  digit_5: string
}

const defaultValues: VerifyFormInputs = {
  digit_0: '',
  digit_1: '',
  digit_2: '',
  digit_3: '',
  digit_4: '',
  digit_5: '',
}

export const ValidateAccount: React.FC = () => {
  const inputs = useRef<(HTMLInputElement | null)[]>([])
  const { isLoading } = useUsers()

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<VerifyFormInputs>({ defaultValues })

  const digits = watch()
  const isComplete = Object.values(digits).every((digit) => digit !== '')

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(-1)
    setValue(`digit_${index}` as keyof VerifyFormInputs, value)

    const hasValue = value !== ''
    const isNotLast = index < CODE_LENGTH - 1
    if (hasValue && isNotLast) inputs.current[index + 1]?.focus()
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    const isEmpty = digits[`digit_${index}` as keyof VerifyFormInputs] === ''
    const isNotFirst = index > 0

    if (e.key === 'Backspace' && isEmpty && isNotFirst) {
      inputs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, CODE_LENGTH)
    pasted.split('').forEach((char, i) => setValue(`digit_${i}` as keyof VerifyFormInputs, char))

    const lastFilledIndex = Math.min(pasted.length, CODE_LENGTH - 1)
    inputs.current[lastFilledIndex]?.focus()
  }

  const handleResend = () => {
    // lógica de reenvío
  }

  const onSubmit = (data: VerifyFormInputs) => {
    const code = Object.values(data).join('')
    console.log('Código:', code)
    // lógica de verificación
  }

  return (
    <AuthLayout
      imageDark='https://res.cloudinary.com/dlamufioy/image/upload/v1768278902/puntocom/Dise%C3%B1o_sin_t%C3%ADtulo_4_oswdzm.png'
      imageWhite='https://res.cloudinary.com/dlamufioy/image/upload/v1768278903/puntocom/Dise%C3%B1o_sin_t%C3%ADtulo_3_beh20d.png'
    >
      <div className='w-full px-2 md:px-10 lg:px-8'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center space-y-6'>
          <VerifyHeader />

          <div className='flex gap-8 justify-center'>
            {DIGIT_INDEXES.map((index) => {
              const fieldName = `digit_${index}` as keyof VerifyFormInputs
              const { ref, ...rest } = register(fieldName, { required: true, pattern: /^[0-9]$/ })

              return (
                <VerifyCodeInput
                  key={index}
                  index={index}
                  value={digits[fieldName] ?? ''}
                  inputRef={(el) => { ref(el); inputs.current[index] = el }}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  onPaste={handlePaste}
                />
              )
            })}
          </div>
          {(
            errors.digit_0?.message || 
            errors.digit_1?.message ||
            errors.digit_2?.message ||
            errors.digit_3?.message ||
            errors.digit_4?.message ||
            errors.digit_5?.message 
          ) ?? <ErrorMessageForm message='El código no es valido' />}

          {isLoading
            ? <SpinnerContainer size='md' color='border-white' />
            : <LoginButton className='w-full p-4 mt-8' submit text='Verificar cuenta' disabled={!isComplete} />
          }

          <VerifyResend onResend={handleResend} />
        </form>
      </div>
    </AuthLayout>
  )
}