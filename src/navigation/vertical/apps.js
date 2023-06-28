// ** Icons Import
import {  FilePlus, Eye,Map} from 'react-feather'

export default [
  {
    id: 'addProject',
    title: 'Create Project',
    icon: <FilePlus size={20} />,
    navLink: '/project'
  },
  
  {
    id: 'projecthistory',
    title: 'Project History',
    icon: <Eye size={20} />,
    navLink: '/projecthistory'
  },
  
  {
    id: 'MapView',
    title: 'Map View',
    icon: <Map size={20} />,
    navLink: '/mapview'
  },
]
