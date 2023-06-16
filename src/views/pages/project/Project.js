import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row, Form, Label, Input, FormFeedback } from 'reactstrap'
import Breadcrumbs from '@components/breadcrumbs'
// ** Third Party Components
import Select from 'react-select'
import {  Plus } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapComponent.css';
import Marker from '../../../@core/assets/Marker.png';

import { selectThemeColors } from '@utils'

function Project() {

    const defaultValues = {
        latitude: "",
        longitude: "",
    };
    // const SignupSchema = yup.object().shape({
    //     email: yup.string().email().required(),
    //     lastName: yup.string().min(3).required(),
    //     firstName: yup.string().min(3).required(),
    //     password: yup.string().min(6).required()
    // })

    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const latitudeRef = useRef(null);
    const longitudeRef = useRef(null);

    const [step, setStep] = useState(0);

    
    const PvProduct = [
        { value: 'CLSC', label: 'crystal line silicon cells' },
        { value: 'CT', label: 'Cadmium Telluride' },
        { value: 'CIS', label: 'CIS or CIGS' },
        { value: 'unknown', label: 'Unknown' }
    ]

    
    const pvTechnologyOptions = [
        { value: 'ocean', label: 'Ocean' },
        { value: 'blue', label: 'Blue' },
        { value: 'purple', label: 'Purple' },
        { value: 'red', label: 'Red' },
        { value: 'orange', label: 'Orange' }
    ]

    const orientationOptions = [
        { value: 'north', label: 'North' },
        { value: 'south', label: 'South' },
        { value: 'east', label: 'East' },
        { value: 'weast', label: 'Weast' }
    ]



    // ** Hooks
    const {
        setValue,
        reset,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: 'onChange', defaultValues,
        //  resolver: yupResolver(SignupSchema) 
    })


    useEffect(() => {
        if (step == 1) {
            const mapOptions = {
                center: [50.8282, 12.9209],
                zoom: 12,
            };

            const markerSize = [30, 30]; // Customize the size of the marker icon

            let DefaultIcon = L.icon({
                iconUrl: Marker,
                iconSize: markerSize,
            });

            L.Marker.prototype.options.icon = DefaultIcon;

            const map = L.map(mapRef.current).setView(mapOptions.center, mapOptions.zoom);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);
            map.on('click', (event) => {
                if (markerRef.current) {
                    map.removeLayer(markerRef.current);
                }

                markerRef.current = L.marker(event.latlng).addTo(map);
                console.log("sdfsf", event.latlng);
                setValue("latitude", event.latlng.lat);
                setValue("longitude", event.latlng.lng);
                // latitudeRef.current.value = event.latlng.lat;
                // longitudeRef.current.value = event.latlng.lng;
            });

            return () => {
                map.remove();
            };
        }
    }, [step]);

    // const handleClick = () => {
    //     const latitude = latitudeRef.current.value;
    //     const longitude = longitudeRef.current.value;

    //     // Make an API call with the latitude and longitude values
    //     axiosBaseURL.post('/projects/add',
    //       { latitude: latitude, longitude: longitude },
    //     )
    //       .then(data => {
    //         // Process the API response
    //         console.log('data store:', data);
    //       })
    //       .catch(error => {
    //         console.error('error:', error);
    //       });
    //   };

    const onSubmit = data => {
        console.log("dataaa", data);
        if (Object.values(data).every(field => field.length > 0)) {
            console.log("data", data);
        }
    }

    const handleReset = () => {
        reset({
            latitude: "",
            longitude: "",
        })
    }



    return (
        <Fragment>
            <Breadcrumbs title='Projects' data={[{ title: 'Projects' }]} />
            <Row>
                <Col xs={12}>
                    {step == 0 ? (
                        <Card>
                            <CardHeader className="flex-md-row flex-column align-md-items-center align-items-center border-bottom">
                                <CardTitle tag="h4">Project List</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <div className="d-flex mt-1 mb-1">
                                    <Button
                                        className="me-1"
                                        color="primary"
                                        type="button"
                                        onClick={() => {
                                            setStep(1);
                                        }}
                                    >
                                        <Plus size={15} />
                                        Add Project
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>) : (
                        <Card className='mb-5'>
                            <CardHeader>
                                <CardTitle tag="h4">
                                    Add Project
                                </CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                <div className='mb-1'>
                                        <Label className='form-label' for='projectName'>
                                            Project Name
                                        </Label>
                                    </div>
                                    <div className='mb-1'>
                                        <Controller
                                            id='projectName'
                                            name='projectName'
                                            defaultValue=''
                                            control={control}
                                            render={({ field }) => <Input {...field} placeholder='projectName' invalid={errors.projectName && true} />}
                                        />
                                        {errors.projectName && <FormFeedback>{errors.projectName.message}</FormFeedback>}
                                    </div>


                                    <div className='mb-1'>
                                        <Label className='form-label' for='projectDescription'>
                                            Project Description
                                        </Label>
                                    </div>
                                    <div className='mb-1'>
                                        <Controller
                                            id='projectDescription'
                                            name='projectDescription'
                                            defaultValue=''
                                            control={control}
                                            render={({ field }) => <Input type='textarea' />}
                                        />
                                        {errors.projectDescription && <FormFeedback>{errors.projectDescription.message}</FormFeedback>}
                                    </div>


                                    <div className='mb-1'>
                                        <Label className='form-label' for='projectDescription'>
                                            Photovoltaic System Product
                                        </Label>
                                    </div>
                                    <div className='mb-1'>
                                        <Controller
                                            id='projectDescription'
                                            name='projectDescription'
                                            defaultValue=''
                                            control={control}
                                            render={({ field }) => <Select
                                                theme={selectThemeColors}
                                                className='react-select'
                                                classNamePrefix='select'
                                                {...field}
                                                // defaultValue={pvTechnologyOptions[0]}
                                                options={PvProduct}
                                                isClearable={false}
                                                invalid={errors.orientation && true} />}
                                        />
                                        {errors.projectDescription && <FormFeedback>{errors.projectDescription.message}</FormFeedback>}
                                    </div>


                                    <div className='mb-1'> <div id="map" ref={mapRef} style={{ width: 'flex', height: '600px', borderRadius: '5px' }}></div></div>

                                    <Row>
                                        <div className='mb-1'>  <h5> Select your Location On Map</h5></div>
                                        <Col md="2">
                                            <div className='mb-1'>
                                                <Label className='form-label' for='latitude'>
                                                    latitude
                                                </Label>
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className='mb-1'>
                                                <Controller
                                                    id='latitude'
                                                    name='latitude'
                                                    defaultValue=''
                                                    control={control}
                                                    render={({ field }) => <Input {...field} placeholder='latitude' invalid={errors.latitude && true} />}
                                                />
                                                {errors.latitude && <FormFeedback>{errors.latitude.message}</FormFeedback>}
                                            </div>
                                        </Col>
                                        <Col md="2">
                                            <div className='mb-1'>
                                                <Label className='form-label' for='longitude'>
                                                    longitude
                                                </Label>
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className='mb-1'>
                                                <Controller
                                                    id='longitude'
                                                    name='longitude'
                                                    defaultValue=''
                                                    control={control}
                                                    render={({ field }) => <Input {...field} placeholder='longitude' invalid={errors.longitude && true} />}
                                                />
                                                {errors.longitude && <FormFeedback>{errors.longitude.message}</FormFeedback>}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="2">
                                            <div className='mb-1'>
                                                <Label className='form-label' for='city'>
                                                    City :
                                                </Label>
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className='mb-1'>
                                                <Controller
                                                    id='city'
                                                    name='city'
                                                    defaultValue=''
                                                    control={control}
                                                    render={({ field }) => <Input {...field} placeholder='-' invalid={errors.city && true} />}
                                                />
                                                {errors.city && <FormFeedback>{errors.city.message}</FormFeedback>}
                                            </div>
                                        </Col>
                                        <Col md="2">
                                            <div className='mb-1'>
                                                <Label className='form-label' for='State'>
                                                    State :
                                                </Label>
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className='mb-1'>
                                                <Controller
                                                    id='State'
                                                    name='State'
                                                    defaultValue=''
                                                    control={control}
                                                    render={({ field }) => <Input {...field} placeholder='-' invalid={errors.State && true} />}
                                                />
                                                {errors.State && <FormFeedback>{errors.State.message}</FormFeedback>}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="2">
                                            <div className='mb-1'>
                                                <Label className='form-label' for='globalIrradiance'>
                                                    Global Irradiance :
                                                </Label>
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className='mb-1'>
                                                <Controller
                                                    id='globalIrradiance'
                                                    name='globalIrradiance'
                                                    defaultValue=''
                                                    control={control}
                                                    render={({ field }) => <Input {...field} placeholder='-kWh/m²' invalid={errors.globalIrradiance && true} />}
                                                />
                                                {errors.globalIrradiance && <FormFeedback>{errors.globalIrradiance.message}</FormFeedback>}
                                            </div>
                                        </Col>
                                        <Col md="2">
                                            <div className='mb-1'>
                                                <Label className='form-label' for='averageTemperature '>
                                                    Average Temperature  :
                                                </Label>
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className='mb-1'>
                                                <Controller
                                                    id='averageTemperature'
                                                    name='averageTemperature'
                                                    defaultValue=''
                                                    control={control}
                                                    render={({ field }) => <Input {...field} placeholder='-[°]' invalid={errors.averageTemperature && true} />}
                                                />
                                                {errors.averageTemperature && <FormFeedback>{errors.averageTemperature.message}</FormFeedback>}
                                            </div>
                                        </Col>
                                    </Row>





                                    <Row>
                                        <Col md="2">
                                            <div className='mb-1'>
                                            <Label className='form-label' for='peakPower'>
                                                Peak Power
                                            </Label>
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className='mb-1'>
                                                <Controller
                                                    id='globalIrradiance'
                                                    name='globalIrradiance'
                                                    defaultValue=''
                                                    control={control}
                                                    render={({ field }) => <Input {...field} placeholder='-kWh/m²' invalid={errors.globalIrradiance && true} />}
                                                />
                                                {errors.globalIrradiance && <FormFeedback>{errors.globalIrradiance.message}</FormFeedback>}
                                            </div>
                                        </Col>
                                        <Col md="2">
                                            <div className='mb-1'>
                                            <Label className='form-label' for='orientation'>
                                                    Orientation :
                                                </Label>
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className='mb-1'>
                                            <Controller
                                                    id='orientation'
                                                    name='orientation'
                                                    defaultValue=''
                                                    control={control}
                                                    render={({ field }) => <Select
                                                        theme={selectThemeColors}
                                                        className='react-select'
                                                        classNamePrefix='select'
                                                        {...field}
                                                        // defaultValue={pvTechnologyOptions[0]}
                                                        options={orientationOptions}
                                                        isClearable={false}
                                                        invalid={errors.orientation && true}
                                                    />}
                                                />
                                                {errors.orientation && <FormFeedback>{errors.orientation.message}</FormFeedback>}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="2">
                                            <div className='mb-1'>
                                                <Label className='form-label' for='slop'>
                                                    Inclination Slop [°] :
                                                </Label>
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className='mb-1'>
                                                <Controller
                                                    id='slop'
                                                    name='slop'
                                                    defaultValue=''
                                                    control={control}
                                                    render={({ field }) => <Input {...field} placeholder='10 slope degree' invalid={errors.slop && true} />}
                                                />
                                                {errors.slop && <FormFeedback>{errors.slop.message}</FormFeedback>}
                                            </div>
                                        </Col>
                                        <Col md="2">
                                            <div className='mb-1'>
                                                <Label className='form-label' for='elivation'>
                                                    Elivation(m) :
                                                </Label>
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className='mb-1'>
                                                <Controller
                                                    id='elivation'
                                                    name='elivation'
                                                    defaultValue=''
                                                    control={control}
                                                    render={({ field }) => <Input {...field} placeholder='elivation in m' invalid={errors.elivation && true} />}
                                                />
                                                {errors.elivation && <FormFeedback>{errors.elivation.message}</FormFeedback>}
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className='d-flex mb-2 mt-1'>
                                        <Button className='me-1' color='primary' type='submit'>
                                            Submit
                                        </Button>
                                        <Button outline color='secondary' type='reset' onClick={handleReset}>
                                            Reset
                                        </Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    )}
                </Col>
            </Row>
        </Fragment>
    )
}

export default Project
