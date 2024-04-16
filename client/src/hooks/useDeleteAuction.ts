import { useMutation } from '@tanstack/react-query'
import { useAxiosWithAuth } from './useAxiosWithAuth.ts'
import { showErrorToast } from '../lib/utils.ts'

export default function useDeleteAuction() {
  const axiosInstance = useAxiosWithAuth()

  return useMutation({
    mutationKey: [ 'delete-auction' ],
    mutationFn: async (id: number | null) => {
      const response = await axiosInstance.delete(`/auctions/${id}`)

      if (response.status !== 200) {
        throw new Error('Failed to create new auction.')
      }

      return response.data
    },
    onError: showErrorToast
  })
}
