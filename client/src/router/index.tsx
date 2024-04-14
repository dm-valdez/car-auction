import { createBrowserRouter } from 'react-router-dom'
import RootPage from '../pages/RootPage.tsx'
import HomePage from '../pages/HomePage.tsx'
import AuctionPage from '../pages/AuctionPage.tsx'
import ErrorPage from '../pages/ErrorPage.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: '/auctions',
        element: <AuctionPage />
      }
    ]
  },
])
