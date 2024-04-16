import { useMutation } from '@tanstack/react-query'
import { useAxiosWithAuth } from './useAxiosWithAuth.ts'
import { showErrorToast } from '../lib/utils.ts'

export default function useUpdateAuction() {
  const axiosInstance = useAxiosWithAuth()

  return useMutation({
    mutationKey: [ 'update-auction' ],
    mutationFn: async (data: any) => {
      const response = await axiosInstance.put(`/auctions/${data.id}`, data)

      if (response.status !== 200) {
        throw new Error('Failed to create new bid.')
      }

      return response.data
    },
    onError: showErrorToast
  })
}
