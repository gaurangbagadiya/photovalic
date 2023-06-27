// ** React Imports
import { Path } from 'leaflet-css'
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Project = lazy(() => import('../../views/pages/project/Project'))
const ProjectHistory = lazy(() => import('../../views/pages/project/ProjectHistory'))
const ProjectView = lazy(() => import('../../views/pages/project/ProjectView'))
const MapView = lazy(() => import('../../views/pages/project/MapView'))
const Report = lazy(() => import('../../views/pages/project/Report'))

const ClientRoutes = [
  {
    element: <Project />,
    path: '/project',
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
    element: <Report />,
    path: '/Report',
  },

]

export default ClientRoutes
