import { useMutation } from '@tanstack/react-query'
import { NewBidRequest } from '../lib/types.ts'
import { useAxiosWithAuth } from './useAxiosWithAuth.ts'

export default function useNewBid() {
  const axiosInstance = useAxiosWithAuth()

  return useMutation({
    mutationKey: [ 'new-bid' ],
    mutationFn: async (data: NewBidRequest) => {
      const response = await axiosInstance.post('/bids/new', data)

      if (response.status !== 200) {
        throw new Error('Failed to create new bid.')
      }

      return response.data
    },
  })
}
