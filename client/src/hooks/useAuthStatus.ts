import { useQuery } from '@tanstack/react-query'
import { useAxiosWithAuth } from './useAxiosWithAuth.ts'
import { GetUserAuthStatusResponse } from '../lib/types.ts'
import { AxiosResponse } from 'axios'

export default function useAuthStatus() {
  const axiosInstance = useAxiosWithAuth()

  return useQuery({
    queryKey: [ 'user-auth-status' ],
    queryFn: async (): Promise<GetUserAuthStatusResponse> => {
      const response = await axiosInstance.get('/login') as AxiosResponse<GetUserAuthStatusResponse>

      if (response.status !== 200) {
        throw new Error('Unable to get auth status.')
      }

      return response.data
    },
  })
}
