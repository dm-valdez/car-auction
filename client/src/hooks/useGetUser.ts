import { useQuery } from '@tanstack/react-query'
import { useAxiosWithAuth } from './useAxiosWithAuth.ts'

export default function useGetUser(id: number | null) {
  const axiosInstance = useAxiosWithAuth()

  return useQuery({
    queryKey: [ `user-${id}` ],
    queryFn: async () => {
      const response = await axiosInstance.get(`/user/${id}`)

      if (response.status !== 200) {
        throw new Error('Failed to fetch user.')
      }

      return response.data
    },
    enabled: Boolean(id)
  })
}
