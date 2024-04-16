import { useMutation } from '@tanstack/react-query'
import { useAxiosWithAuth } from './useAxiosWithAuth.ts'
import { showErrorToast } from '../lib/utils.ts'

export default function useLogout() {
  const axiosInstance = useAxiosWithAuth()

  return useMutation({
    mutationKey: [ 'logout' ],
    mutationFn: async () => {
      const response = await axiosInstance.get('/logout')

      if (response.status !== 200) {
        throw new Error('Unable to logout')
      }

      return response.data
    },
    onError: showErrorToast
  })
}
