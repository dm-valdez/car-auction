import { useQuery } from '@tanstack/react-query'
import { useAxiosWithAuth } from './useAxiosWithAuth.ts'
import { formatDate, formatNumber } from '../lib/utils.ts'
import { Auction } from '../lib/types.ts'

export default function useAuctions() {
  const axiosInstance = useAxiosWithAuth()

  return useQuery({
    queryKey: [ 'auctions' ],
    queryFn: async () => {
      const response = await axiosInstance.get('/auctions')

      if (response.status !== 200) {
        throw new Error('Failed to fetch auctions.')
      }

      return response.data.map((auction: Auction) => {
        return {
          ...auction,
          expiry_date: formatDate(auction.expiry_date.toString()),
          opening_price: formatNumber(auction.opening_price),
          price_increment: formatNumber(auction.price_increment),
        }
      })
    },
  })
}
