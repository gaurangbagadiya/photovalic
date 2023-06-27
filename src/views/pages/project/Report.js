import React, { useRef } from 'react'
import ReactToPrint from 'react-to-print'
import { Row, Col, Button, Card, CardBody, CardText } from 'reactstrap'


function Report() {

    const componentRef = useRef()
    
    return (
        <div>

            <Row className='invoice-preview'>
                <Col xl={9} md={8} sm={12}>
                    <div ref={componentRef}>
                        <Card className='invoice-preview-card'>
                            <CardBody className='invoice-padding pb-0'>
                                {/* Header */}
                                <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0'>
                                    <div className='logo-wrapper'>
                                        <h3 className='text-primary invoice-logo'>Pv Report </h3>
                                        <div className='invoice-date-wrapper'>
                                            <p className='invoice-date-title'>Issued Date: '{ }'</p>
                                            <p className='invoice-date'>.</p>
                                        </div>
                                        <hr className='invoice-spacing' />

                                        <p className='mb-25'>Project Name</p>
                                        <p className='mb-25'>Project Discription....................sdfdddddddddddddddddddddddddddddddddddddddddddddd...........</p>
                                        <hr className='invoice-spacing' />
                                    </div>
                                </div>
                                {/* /Header */}
                            </CardBody>

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


                        </Card>

                    </div>
                </Col>


                <Col xl={3} md={4} sm={12}>
                    <Card>
                        <CardBody>
                            <ReactToPrint trigger={() => <Button color='success' block out className='me-1 mb-75' type="submit"> Download</Button>}
                                content={() => componentRef.current}
                            />
                        </CardBody>
                    </Card>

                </Col>
            </Row>
        </div>
    )
}

export default Report
