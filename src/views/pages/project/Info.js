import React, { Fragment, useEffect, useState } from 'react'
import Breadcrumbs from "@components/breadcrumbs";
import {
    Card,
    CardHeader,
    CardTitle,
    CardText,
    CardBody,
    Button,
    Col,
    Row,
    Label,
    Form,
    Input,
} from "reactstrap";
import { getAllPredefine } from '../../../@core/api/common_api';

function Info() {

    const [preData, setPreData] = useState([]);


    useEffect(() => {
        // console.log("stateeeee", state);
        getPerdifine();
    }, []);

    const getPerdifine = async () => {
        let response = await getAllPredefine();
        console.log(response);
        setPreData(response?.data);
    };

    return (
        <Fragment>
            <Breadcrumbs title="Information" data={[{ title: "General Information" }]} />
            <Row className='match-height'>
                <Card>
                    <CardHeader><h4><strong> What Is the predefined Product</strong></h4>
                    </CardHeader>
                </Card>
                {preData && preData.map((preData, index) => (
                    <Col lg='4' sm='12'>
                        <Card className='card-congratulations'>
                            <CardBody className='text-center'>
                                <div className='text-center'>
                                    <h5 className='mb-1 text-white'><strong>Product Name : {preData?.product_name}</strong></h5>
                                    <CardText className='m-auto w-75 text-align left'>
                                        <p>  Orientation : {preData?.orientation} facing</p>
                                        <p>   Elevation (area M²): {preData?.elevation}m²</p>
                                        <p>   Inclinatio slop[°] : {preData?.inclination}°</p>
                                        <p>   PeakPower  : {preData?.peak_power} kWh/m²</p>
                                        <p>   Efficiencey  : {preData?.efficiency} </p>
                                        {/* <p>   Watt  : {preData?.watt} </p> */}
                                        {/* <p>   Note : The installation of PV products is intended to utilize renewable solar energy as a sustainable and cost-effective solution for generating electricity.</p> */}
                                    </CardText>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Row className='match-height'>
                    <Card>
                        <CardHeader><h4><strong>More Information</strong></h4>
                        </CardHeader>
                        <CardBody>
                        <CardText>
                            <hr/>
                            <strong>Project Name :</strong> Here Users can provide a distinctive name or website address to designate their upcoming PV products for easy retrieval in the project history section.
                            <hr/>
                            <strong>Discription:</strong> use as a Project Note, The installation of PV (photovoltaic) products is aimed at harnessing solar energy to generate electricity for various applications.
                            <hr/>
                            <strong> Product Name : </strong>here you can select all the above predifines product and if you want to change the information on it you can changeit manually.
                            <hr/>
                            <strong> Lattitude & longitude : </strong>when you select your location on map you find the Lattitude and longitude for that location and you can write it.
                             <hr/>
                            <strong> City and state : </strong> Enter Your City and state
                            <hr/>
                            <strong> Peak Power : </strong>This is the power that the manufacturer declares that the PV array can produce under standard test conditions, which are a constant 1000W of solar irradiance per square meter in the plane of the array, at an array temperature of 25°C. The peak power should be entered in kilowatt-peak (kWp). If you do not know the declared peak power of your modules but instead know the area of the modules (in m2) and the declared conversion efficiency (in percent), you can calculate the peak power as power (W) = Area(m²) X (Global irradiance(W/m²) x efficiency (decimal or % values)).
                            <hr/>
                            <strong> Orientation  : </strong>on which direction you want to install your Product.
                            <hr/>
                            <strong> Inclination / Tilt [°] : </strong>This is the angle of the PV modules from the horizontal plane, for a fixed (non-tracking) mounting.
                                For some applications the slope and orientation angles will already be known, for instance if the PV modules are to be built into an existing roof. However, if you have the possibility to choose the slope and/or azimuth (orientation), this application can also calculate for you the optimal values for slope and orientation (assuming fixed angles for the entire year).
                            <hr/>
                            <strong> Elevation area in m² : </strong>what is the are, you are looking to install your pv product.
                        </CardText>
                        </CardBody>
                    </Card>
                </Row>
        </Fragment>
    )
}

export default Info
