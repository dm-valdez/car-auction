import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { FieldConfig } from './types.ts'

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
        // Add more validation rules as needed
        default:
          break
      }
    })
  })
  return errors
}
