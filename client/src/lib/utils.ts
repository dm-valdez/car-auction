import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { FieldConfig } from './types.ts'
import { toast } from 'react-toastify'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validateFields(fields: { [key: string]: FieldConfig }): { [key: string]: string } {
  const errors: { [key: string]: string } = {}

  Object.keys(fields).forEach((fieldName) => {
    const value = fields[fieldName].value
    const rules = fields[fieldName].rules

    rules.forEach((rule) => {
      switch (rule.type) {
        case 'required':
          if (!value.trim()) {
            errors[fieldName] = rule.message
          }
          break
        case 'email':
          if (value.trim() && !isValidEmail(value)) {
            errors[fieldName] = rule.message
          }
          break
        case 'minLength':
          if (value.trim() && rule.minLength && value.length < rule.minLength) {
            errors[fieldName] = rule.message
          }
          break
        case 'matchField':
          const matchFieldName = rule.fieldName
          if (matchFieldName && fields[matchFieldName]) {
            const matchValue = fields[matchFieldName].value
            if (value !== matchValue) {
              errors[fieldName] = rule.message
            }
          }
          break
        case 'numeric':
          if (value.trim() && isNaN(Number(value))) {
            errors[fieldName] = rule.message
          }
          break
        case 'date':
          const currentDate = new Date()
          const selectedDate = new Date(value)
          const oneDayAhead = new Date(currentDate)
          oneDayAhead.setDate(currentDate.getDate() + 1)

          if (selectedDate <= oneDayAhead) {
            errors[fieldName] = rule.message
          }
          break

        // Add more validation rules as needed
        default:
          break
      }
    })
  })
  return errors
}

export function formatNumber(number: string | number) {
  let formattedNumber = number.toString()

  if (formattedNumber.includes('.00')) {
    formattedNumber = formattedNumber.replace('.00', '')
  }

  return formattedNumber
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)

  const year = date.getFullYear()
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const day = ('0' + date.getDate()).slice(-2)

  return `${year}-${month}-${day}`
}

export function showErrorToast(error: any) {
  const errorMessage = `Failed with status code ${error.status} and message of ${error.response.data.message}`

  console.error(errorMessage)

  toast.error(error.response.data.error)
}
