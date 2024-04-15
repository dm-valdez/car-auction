import { useMutation } from '@tanstack/react-query'
import { RegisterRequest } from '../lib/types.ts'
import { useAxiosWithAuth } from './useAxiosWithAuth.ts'
import { showErrorToast } from '../lib/utils.ts'

export default function useLogin() {
  const axiosInstance = useAxiosWithAuth()

  return useMutation({
    mutationKey: [ 'register' ],
    mutationFn: async (data: RegisterRequest) => {
      const response = await axiosInstance.post('/register', data)

      if (response.status === 409) {
        throw new Error('Email already exists.')
      }

      return response.data
    },
    onError: showErrorToast
  })
}
