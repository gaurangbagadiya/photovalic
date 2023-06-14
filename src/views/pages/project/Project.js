import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row, Form, Label, Input, FormFeedback } from 'reactstrap'
import Breadcrumbs from '@components/breadcrumbs'
// ** Third Party Components
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { Check, Plus } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapComponent.css';
import Marker from '../../../@core/assets/Marker.png';

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
        if (Object.values(data).every(field => field.length > 0)) {
            console.log("data", data);
        }
    }

    const handleReset = () => {
        reset({
            email: '',
            password: '',
            firstName: '',
            lastName: ''
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
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">
                                    Add Project
                                    {/* {step == 1 ? "Add Project" : "Edit Video"} */}
                                </CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <div className='mb-1'> <div id="map" ref={mapRef} style={{ width: '1080px', height: '600px', borderRadius: '5px' }}></div></div>

                                    <div className='mb-1'>  <h5> Select Project Location On Map</h5></div>
                                    <div className='mb-1'>
                                        <Label className='form-label' for='latitude'>
                                            Latitude
                                        </Label>
                                        <Controller
                                            id='latitude'
                                            name='latitude'
                                            defaultValue=''
                                            control={control}
                                            render={({ field }) => <Input {...field} placeholder='Bruce' invalid={errors.latitude && true} />}
                                        />
                                        {errors.latitude && <FormFeedback>{errors.latitude.message}</FormFeedback>}
                                    </div>

                                    <div className='mb-1'>
                                        <Label className='form-label' for='longitude'>
                                            Longitude
                                        </Label>
                                        <Controller
                                            id='longitude'
                                            name='longitude'
                                            defaultValue=''
                                            control={control}
                                            render={({ field }) => <Input {...field} placeholder='Bruce' invalid={errors.longitude && true} />}
                                        />
                                        {errors.longitude && <FormFeedback>{errors.longitude.message}</FormFeedback>}
                                    </div>




                                    <div className='mb-1'>
                                        <Label className='form-label' for='firstName'>
                                            First Name
                                        </Label>
                                        <Controller
                                            id='firstName'
                                            name='firstName'
                                            defaultValue=''
                                            control={control}
                                            render={({ field }) => <Input {...field} placeholder='Bruce' invalid={errors.firstName && true} />}
                                        />
                                        {errors.firstName && <FormFeedback>{errors.firstName.message}</FormFeedback>}
                                    </div>
                                    <div className='mb-1'>
                                        <Label className='form-label' for='lastName'>
                                            Last Name
                                        </Label>
                                        <Controller
                                            id='lastName'
                                            name='lastName'
                                            defaultValue=''
                                            control={control}
                                            render={({ field }) => <Input {...field} placeholder='Wayne' invalid={errors.lastName && true} />}
                                        />
                                        {errors.lastName && <FormFeedback>{errors.lastName.message}</FormFeedback>}
                                    </div>
                                    <div className='mb-1'>
                                        <Label className='form-label' for='email'>
                                            Email
                                        </Label>
                                        <Controller
                                            id='email'
                                            name='email'
                                            defaultValue=''
                                            control={control}
                                            render={({ field }) => (
                                                <Input {...field} type='email' placeholder='bruce.wayne@email.com' invalid={errors.email && true} />
                                            )}
                                        />
                                        {errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
                                    </div>
                                    <div className='mb-1'>
                                        <Label className='form-label' for='password'>
                                            Password
                                        </Label>
                                        <Controller
                                            id='password'
                                            name='password'
                                            defaultValue=''
                                            control={control}
                                            render={({ field }) => (
                                                <Input {...field} type='password' placeholder='Password' invalid={errors.password && true} />
                                            )}
                                        />
                                        {errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
                                    </div>
                                    <div className='d-flex'>
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
                </Col></Row>
        </Fragment>
    )
}

export default Project
