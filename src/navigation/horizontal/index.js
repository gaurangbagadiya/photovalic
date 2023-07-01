// ** Navigation imports
import apps from './apps'
import pages from './pages'
import others from './others'
import dashboards from './dashboards'
import uiElements from './ui-elements'
import formsAndTables from './forms-tables'

// ** Merge & Export
export default [...dashboards, ...apps, ...uiElements, ...formsAndTables, ...pages, ...others]
