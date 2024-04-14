import React from 'react'
import Header from '../components/Header.tsx'
import { Outlet } from 'react-router-dom'

export default function RootPage() {
  return (
    <React.Fragment>
      <Header />
      <Outlet />
    </React.Fragment>
  )
}
