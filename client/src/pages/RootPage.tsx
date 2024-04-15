import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header.tsx'
import { Outlet } from 'react-router-dom'
import useAuthStatus from '../hooks/useAuthStatus.ts'
import useLogout from '../hooks/useLogout.ts'
import { useQueryClient } from '@tanstack/react-query'

export default function RootPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { data } = useAuthStatus()
  const logout = useLogout()

  const handleLogout = async () => {
    await logout.mutateAsync()
    await queryClient.invalidateQueries({ queryKey: [ 'user-auth-status' ] })
    navigate('/')
  }

  useEffect(() => {
    if (data && data.isLoggedIn) {
      navigate('/auctions')
    } else if (data && !data.isLoggedIn) {
      navigate('/')
    }
  }, [ data, navigate ])

  return (
    <React.Fragment>
      <Header authStatus={data} logout={handleLogout} />
      <Outlet />
    </React.Fragment>
  )
}
