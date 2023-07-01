import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Error = lazy(() => import('../../views/pages/misc/Error'))
const AccountSettings = lazy(() => import('../../views/pages/account-settings'))
const PagesRoutes = [

  {
    path: '/pages/account-settings',
    element: <AccountSettings />
  },
  {
    path: '/pages/blog/detail',
    element: <Navigate to='/pages/blog/detail/1' />
  },
  {
    path: '/misc/error',
    element: <Error />,
    meta: {
      publicRoute: true,
      layout: 'blank'
    }
  }
]

export default PagesRoutes
