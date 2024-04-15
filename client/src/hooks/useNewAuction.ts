import { useMutation } from '@tanstack/react-query'
import { NewAuctionRequest } from '../lib/types.ts'
import { useAxiosWithAuth } from './useAxiosWithAuth.ts'

export default function useNewAuction() {
  const axiosInstance = useAxiosWithAuth()

  return useMutation({
    mutationKey: [ 'new-auction' ],
    mutationFn: async (data: NewAuctionRequest) => {
      const response = await axiosInstance.post('/auctions/new', data)

      if (response.status !== 200) {
        throw new Error('Failed to create new auction.')
      }

      return response.data
    },
  })
}
