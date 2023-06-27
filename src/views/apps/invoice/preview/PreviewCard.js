// ** Reactstrap Imports
import { Card, CardBody, CardText, Row, Col, Table } from 'reactstrap'

const PreviewCard = ({ data }) => {
  return data !== null ? (
    <Card className='invoice-preview-card'>
      <CardBody className='invoice-padding pb-0'>
        {/* Header */}
        <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0'>
          <div>
            <div className='logo-wrapper'>
              <h3 className='text-primary invoice-logo'>Pv Report </h3>
            </div>
            <CardText className='mb-25'>Project Name</CardText>
            <CardText className='mb-25'>Project Discription...............................</CardText>
          </div>
          <div className='mt-md-0 mt-2'>
            <div className='invoice-date-wrapper'>
              <p className='invoice-date-title'>Issued Date:</p>
              <p className='invoice-date'>{data.invoice.issuedDate}</p>
            </div>
            <div className='invoice-date-wrapper'>
              <p className='invoice-date-title'>Due Date:</p>
              <p className='invoice-date'>{data.invoice.dueDate}</p>
            </div>
          </div>
        </div>
        {/* /Header */}
      </CardBody>

      <hr className='invoice-spacing' />

      {/* Address and Contact */}
      <CardBody className='invoice-padding pt-0'>
        <Row className='invoice-spacing'>
          <h6 className='mb-2'>product 1 </h6>
          <tr>
            <td className='pe-1'>Monthly energy output from fix-angle PV system:</td>
            <td>
              <span className='fw-bold'>#</span>
            </td>
          </tr>
        </Row>
        <Row className='invoice-spacing'>
          <Col className='p-0' xl='6'>
            <h6 className='mb-2'>Project Details</h6>
            <div className='invoice-total-wrapper'>
              <div className='invoice-total-item'>
                Chart
              </div>
            </div>
          </Col>
          <Col className='p-0 mt-xl-0 mt-2' xl='3'>
            <h6 className='mb-2'>Location</h6>
            <table>
              <tbody>
                <tr>
                  <td className='pe-1'>Lattitude:</td>
                  <td>
                    <span className='fw-bold'>#</span>
                  </td>
                </tr>
                <tr>
                  <td className='pe-1'>Longtitude</td>
                  <td>#</td>
                </tr>
                <tr>
                  <td className='pe-1'>City:</td>
                  <td>#</td>
                </tr>
                <tr>
                  <td className='pe-1'>State</td>
                  <td>#</td>
                </tr>
              </tbody>
            </table>
          </Col>
          <Col className='p-0 mt-xl-0 mt-2' xl='3'>
            <h6 className='mb-2'>Simulation outputs:	</h6>
            <table>
              <tbody>
                <tr>
                  <td className='pe-1'>Peak Power              </td>
                  <td>#</td>
                </tr>
                <tr>
                  <td className='pe-1'>Global Irradiation</td>
                  <td>#</td>
                </tr>
                <tr>
                  <td className='pe-1'>Slope angle [°]:
                    :</td>
                  <td>
                    <span className='fw-bold'>#</span>
                  </td>
                </tr>
                <tr>
                  <td className='pe-1'>Orientation </td>
                  <td>#</td>
                </tr>
                <tr>
                  <td className='pe-1'>Elivation(m) :
                    :</td>
                  <td>#</td>
                </tr>

              </tbody>
            </table>
          </Col>
        </Row>
      </CardBody>

      <hr className='invoice-spacing' />


      {/* Total & Sales Person */}
      <CardBody className='invoice-padding pb-0'>
        <Row className='invoice-sales-total-wrapper'>
          <Col className='mt-md-0 mt-3' md='6' order={{ md: 1, lg: 2 }}>
            <CardText className='mb-0'>
              <span className='fw-bold'>Salesperson:</span> <span className='ms-75'>Alfie Solomons</span>
            </CardText>
          </Col>
          <Col className='d-flex justify-content-end' md='6' order={{ md: 2, lg: 1 }}>
            <div className='invoice-total-wrapper'>
              <div className='invoice-total-item'>
                <p className='invoice-total-title'>Subtotal:</p>
                <p className='invoice-total-amount'>$1800</p>
              </div>
              <div className='invoice-total-item'>
                <p className='invoice-total-title'>Discount:</p>
                <p className='invoice-total-amount'>$28</p>
              </div>
              <div className='invoice-total-item'>
                <p className='invoice-total-title'>Tax:</p>
                <p className='invoice-total-amount'>21%</p>
              </div>
              <hr className='my-50' />
              <div className='invoice-total-item'>
                <p className='invoice-total-title'>Total:</p>
                <p className='invoice-total-amount'>$1690</p>
              </div>
            </div>
          </Col>
        </Row>
      </CardBody>
    
    </Card>
  ) : null

}

export default PreviewCard
