import React, { Fragment, useEffect, useRef, useState } from "react";
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
import UILoader from "@components/ui-loader";
import Breadcrumbs from "@components/breadcrumbs";
import { Plus } from "react-feather";

import Select from "react-select";
import { useForm, Controller } from "react-hook-form";

import { selectThemeColors } from "@utils";
import "@styles/react/apps/app-users.scss";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./MapComponent.css";
import Marker from "../../../@core/assets/Marker.png";

import AddProduct from "./AddProduct";
import { useLocation, useNavigate } from "react-router-dom";
import {
  deleteProduct,
  deleteProject,
  getAllProductsById,
  getProjectById,
} from "../../../@core/api/common_api";
import { notification } from "../../../@core/constants/notification";


function ProjectView() {
  const defaultValues = {
    latitude: "",
    longitude: "",
  };

  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const latitudeRef = useRef(null);
  const longitudeRef = useRef(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [step, setStep] = useState(0);
  const [projectData, setProjectData] = useState({});
  const [productData, setProductData] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  // const [block, setBlock] = useState(false)

  const PvProduct = [
    { value: "CLSC", label: "crystal line silicon cells" },
    { value: "CT", label: "Cadmium Telluride" },
    { value: "CIS", label: "CIS or CIGS" },
    { value: "unknown", label: "Unknown" },
  ];

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
    if (state && state?.project_id) {
      getProjectDataById(state?.project_id);
      getProductsDataById(state?.project_id);
    }
    // return () => setBlock(false)
  }, []);


  useEffect(() => {
    const mapOptions = {
      center: [50.8282, 12.9209],
      zoom: 6,
    };
    const markerSize = [30, 30]; // Customize the size of the marker icon

    let DefaultIcon = L.icon({
        iconUrl: Marker,
        iconSize: markerSize,
    });

    L.Marker.prototype.options.icon = DefaultIcon;
    let map = L.map(mapRef.current, mapOptions);

    let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

    map.addLayer(layer);
    // console.log("eeeee")
    const popupOptions = {
      closeButton: false,
    };
    // console.log("resppppppppppppppppppp", productData);
    
    productData?.forEach((element) => {
      // console.log(element.longitude)
      const marker = new L.Marker([element.latitude, element.longitude]).addTo(map);

      marker.on('mouseover', () => {
        marker.bindPopup(`<divs>
          <h3>${element.product_name}</h3>
          <h6>Location : ${element.city},${element.state}</h6>
          <h6>Global Irradiance : ${element.global_irradiation} kwh/m²</h6>
          <h6>Peak Power : ${element.peak_power} kwh/m²</h6>
          <h6>Avg Temprature : ${element.avg_Tempraure}°</h6>
          <h6>Orientation : ${element.orientation} facing</h6>
          <h6>Elevation : ${element.elevation} m²</h6>
        </divs>`, popupOptions).openPopup();
      });

      marker.on('mouseout', () => {
        marker.closePopup();
      });

      marker.on('click', () => {
        window.open(element.url);
      });
    });

    return () => {
      map.remove();
    };
  }, [productData]);

  const getProjectDataById = async (id) => {
    let response = await getProjectById(id);
    // console.log("response", response);
    setProjectData(response?.data[0]);
  };
  const getProductsDataById = async (id) => {
    let response = await getAllProductsById(id);
    // console.log("responseeee", response);
    setProductData(response?.data);
  };

  const onSubmit = (data) => {
    // console.log("dataaa", data);
    if (Object.values(data).every((field) => field.length > 0)) {

    }
  };

  const handleReset = () => {
    reset({
      latitude: "",
      longitude: "",
    });
  };

  const handleUpdate = (data) => {
    // Perform the update operation using the data and editProduct state
    // console.log("Updated product:", data);
    // console.log("Product ID:", editProduct?.id);

    // Clear the editProduct state and reset the form
    setEditProduct(null);
    handleReset();
  };

  const handleDeleteProject = async (id) => {
    // console.log("id", id);
    let response = await deleteProject(id)
    // console.log("response", response);
    notification({
      type: response?.status == 1 ? "success" : "error",
      message: response.message,
    });

    if (response?.status == 1) {
      navigate("/projecthistory")
    }
  }

  const handleDeleteProduct = async (id) => {
    // console.log("id", id);
    let response = await deleteProduct(id)
    // console.log("response", response);
    notification({
      type: response?.status == 1 ? "success" : "error",
      message: response.message,
    });

    if (response?.status == 1) {
      getProductsDataById(state?.project_id);
    }
  }

  return (
    // <UILoader blocking={block}>
    <Fragment>
      <Breadcrumbs title="Project" data={[{ title: "Project Details" }]} />
      <Row>
        <Col xs={12}>
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Project Name : {projectData?.project_name}</CardTitle>
              <div className="d-flex mt-1">
                <Button className="me-1" color="success" type="submit">
                  Generate Report
                </Button>
                <Button className="me-1" color="primary" type="submit">
                  Update
                </Button>
                <Button color="danger" type="submit" onClick={() => handleDeleteProject(projectData?._id)}>
                  Delete
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              <CardText>Description: {projectData?.project_description}</CardText>
            </CardBody>
          </Card>

          {/* load map here to show all producl location of this project  */}
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Location</CardTitle>
            </CardHeader>
            <CardBody> <div className="mb-1">
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
            </div></CardBody>
          </Card>

          {/* data from backend when user create their first product   ... */}

          {productData &&
            productData?.map((product, index) => (
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">{product?.product_name}</CardTitle>
                  <div className="d-flex mb-2 mt-1">
                    <Button
                      className="me-1"
                      color="primary"
                      type="submit"
                      onClick={() =>
                        navigate("/project", {
                          state: {
                            ...projectData,
                            project_id: state?.project_id,
                            ...product,
                            product_id: product?._id,
                            type: 1,
                          },
                        })
                      }
                    >
                      Update Product
                    </Button>
                    <Button color="danger" type="reset" onClick={() => handleDeleteProduct(product?._id)}>
                      Delete
                    </Button>
                  </div>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
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
                                placeholder="latitude"
                                value={product?.latitude}
                                invalid={errors.latitude && true}
                              />
                            )}
                          />
                          {errors.latitude && (
                            <FormFeedback>
                              {errors.latitude.message}
                            </FormFeedback>
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
                                value={product?.longitude}
                                placeholder="longitude"
                                invalid={errors.longitude && true}
                              />
                            )}
                          />
                          {errors.longitude && (
                            <FormFeedback>
                              {errors.longitude.message}
                            </FormFeedback>
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
                                placeholder="-"
                                value={product?.city}
                                invalid={errors.city && true}
                                onChange={(e) => {
                                  console.log(
                                    " e?.target?.value",
                                    e?.target?.value
                                  );
                                  productData[index].orientation =
                                    e?.target?.value;
                                  setProductData(productData);
                                  field.onChange(e?.target?.value);
                                }}
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
                          <Label className="form-label" for="State">
                            State :
                          </Label>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="mb-1">
                          <Controller
                            id="State"
                            name="State"
                            defaultValue=""
                            control={control}
                            value={product?.state}
                            render={({ field }) => (
                              <Input
                                {...field}
                                placeholder="-"
                                value={product?.state}
                                invalid={errors.State && true}
                              />
                            )}
                          />
                          {errors.State && (
                            <FormFeedback>{errors.State.message}</FormFeedback>
                          )}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="2">
                        <div className="mb-1">
                          <Label className="form-label" for="globalIrradiance">
                            Global Irradiance :
                          </Label>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="mb-1">
                          <Controller
                            id="globalIrradiance"
                            name="globalIrradiance"
                            defaultValue=""
                            control={control}
                            render={({ field }) => (
                              <Input
                                {...field}
                                placeholder="-kWh/m²"
                                value={product?.global_irradiation}
                                invalid={errors.globalIrradiance && true}
                              />
                            )}
                          />
                          {errors.globalIrradiance && (
                            <FormFeedback>
                              {errors.globalIrradiance.message}
                            </FormFeedback>
                          )}
                        </div>
                      </Col>
                      <Col md="2">
                        <div className="mb-1">
                          <Label
                            className="form-label"
                            for="averageTemperature "
                          >
                            Average Temperature :
                          </Label>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="mb-1">
                          <Controller
                            id="averageTemperature"
                            name="averageTemperature"
                            defaultValue=""
                            control={control}
                            value={product?.avg_Tempraure}
                            render={({ field }) => (
                              <Input
                                {...field}
                                placeholder="-[°]"
                                value={product?.avg_Tempraure}
                                invalid={errors.averageTemperature && true}
                              />
                            )}
                          />
                          {errors.averageTemperature && (
                            <FormFeedback>
                              {errors.averageTemperature.message}
                            </FormFeedback>
                          )}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="2">
                        <div className="mb-1">
                          <Label className="form-label" for="peakPower">
                            Peak Power
                          </Label>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="mb-1">
                          <Controller
                            id="peakPower"
                            name="peakPower"
                            defaultValue=""
                            control={control}
                            render={({ field }) => (
                              <Input
                                {...field}
                                placeholder="-kWh/m²"
                                value={product?.peak_power}
                                invalid={errors.peakPower && true}
                              />
                            )}
                          />
                          {errors.peakPower && (
                            <FormFeedback>
                              {errors.peakPower.message}
                            </FormFeedback>
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
                                    // console.log(
                                    //   "s",
                                    //   s?.value,
                                    //   product?.orientation
                                    // );
                                    if (s?.value == product?.orientation) {
                                      // console.log("s.name ", s?.course_name);
                                      return {
                                        label: s?.label,
                                        value: s?.value,
                                      };
                                    }
                                  })
                                }
                                onChange={(e) => {
                                  productData[index].orientation = e?.value;
                                  field.onChange(e?.value);
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
                          <Label className="form-label" for="slop">
                            Inclination Slop [°] :
                          </Label>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="mb-1">
                          <Controller
                            id="slop"
                            name="slop"
                            defaultValue=""
                            control={control}
                            render={({ field }) => (
                              <Input
                                {...field}
                                placeholder="10 slope degree"
                                value={product && product?.inclination}
                                invalid={errors.slop && true}
                              />
                            )}
                          />
                          {errors.slop && (
                            <FormFeedback>{errors.slop.message}</FormFeedback>
                          )}
                        </div>
                      </Col>
                      <Col md="2">
                        <div className="mb-1">
                          <Label className="form-label" for="elivation">
                            Elivation(m) :
                          </Label>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="mb-1">
                          <Controller
                            id="elivation"
                            name="elivation"
                            defaultValue=""
                            control={control}
                            render={({ field }) => (
                              <Input
                                {...field}
                                placeholder="elivation in m"
                                value={product?.elevation}
                                invalid={errors.elivation && true}
                              />
                            )}
                          />
                          {errors.elivation && (
                            <FormFeedback>
                              {errors.elivation.message}
                            </FormFeedback>
                          )}
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            ))}
        </Col>
      </Row>
      {productData && productData?.length < 3 && (
        <Row>
          {/* <AddProduct /> */}
          <Card>
            <CardHeader className="flex-md-row flex-column align-md-items-center align-items-center border-bottom">
              <CardTitle tag="h4">Add more products in this project</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="d-flex mt-1 mb-1">
                <Button
                  className="me-1"
                  color="primary"
                  type="button"
                  onClick={() => {
                    navigate("/project", {
                      state: {
                        ...projectData,
                        project_id: state?.project_id,
                        type: 0,
                      },
                    });
                  }}
                >
                  <Plus size={15} />
                  Add Product
                </Button>
              </div>
            </CardBody>
          </Card>
        </Row>
      )}
    </Fragment>
    // </UILoader>
  );
}
export default ProjectView;
