// ** React Imports
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Project = lazy(() => import('../../views/pages/project/Project'))

const ClientRoutes = [
  {
    element: <Project />,
    path: '/project',
    // meta: {
    //   appLayout: true,
    // //   className: 'email-application'
    // }
  },
]

export default ClientRoutes
