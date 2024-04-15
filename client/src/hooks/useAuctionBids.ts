import { useQuery } from '@tanstack/react-query'
import { useAxiosWithAuth } from './useAxiosWithAuth.ts'
import { Bid } from '../lib/types.ts'
import { formatNumber } from '../lib/utils.ts'

export default function useAuctionBids(id: number | null) {
  const axiosInstance = useAxiosWithAuth()

  return useQuery({
    queryKey: [ `auction-bid-${id}` ],
    queryFn: async () => {
      const response = await axiosInstance.get(`/auctions/${id}/bids`)

      if (response.status !== 200) {
        throw new Error('Failed to fetch auction bids.')
      }

      return response.data.map((bid: Bid) => ({
        ...bid,
        amount: formatNumber(bid.amount)
      }))
    },
    enabled: Boolean(id)
  })
}
