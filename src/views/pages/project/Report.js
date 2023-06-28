import React, { useRef, useEffect, useState } from 'react'
import ReactToPrint from 'react-to-print'
import { Row, Col, Button, Card, CardBody, CardText } from 'reactstrap'
import { getAllProductsById, getProjectById } from '../../../@core/api/common_api';
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@components/breadcrumbs";



function Report() {

    const componentRef = useRef()
    const { state } = useLocation();
    const [projectData, setProjectData] = useState({});
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        if (state && state?.project_id) {
            getProjectDataById(state?.project_id);
            getProductsDataById(state?.project_id);
        }
        // return () => setBlock(false)
    }, []);

    const getProjectDataById = async (id) => {
        let response = await getProjectById(id);
        console.log("response", response);
        setProjectData(response?.data[0]);
    };
    const getProductsDataById = async (id) => {
        let response = await getAllProductsById(id);
        console.log("responseeee", response);
        setProductData(response?.data);
    };

    console.log(projectData)
    console.log(productData)

    return (
        <div>
            <Breadcrumbs title="Reports" data={[{ title: "Genrate Reports" }]} />

            <Row className='invoice-preview'>

                <Col xl={9} md={8} sm={12}>
                    <div ref={componentRef}>
                        <Card className='invoice-preview-card'>
                            <CardBody className='invoice-padding pb-0'>
                                {/* Header */}
                                <h3 className='text-primary invoice-logo'>Photovoltaic system Report </h3>
                                <div>
                                    <br />
                                </div>
                                <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0'>
                                    <div className='logo-wrapper'>
                                        <p className='mb-25'>Project Name : <strong>{projectData?.project_name}</strong> </p>
                                        <p className='mb-25'>Discription : {projectData?.project_description} </p>
                                    </div>
                                </div>
                                {/* /Header */}
                            </CardBody>
                            <div>
                                <hr className='invoice-spacing' />
                            </div>
                            {productData && productData.map((productData, index) => (
                                <CardBody className='invoice-padding pt-0'>
                                    <Row className='invoice-spacing'>
                                        <h6 className='mb-2'>product :<strong>{productData?.product_name} </strong></h6>
                                        <tr className='mb-2'>
                                            <td className='pe-1 mb-2'>Monthly energy output from fix-angle PV system:</td>
                                            <td>
                                                <span className='fw-bold'>#</span>
                                            </td>
                                        </tr>
                                        <h6 className='mb-2'>Project Details</h6>

                                    </Row>
                                    <Row className='invoice-spacing'>
                                        <Col className='p-1' xl='12'>
                                            <div className='invoice-total-wrapper'>
                                                <div className='invoice-total-item'>
                                                    Chart
                                                </div>
                                            </div>
                                        </Col>
                                        <Row className='invoice-spacing'>
                                            <Col className='p-1 mt-xl-0 mt-2' xl='6'>
                                                <h6 className='mb-2'>Location</h6>
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td className='pe-1'>Lattitude:</td>
                                                            <td>
                                                                <span className='fw-bold'>{productData?.latitude}</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className='pe-1'>Longtitude</td>
                                                            <td>
                                                                <span className='fw-bold'>{productData?.longitude}</span>
                                                            </td>

                                                        </tr>
                                                        <tr>
                                                            <td className='pe-1'>Location:</td>
                                                            <td>{productData?.city}, {productData?.state}</td>
                                                        </tr>

                                                    </tbody>
                                                </table>
                                            </Col>
                                            <Col className='p-1 mt-xl-0 mt-2' xl='6'>
                                                <h6 className='mb-2'>Simulation outputs:	</h6>
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td className='pe-1'>Peak Power</td>
                                                            <td>{productData?.peak_power} kWh/m²</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='pe-1'>Efficiencey</td>
                                                            <td>{productData?.efficiency}  kwh/m²</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='pe-1'>Slope angle [°]:
                                                                :</td>
                                                            <td>
                                                                <span className='fw-bold'>{productData?.inclination}°</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className='pe-1'>Orientation </td>
                                                            <td>{productData?.orientation} Facing</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='pe-1'>Elivation(m²) :
                                                                :</td>
                                                            <td>{productData?.elevation} m²</td>
                                                        </tr>

                                                    </tbody>
                                                </table>

                                            </Col>
                                        </Row>

                                        <div>
                                            <hr className='invoice-spacing' />
                                        </div>
                                    </Row>
                                </CardBody>

                            ))}

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
