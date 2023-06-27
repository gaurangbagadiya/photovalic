// ** React Imports
import { Link } from 'react-router-dom'

// ** Reactstrap Imports
import { Card, CardBody, Button } from 'reactstrap'

const PreviewActions = ({ id, setSendSidebarOpen, setAddPaymentOpen }) => {
  return (
    <Card className='invoice-action-wrapper'>
      <CardBody>
        {/* <Button color='primary' block className='mb-75' onClick={() => setSendSidebarOpen(true)}>
          Send Invoice
        </Button> */}
        <Button color='primary' block out className='me-1 mb-75' onClick={() => handleUpdateProject(project.id)}>
          Update Project
        </Button>

        <Button color='success' tag={Link} to='/apps/invoice/print' target='_blank' block  className='mb-75'>
          Download Report
        </Button>
      </CardBody>
    </Card>
  )
}

export default PreviewActions
