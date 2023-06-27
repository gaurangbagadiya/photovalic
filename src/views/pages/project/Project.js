import React, { Fragment, useEffect, useRef, useState } from "react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col,
    Row,
    Form,
    Label,
    Input,
    FormFeedback,
} from "reactstrap";
import Breadcrumbs from "@components/breadcrumbs";
// ** Third Party Components
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { Info } from "react-feather";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./MapComponent.css";
import Marker from "../../../@core/assets/Marker.png";

import { selectThemeColors } from "@utils";
import {
    getAllPredefine,
    insertProduct,
    insertProject,
    updateProduct,
} from "../../../@core/api/common_api";
import { useLocation, useNavigate } from "react-router-dom";
import { notification } from "../../../@core/constants/notification";

function Project() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const defaultValues = {
        latitude: "",
        longitude: "",
    };

    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const latitudeRef = useRef(null);
    const longitudeRef = useRef(null);

    // const [step, setStep] = useState(0);
    const [preData, setPreData] = useState([]);
    const [projectData, setProjectData] = useState({});

    const orientationOptions = [
        { value: "North", label: "North" },
        { value: "South", label: "South" },
        { value: "East", label: "East" },
        { value: "Weast", label: "Weast" },
    ];

    // ** Hooks
    const {
        setValue,
        reset,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        defaultValues,
        //  resolver: yupResolver(SignupSchema)
    });

    useEffect(() => {
        // console.log("stateeeee", state);
        if (state && state?.project_id) {
            setValue("project_name", state?.project_name);
            setValue("project_description", state?.project_description);
            setValue("project_id", state?.project_id);
            setProjectData({ ...projectData, ...state })
            // setProjectData(prevData =>{...prevData,})
        }
        getPerdifine();
    }, []);

    useEffect(() => {
        // if (step == 1) {
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

        const map = L.map(mapRef.current).setView(
            mapOptions.center,
            mapOptions.zoom
        );

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {}).addTo(
            map
        );
        map.on("click", (event) => {
            if (markerRef.current) {
                map.removeLayer(markerRef.current);
            }

            markerRef.current = L.marker(event.latlng).addTo(map);
            // console.log("sdfsf", event.latlng, projectData);
            // setProjectData({ ...projectData, latitude: event.latlng.lat, longitude: event.latlng.lng })
            setProjectData(prevData => ({ ...prevData, latitude: event.latlng.lat, longitude: event.latlng.lng }))
            setValue("latitude", event.latlng.lat);
            setValue("longitude", event.latlng.lng);
            // setProjectData({ ...projectData, latitude: event.latlng.lat, longitude: event.latlng.lng })
            // latitudeRef.current.value = event.latlng.lat;
            // longitudeRef.current.value = event.latlng.lng;
        });

        return () => {
            map.remove();
        };
        // }
    }, []);

    const getPerdifine = async () => {
        let response = await getAllPredefine();
        // console.log(response);
        setPreData(response?.data);
    };

    const onSubmit = async (data) => {
        // console.log("dataaa", data);

        if (state && state?.project_id) {
            // type-0 : add product
            // type-1:update product

            if (state?.type == 0) {
                let response = await insertProduct(projectData);
                // console.log("respo", response);
                notification({
                    type: response?.status == 1 ? "success" : "error",
                    message: response.message,
                });

                if (response?.status == 1) {
                    navigate("/projectview", { state: { project_id: state?.project_id } });
                }
            }
            else {
                let response = await updateProduct(projectData);
                // console.log("respo", response);
                notification({
                    type: response?.status == 1 ? "success" : "error",
                    message: response.message,
                });

                if (response?.status == 1) {
                    navigate("/projectview", { state: { project_id: state?.project_id } });
                }
            }
        } else {
            let response = await insertProject(projectData);
            // console.log("respo", response);
            notification({
                type: response?.status == 1 ? "success" : "error",
                message: response.message,
            });

            if (response?.status == 1) {
                navigate("/projectview", {
                    state: { project_id: response?.projectData?._id },
                });
            }
        }
    };

    const handleReset = () => {
        reset({
            latitude: "",
            longitude: "",
        });
    };



    return (
        <Fragment>
            <Breadcrumbs title="Projects" data={[{ title: "Projects" }]} />
            <Row>
                <Col xs={12}>
                    {/* {step == 0 ? (
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
                            </Card>) : ( */}
                    <Card className="mb-5">
                        <CardHeader>
                            <CardTitle tag="h4">Add Project</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-1">
                                    <Label className="form-label" for="project_name">
                                        Project Name
                                    </Label>
                                </div>
                                <div className="mb-1">
                                    <Controller
                                        id="project_name"
                                        name="project_name"
                                        defaultValue=""
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                disabled={state && state?.project_id}
                                                value={projectData?.project_name}
                                                onChange={(e) => {
                                                    setProjectData({
                                                        ...projectData,
                                                        project_name: e.target?.value,
                                                    });
                                                }}
                                                placeholder="project Name"
                                                invalid={errors.project_name && true}
                                            />
                                        )}
                                    />
                                    {errors.project_name && (
                                        <FormFeedback>{errors.project_name.message}</FormFeedback>
                                    )}
                                </div>

                                <div className="mb-1">
                                    <Label className="form-label" for="project_description">
                                        Project Description
                                    </Label>
                                </div>
                                <div className="mb-1">
                                    <Controller
                                        id="project_description"
                                        name="project_description"
                                        defaultValue=""
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                type="textarea"
                                                {...field}
                                                value={projectData?.project_description}
                                                onChange={(e) => {
                                                    setProjectData({
                                                        ...projectData,
                                                        project_description: e.target?.value,
                                                    });
                                                }}
                                                disabled={state && state?.project_id}
                                                placeholder="project_description"
                                                invalid={errors.project_description && true}
                                            />
                                        )}
                                    />
                                    {errors.project_description && (
                                        <FormFeedback>
                                            {errors.project_description.message}
                                        </FormFeedback>
                                    )}
                                </div>

                                <div className="mb-1">
                                    <Label className="form-label" for="product_name">
                                        PV Product
                                        <Info
                                            size={15}
                                            style={{
                                                marginRight: "5px",
                                                cursor: "pointer",
                                                marginLeft: "20px",
                                            }}
                                            color="#28c76f"
                                        />
                                    </Label>
                                </div>
                                <div className="mb-1">
                                    <Controller
                                        id="product_name"
                                        name="product_name"
                                        defaultValue=""
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                theme={selectThemeColors}
                                                className="react-select"
                                                classNamePrefix="select"
                                                {...field}
                                                // defaultValue={pvTechnologyOptions[0]}
                                                options={
                                                    preData &&
                                                    preData?.map((s) => {
                                                        return {
                                                            ...s,
                                                            value: s?.product_name,
                                                            label: s?.product_name,
                                                        };
                                                    })
                                                }
                                                value={
                                                    preData &&
                                                    preData?.map((s) => {
                                                        // console.log("feild%%%%%%%%%%%%%%%%%%", projectData?.product_name);
                                                        if (s?.product_name == projectData?.product_name) {
                                                            // console.log("s.name ", s?.name);
                                                            return {
                                                                ...s,
                                                                label: s?.product_name,
                                                                value: s?.product_name,
                                                            };
                                                        } else return null;
                                                    })
                                                }
                                                onChange={(e) => {
                                                    // console.log("e", e);
                                                    field.onChange(e?.value);
                                                    setValue("orientation", e?.orientation);
                                                    setValue("inclination", e?.inclination);
                                                    setValue("elevation", e?.elevation);
                                                    setProjectData({
                                                        ...projectData,
                                                        product_name: e?.value,
                                                        orientation: e?.orientation,
                                                        inclination: e?.inclination,
                                                        elevation: e?.elevation,
                                                    });
                                                }}
                                                isClearable={false}
                                                invalid={errors.product_name && true}
                                            />
                                        )}
                                    />
                                    {errors.product_name && (
                                        <FormFeedback>{errors.product_name.message}</FormFeedback>
                                    )}
                                </div>

                                <div className="mb-1">
                                    {" "}
                                    <div
                                        id="map"
                                        ref={mapRef}
                                        style={{
                                            width: "flex",
                                            height: "600px",
                                            borderRadius: "5px",
                                            zIndex: "0",
                                        }}
                                    ></div>
                                </div>

                                <Row>
                                    <div className="mb-1">
                                        {" "}
                                        <h5> Select your Location On Map</h5>
                                    </div>
                                    <Col md="2">
                                        <div className="mb-1">
                                            <Label className="form-label" for="latitude">
                                                latitude
                                            </Label>
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="mb-1">
                                            <Controller
                                                id="latitude"
                                                name="latitude"
                                                defaultValue=""
                                                control={control}
                                                render={({ field }) => (
                                                    <Input
                                                        {...field}
                                                        value={projectData?.latitude}
                                                        onChange={(e) => {
                                                            setProjectData({
                                                                ...projectData,
                                                                latitude: e.target?.value,
                                                            });
                                                        }}
                                                        placeholder="latitude"
                                                        invalid={errors.latitude && true}
                                                    />
                                                )}
                                            />
                                            {errors.latitude && (
                                                <FormFeedback>{errors.latitude.message}</FormFeedback>
                                            )}
                                        </div>
                                    </Col>
                                    <Col md="2">
                                        <div className="mb-1">
                                            <Label className="form-label" for="longitude">
                                                longitude
                                            </Label>
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="mb-1">
                                            <Controller
                                                id="longitude"
                                                name="longitude"
                                                defaultValue=""
                                                control={control}
                                                render={({ field }) => (
                                                    <Input
                                                        {...field}
                                                        value={projectData?.longitude}
                                                        onChange={(e) => {
                                                            setProjectData({
                                                                ...projectData,
                                                                longitude: e.target?.value,
                                                            });
                                                        }}
                                                        placeholder="longitude"
                                                        invalid={errors.longitude && true}
                                                    />
                                                )}
                                            />
                                            {errors.longitude && (
                                                <FormFeedback>{errors.longitude.message}</FormFeedback>
                                            )}
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="2">
                                        <div className="mb-1">
                                            <Label className="form-label" for="city">
                                                City :
                                            </Label>
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="mb-1">
                                            <Controller
                                                id="city"
                                                name="city"
                                                defaultValue=""
                                                control={control}
                                                render={({ field }) => (
                                                    <Input
                                                        {...field}
                                                        value={projectData?.city}
                                                        onChange={(e) => {
                                                            setProjectData({
                                                                ...projectData,
                                                                city: e.target?.value,
                                                            });
                                                        }}
                                                        placeholder="city"
                                                        invalid={errors.city && true}
                                                    />
                                                )}
                                            />
                                            {errors.city && (
                                                <FormFeedback>{errors.city.message}</FormFeedback>
                                            )}
                                        </div>
                                    </Col>
                                    <Col md="2">
                                        <div className="mb-1">
                                            <Label className="form-label" for="state">
                                                State :
                                            </Label>
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="mb-1">
                                            <Controller
                                                id="state"
                                                name="state"
                                                defaultValue=""
                                                control={control}
                                                render={({ field }) => (
                                                    <Input
                                                        {...field}
                                                        value={projectData?.state}
                                                        onChange={(e) => {
                                                            setProjectData({
                                                                ...projectData,
                                                                state: e.target?.value,
                                                            });
                                                        }}
                                                        placeholder="state"
                                                        invalid={errors.state && true}
                                                    />
                                                )}
                                            />
                                            {errors.state && (
                                                <FormFeedback>{errors.state.message}</FormFeedback>
                                            )}
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="2">
                                        <div className="mb-1">
                                            <Label className="form-label" for="global_irradiation">
                                                Global Irradiance :
                                            </Label>
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="mb-1">
                                            <Controller
                                                id="global_irradiation"
                                                name="global_irradiation"
                                                defaultValue=""
                                                control={control}
                                                render={({ field }) => (
                                                    <Input
                                                        {...field}
                                                        value={projectData?.global_irradiation}
                                                        onChange={(e) => {
                                                            setProjectData({
                                                                ...projectData,
                                                                global_irradiation: e.target?.value,
                                                            });
                                                        }}
                                                        placeholder="-kWh/m²"
                                                        invalid={errors.global_irradiation && true}
                                                    />
                                                )}
                                            />
                                            {errors.global_irradiation && (
                                                <FormFeedback>
                                                    {errors.global_irradiation.message}
                                                </FormFeedback>
                                            )}
                                        </div>
                                    </Col>
                                    <Col md="2">
                                        <div className="mb-1">
                                            <Label className="form-label" for="avg_Tempraure ">
                                                Average Temperature [°]:
                                            </Label>
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="mb-1">
                                            <Controller
                                                id="avg_Tempraure"
                                                name="avg_Tempraure"
                                                defaultValue=""
                                                control={control}
                                                render={({ field }) => (
                                                    <Input
                                                        {...field}
                                                        value={projectData?.avg_Tempraure}
                                                        onChange={(e) => {
                                                            setProjectData({
                                                                ...projectData,
                                                                avg_Tempraure: e.target?.value,
                                                            });
                                                        }}
                                                        placeholder="-[°]"
                                                        invalid={errors.avg_Tempraure && true}
                                                    />
                                                )}
                                            />
                                            {errors.avg_Tempraure && (
                                                <FormFeedback>
                                                    {errors.avg_Tempraure.message}
                                                </FormFeedback>
                                            )}
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md="2">
                                        <div className="mb-1">
                                            <Label className="form-label" for="peak_power">
                                                Peak Power
                                            </Label>
                                            <Info
                                                size={15}
                                                style={{
                                                    marginRight: "5px",
                                                    cursor: "pointer",
                                                    marginLeft: "20px",
                                                }}
                                                color="#28c76f"
                                            />
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="mb-1">
                                            <Controller
                                                id="peak_power"
                                                name="peak_power"
                                                defaultValue=""
                                                control={control}
                                                render={({ field }) => (
                                                    <Input
                                                        {...field}
                                                        value={projectData?.peak_power}
                                                        onChange={(e) => {
                                                            setProjectData({
                                                                ...projectData,
                                                                peak_power: e.target?.value,
                                                            });
                                                        }}
                                                        placeholder="-kWh/m²"
                                                        invalid={errors.peak_power && true}
                                                    />
                                                )}
                                            />

                                            {errors.peak_power && (
                                                <FormFeedback>{errors.peak_power.message}</FormFeedback>
                                            )}
                                        </div>
                                    </Col>
                                    <Col md="2">
                                        <div className="mb-1">
                                            <Label className="form-label" for="orientation">
                                                Orientation :
                                            </Label>
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="mb-1">
                                            <Controller
                                                id="orientation"
                                                name="orientation"
                                                defaultValue=""
                                                control={control}
                                                render={({ field }) => (
                                                    <Select
                                                        theme={selectThemeColors}
                                                        className="react-select"
                                                        classNamePrefix="select"
                                                        {...field}
                                                        // defaultValue={pvTechnologyOptions[0]}
                                                        options={orientationOptions}
                                                        isClearable={false}
                                                        invalid={errors.orientation && true}
                                                        value={
                                                            orientationOptions &&
                                                            orientationOptions?.map((s) => {
                                                                // console.log("sssssssssssssssssss", s?.value, projectData?.orientation);
                                                                if (s?.value == projectData?.orientation) {
                                                                    // console.log("s.name ", s?.course_name);
                                                                    return { label: s?.label, value: s?.value };
                                                                }
                                                            })
                                                        }
                                                        onChange={(e) => {
                                                            field.onChange(e?.value);
                                                            setProjectData({ ...projectData, orientation: e?.value })
                                                        }}
                                                    />
                                                )}
                                            />
                                            {errors.orientation && (
                                                <FormFeedback>
                                                    {errors.orientation.message}
                                                </FormFeedback>
                                            )}
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="2">
                                        <div className="mb-1">
                                            <Label className="form-label" for="inclination">
                                                Inclination Slop [°] :
                                            </Label>
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="mb-1">
                                            <Controller
                                                id="inclination"
                                                name="inclination"
                                                defaultValue=""
                                                control={control}
                                                render={({ field }) => (
                                                    <Input
                                                        {...field}
                                                        value={projectData?.inclination}
                                                        onChange={(e) => {
                                                            setProjectData({
                                                                ...projectData,
                                                                inclination: e.target?.value,
                                                            });
                                                        }}
                                                        placeholder="degree"
                                                        invalid={errors.inclination && true}
                                                    />
                                                )}
                                            />
                                            {errors.inclination && (
                                                <FormFeedback>
                                                    {errors.inclination.message}
                                                </FormFeedback>
                                            )}
                                        </div>
                                    </Col>
                                    <Col md="2">
                                        <div className="mb-1">
                                            <Label className="form-label" for="elevation">
                                                Elevation (area in m²) :
                                            </Label>
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="mb-1">
                                            <Controller
                                                id="elevation"
                                                name="elevation"
                                                defaultValue=""
                                                control={control}
                                                render={({ field }) => (
                                                    <Input
                                                        {...field}
                                                        value={projectData?.elevation}
                                                        onChange={(e) => {
                                                            setProjectData({
                                                                ...projectData,
                                                                elevation: e.target?.value,
                                                            });
                                                        }}
                                                        placeholder="as per area available to install solar PV panels"
                                                        invalid={errors.elevation && true}
                                                    />
                                                )}
                                            />
                                            {errors.elevation && (
                                                <FormFeedback>{errors.elevation.message}</FormFeedback>
                                            )}
                                        </div>
                                    </Col>
                                </Row>
                                <div className="d-flex mb-2 mt-1">
                                    <Button className="me-1" color="primary" type="submit">
                                        Submit
                                    </Button>
                                    <Button
                                        outline
                                        color="secondary"
                                        type="reset"
                                        onClick={handleReset}
                                    >
                                        Reset
                                    </Button>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                    {/* )}DDDDD */}
                </Col>
            </Row>
        </Fragment>
    );
}

export default Project;
