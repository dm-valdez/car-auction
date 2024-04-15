import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header.tsx'
import { Outlet } from 'react-router-dom'
import useAuthStatus from '../hooks/useAuthStatus.ts'

export default function RootPage() {
  const navigate = useNavigate()
  const { data } = useAuthStatus()

  useEffect(() => {
    if (data && data.isLoggedIn) {
      console.info(data.isLoggedIn)
      navigate('/auctions')
    } else {
      navigate('/')
    }
  }, [data, navigate])

  return (
    <React.Fragment>
      <Header />
      <Outlet />
    </React.Fragment>
  )
}
