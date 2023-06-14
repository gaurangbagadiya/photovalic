// ** Icons Imports
import { Plus } from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Card, CardBody, CardText } from 'reactstrap'

const SubscribersGained = () => {
  return (
    <Card className='card-congratulations'>
      <CardBody className='text-center'>
        <Avatar icon={<Plus size={28} />} className='shadow' color='primary' size='xl' />
        <div className='text-center'>
          <h1 className='mb-1 text-white'><strong>Project History</strong></h1>
          <CardText className='m-auto w-75'>
            Empowering Lives with Photovoltaic Brilliance"
          </CardText>
        </div>
      </CardBody>
    </Card>
  )
}

export default SubscribersGained
