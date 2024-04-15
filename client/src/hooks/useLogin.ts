import { useMutation } from '@tanstack/react-query'
import { LoginRequest } from '../lib/types.ts'
import { useAxiosWithAuth } from './useAxiosWithAuth.ts'

export default function useLogin() {
  const axiosInstance = useAxiosWithAuth()

  return useMutation({
    mutationKey: [ 'login' ],
    mutationFn: async (data: LoginRequest) => {
      const response = await axiosInstance.post('/login', data)

      if (response.status !== 200) {
        throw new Error('Unable to login')
      }

      return response.data
    },
  })
}
