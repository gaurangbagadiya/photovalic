// ** Icons Import
import { Mail, MessageSquare, CheckSquare, Calendar, FileText, Circle, ShoppingCart, User, Shield, FilePlus, Eye,Map} from 'react-feather'

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

  {
    id: 'Report',
    title: 'Report',
    icon: <User size={20} />,
    navLink: '/report'
  },

 
]
