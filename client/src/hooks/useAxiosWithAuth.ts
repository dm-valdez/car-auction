import axios from 'axios'

export function useAxiosWithAuth() {
  return axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
