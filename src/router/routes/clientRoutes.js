// ** React Imports
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Project = lazy(() => import('../../views/pages/project/Project'))
const ProjectHistory = lazy(()=> import('../../views/pages/project/ProjectHistory'))
const ProjectView = lazy(()=> import('../../views/pages/project/ProjectView'))
const MapView = lazy(()=> import('../../views/pages/project/MapView'))
const Profile = lazy(()=> import('../../views/pages/project/Profile'))

const ClientRoutes = [
  {
    element: <Project />,
    path: '/project',
    // meta: {
    //   appLayout: true,
    // //   className: 'email-application'
    // }
  },
 
  {
    element: <ProjectHistory />,
    path: '/ProjectHistory',
  },
  {
    element: <ProjectView />,
    path: '/ProjectView',
  },
  {
    element: <MapView />,
    path: '/MapView',
  },
  {
    element: <Profile />,
    path: '/Profile',
  },
]

export default ClientRoutes
