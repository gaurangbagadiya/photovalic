import React, { useRef, useEffect, useState, useContext } from "react";
import ReactToPrint from "react-to-print";
import {
    Row,
    Col,
    Button,
    Card,
    CardBody,
    CardText,
    CardTitle,
    CardHeader,
} from "reactstrap";
import {
    generateReport,
    getAllProductsById,
    getProjectById,
    sendReportById,
} from "../../../@core/api/common_api";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@components/breadcrumbs";
import { notification } from "../../../@core/constants/notification";
import Flatpickr from "react-flatpickr";
import {
    // AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { Calendar } from "react-feather";
// import SimpleAreaChart from "../../charts/recharts/AreaChart";
// import AreaChart from "../../charts/chart-js/ChartjsAreaChart";
import { ThemeColors } from "@src/utility/context/ThemeColors";
import { useSkin } from "@hooks/useSkin";
import DataTable from "react-data-table-component";

function Report() {
    let testData = [
        {
            _id: "649f1bdc2327e8cf3e360a35",
            project_Id: "649f1bdc2327e8cf3e360a33",
            product_name: "First Solar Solar System",
            latitude: 50.823681597967045,
            longitude: 12.880096435546877,
            city: "sa",
            state: "sa",
            efficiency: 22,
            peak_power: 1,
            orientation: "West",
            inclination: 20,
            elevation: 3,
            entry_date: "2023-06-30T18:15:56.703Z",
            __v: 0,
            dateWiseReportData: [
                {
                    datetime: "2023-05-31",
                    ghi: 346,
                    energy: 1042.9657920000002,
                    peak_power: 228.36,
                    EffectiveIrradiation: 76.12,
                },
                {
                    datetime: "2023-06-01",
                    ghi: 346,
                    energy: 1042.9657920000002,
                    peak_power: 228.36,
                    EffectiveIrradiation: 76.12,
                },
                {
                    datetime: "2023-06-02",
                    ghi: 347,
                    energy: 1049.003208,
                    peak_power: 229.02,
                    EffectiveIrradiation: 76.34,
                },
                {
                    datetime: "2023-06-03",
                    ghi: 348,
                    energy: 1055.058048,
                    peak_power: 229.68,
                    EffectiveIrradiation: 76.56,
                },
                {
                    datetime: "2023-06-04",
                    ghi: 349,
                    energy: 1061.130312,
                    peak_power: 230.34,
                    EffectiveIrradiation: 76.78,
                },
                {
                    datetime: "2023-06-05",
                    ghi: 350,
                    energy: 1067.22,
                    peak_power: 231,
                    EffectiveIrradiation: 77,
                },
                {
                    datetime: "2023-06-06",
                    ghi: 350,
                    energy: 1067.22,
                    peak_power: 231,
                    EffectiveIrradiation: 77,
                },
                {
                    datetime: "2023-06-07",
                    ghi: 351,
                    energy: 1073.3271119999997,
                    peak_power: 231.66,
                    EffectiveIrradiation: 77.22,
                },
                {
                    datetime: "2023-06-08",
                    ghi: 351,
                    energy: 1073.3271119999997,
                    peak_power: 231.66,
                    EffectiveIrradiation: 77.22,
                },
                {
                    datetime: "2023-06-09",
                    ghi: 352,
                    energy: 1079.4516479999998,
                    peak_power: 232.32,
                    EffectiveIrradiation: 77.44,
                },
                {
                    datetime: "2023-06-10",
                    ghi: 353,
                    energy: 1085.5936079999997,
                    peak_power: 232.98,
                    EffectiveIrradiation: 77.66,
                },
                {
                    datetime: "2023-06-11",
                    ghi: 353,
                    energy: 1085.5936079999997,
                    peak_power: 232.98,
                    EffectiveIrradiation: 77.66,
                },
                {
                    datetime: "2023-06-12",
                    ghi: 353,
                    energy: 1085.5936079999997,
                    peak_power: 232.98,
                    EffectiveIrradiation: 77.66,
                },
                {
                    datetime: "2023-06-13",
                    ghi: 354,
                    energy: 1091.7529919999997,
                    peak_power: 233.64,
                    EffectiveIrradiation: 77.88,
                },
                {
                    datetime: "2023-06-14",
                    ghi: 354,
                    energy: 1091.7529919999997,
                    peak_power: 233.64,
                    EffectiveIrradiation: 77.88,
                },
                {
                    datetime: "2023-06-15",
                    ghi: 354,
                    energy: 1091.7529919999997,
                    peak_power: 233.64,
                    EffectiveIrradiation: 77.88,
                },
                {
                    datetime: "2023-06-16",
                    ghi: 354,
                    energy: 1091.7529919999997,
                    peak_power: 233.64,
                    EffectiveIrradiation: 77.88,
                },
                {
                    datetime: "2023-06-17",
                    ghi: 355,
                    energy: 1097.9297999999997,
                    peak_power: 234.29999999999998,
                    EffectiveIrradiation: 78.1,
                },
                {
                    datetime: "2023-06-18",
                    ghi: 355,
                    energy: 1097.9297999999997,
                    peak_power: 234.29999999999998,
                    EffectiveIrradiation: 78.1,
                },
                {
                    datetime: "2023-06-19",
                    ghi: 355,
                    energy: 1097.9297999999997,
                    peak_power: 234.29999999999998,
                    EffectiveIrradiation: 78.1,
                },
                {
                    datetime: "2023-06-20",
                    ghi: 355,
                    energy: 1097.9297999999997,
                    peak_power: 234.29999999999998,
                    EffectiveIrradiation: 78.1,
                },
                {
                    datetime: "2023-06-21",
                    ghi: 355,
                    energy: 1097.9297999999997,
                    peak_power: 234.29999999999998,
                    EffectiveIrradiation: 78.1,
                },
                {
                    datetime: "2023-06-22",
                    ghi: 355,
                    energy: 1097.9297999999997,
                    peak_power: 234.29999999999998,
                    EffectiveIrradiation: 78.1,
                },
                {
                    datetime: "2023-06-23",
                    ghi: 354,
                    energy: 1091.7529919999997,
                    peak_power: 233.64,
                    EffectiveIrradiation: 77.88,
                },
                {
                    datetime: "2023-06-24",
                    ghi: 354,
                    energy: 1091.7529919999997,
                    peak_power: 233.64,
                    EffectiveIrradiation: 77.88,
                },
                {
                    datetime: "2023-06-25",
                    ghi: 354,
                    energy: 1091.7529919999997,
                    peak_power: 233.64,
                    EffectiveIrradiation: 77.88,
                },
                {
                    datetime: "2023-06-26",
                    ghi: 354,
                    energy: 1091.7529919999997,
                    peak_power: 233.64,
                    EffectiveIrradiation: 77.88,
                },
                {
                    datetime: "2023-06-27",
                    ghi: 353,
                    energy: 1085.5936079999997,
                    peak_power: 232.98,
                    EffectiveIrradiation: 77.66,
                },
                {
                    datetime: "2023-06-28",
                    ghi: 353,
                    energy: 1085.5936079999997,
                    peak_power: 232.98,
                    EffectiveIrradiation: 77.66,
                },
                {
                    datetime: "2023-06-29",
                    ghi: 353,
                    energy: 1085.5936079999997,
                    peak_power: 232.98,
                    EffectiveIrradiation: 77.66,
                },
            ],
        },
    ];

    const componentRef = useRef();
    const { state } = useLocation();
    const navigate = useNavigate()
    const [projectData, setProjectData] = useState({});
    const [productData, setProductData] = useState([]);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (state && state?.project_id) {
            getProjectDataById(state?.project_id);
            sendReport(state?.project_id);
            // getProductsDataById(state?.project_id);
        }
        // return () => setBlock(false)
    }, []);

    const sendReport = async (id) => {
        let response = await sendReportById(id);
        console.log("response", response);
        setProductData(response?.data);
        // setProductData(testData);

        if (response?.status == 1) {
            let productsReportData = [];
            response?.data?.map((product) => {
                console.log("product", product);
                let reportData = [];
                product?.dateWiseReportData?.map((data) => {
                    console.log("data", data);
                    reportData.push({
                        name: data?.datetime,
                        effectiveIrradiation: data?.effectiveIrradiatio,
                        energy: data?.energy,
                        peak_power: data?.peak_power,
                    });
                });
                productsReportData?.push(reportData);
            });
            setChartData(productsReportData);
        } else {
            notification({
                type: response?.status == 1 ? "success" : "error",
                message: response.message,
            });
        }
    };

    const getProjectDataById = async (id) => {
        let response = await getProjectById(id);
        console.log("response", response);
        setProjectData(response?.data[0]);
    };
    // const getProductsDataById = async (id) => {
    //     let response = await getAllProductsById(id);
    //     console.log("responseeee", response);
    //     setProductData(response?.data);
    // };

    const generateReports = async () => {
        let response = await generateReport(state?.project_id);
        console.log("res", response);
        notification({
            type: response?.status == 1 ? "success" : "error",
            message: response.message,
        });
        if (response?.status == 1) {
            navigate("/projecthistory")
        }
    };

    const data = [
        {
            name: "7/12",
            sales: 20,
            clicks: 60,
            visits: 100,
        },
        {
            name: "8/12",
            sales: 40,
            clicks: 80,
            visits: 120,
        },
        {
            name: "9/12",
            sales: 30,
            clicks: 70,
            visits: 90,
        },
    ];

    const CustomTooltip = (data) => {
        if (data.active && data.payload) {
            return (
                <div className="recharts-custom-tooltip">
                    <p className="fw-bold mb-0">{data.label}</p>
                    <hr />
                    <div className="active">
                        {data.payload.map((i) => {
                            return (
                                <div className="d-flex align-items-center" key={i.dataKey}>
                                    <span
                                        className="bullet bullet-sm bullet-bordered me-50"
                                        style={{
                                            backgroundColor: i.fill,
                                        }}
                                    ></span>
                                    <span className="text-capitalize me-75">
                                        {i.dataKey} : {i.payload[i.dataKey]}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }

        return null;
    };

    console.log(projectData);
    console.log(productData);
    const { colors } = useContext(ThemeColors),
        { skin } = useSkin(),
        labelColor = skin === "dark" ? "#b4b7bd" : "#6e6b7b",
        tooltipShadow = "rgba(0, 0, 0, 0.25)",
        gridLineColor = "rgba(200, 200, 200, 0.2)",
        lineChartPrimary = "#666ee8",
        lineChartDanger = "#ff4961",
        warningColorShade = "#ffbd1f",
        warningLightColor = "#FDAC34",
        successColorShade = "#28dac6",
        primaryColorShade = "#836AF9",
        infoColorShade = "#299AFF",
        yellowColor = "#ffe800",
        greyColor = "#4F5D70",
        blueColor = "#2c9aff",
        blueLightColor = "#84D0FF",
        greyLightColor = "#EDF1F4";

    const column = [
        {
            name: "Date",
            cell: (row) => row?.datetime,
        }, {
            name: "Global Irradiation (W/m²)",
            cell: (row) => row?.ghi,
        },
        {
            name: "Effective Irradiation (W/m²)",
            cell: (row) => row?.effectiveIrradiation,
        },
        {
            name: "Peak Power (W/m²)",
            cell: (row) => row?.peak_power,
        },
        {
            name: "Energy (Kwh)",
            cell: (row) => row?.energy,
        },
    ];
    return (
        <div>
            <Breadcrumbs title="Reports" data={[{ title: "Genrate Reports" }]} />

            <Row className="invoice-preview">
                <Col md="12">
                    <div ref={componentRef}>
                        <Card className="invoice-preview-card">
                            <CardBody className="invoice-padding pb-0">
                                {/* Header */}
                                <h3 className="text-primary invoice-logo">
                                    Photovoltaic system Report{" "}
                                </h3>
                                <div>
                                    <br />
                                </div>
                                <div className="d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0">
                                    <div className="logo-wrapper">
                                        <p className="mb-25">
                                            Project Name :{" "}
                                            <strong>{projectData?.project_name}</strong>{" "}
                                        </p>
                                        <p className="mb-25">
                                            Discription : {projectData?.project_description}{" "}
                                        </p>
                                    </div>
                                </div>
                                {/* /Header */}
                            </CardBody>
                            <div>
                                <hr className="invoice-spacing" />
                            </div>
                            {productData &&
                                productData?.map((product, index) => (
                                    <CardBody className="invoice-padding pt-0">
                                        <Row className="invoice-spacing">
                                            <h6 className="mb-2">
                                                product :<strong>{product?.product_name} </strong>
                                            </h6>

                                            <h6 className="mb-2">Project Details</h6>
                                        </Row>
                                        <Row className="invoice-spacing">
                                            <Col className="p-1 mt-xl-0 mt-2" xl="6">
                                                <h6 className="mb-2">Location</h6>
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td className="pe-1">Lattitude:</td>
                                                            <td>
                                                                <span className="fw-bold">
                                                                    {product?.latitude}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="pe-1">Longtitude</td>
                                                            <td>
                                                                <span className="fw-bold">
                                                                    {product?.longitude}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="pe-1">Location:</td>
                                                            <td>
                                                                {product?.city}, {product?.state}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </Col>
                                            <Col className="p-1 mt-xl-0 mt-2" xl="6">
                                                <h6 className="mb-2">Simulation outputs: </h6>
                                                <table>
                                                    <tbody>

                                                        <tr>
                                                            <td className="pe-1">Efficiencey</td>
                                                            <td>{product?.efficiency} %</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="pe-1">Slope angle [°]: :</td>
                                                            <td>
                                                                <span className="fw-bold">
                                                                    {product?.inclination}°
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="pe-1">Orientation </td>
                                                            <td>{product?.orientation} Facing</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="pe-1">Elivation(m²) : :</td>
                                                            <td>{product?.elevation} m²</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </Col>
                                        </Row>

                                        <Row className="invoice-spacing">
                                            <Col className="p-1" xl="12">
                                                {/* <Card>
                          <CardHeader className="flex-sm-row flex-column justify-content-sm-between justify-content-center align-items-sm-center align-items-start">
                            <CardTitle tag="h4">Website Data</CardTitle>
                            <div className="d-flex align-items-center"></div>
                          </CardHeader>

                          <CardBody>
                            <div className="d-flex align-items-center mb-2">
                              <div className="me-2">
                                <span className="bullet bullet-sm bullet-primary bullet-bordered me-50"></span>
                                <span className="align-middle">Clicks</span>
                              </div>
                              <div className="me-2">
                                <span
                                  className="bullet bullet-sm bullet-bordered me-50"
                                  style={{
                                    backgroundColor: "rgba(115, 103, 240, .5)",
                                  }}
                                ></span>
                                <span className="align-middle me-75">
                                  Sales
                                </span>
                              </div>
                              <div>
                                <span
                                  className="bullet bullet-sm bullet-bordered me-50"
                                  style={{
                                    backgroundColor: "rgba(115, 103, 240, .2)",
                                  }}
                                ></span>
                                <span className="align-middle">Visits</span>
                              </div>
                            </div>
                            <div className="recharts-wrapper">
                              <ResponsiveContainer>
                                <AreaChart height={400} data={data}>
                                  <CartesianGrid />
                                  <XAxis dataKey="name" />
                                  <YAxis />
                                  <Tooltip content={CustomTooltip} />
                                  <Area
                                    dataKey="sales"
                                    stackId="sales"
                                    stroke="0"
                                    fill="rgba(115, 103, 240, .5)"
                                  />
                                  <Area
                                    dataKey="clicks"
                                    stackId="clicks"
                                    stroke="0"
                                    fill="rgb(115, 103, 240)"
                                  />
                                  <Area
                                    dataKey="visits"
                                    stackId="visits"
                                    stroke="0"
                                    fill="rgba(115, 103, 240, .2)"
                                  />
                                </AreaChart>
                              </ResponsiveContainer>
                            </div>
                          </CardBody>
                        </Card> */}

                                                <DataTable
                                                    pagination
                                                    columns={column}
                                                    data={product?.dateWiseReportData}
                                                    paginationRowsPerPageOptions={[10, 20, 30]}
                                                    className="react-dataTable table-header"
                                                />
                                            </Col>

                                            <div>
                                                <hr className="invoice-spacing" />
                                            </div>
                                        </Row>
                                    </CardBody>
                                ))}
                        </Card>
                    </div>

                </Col>

                <Col md="12">
                    <ReactToPrint
                        trigger={() => (
                            <Button color="success" out className="me-1 mb-75" type="submit">
                                {" "}
                                Download / Print
                            </Button>
                        )}
                        content={() => componentRef.current}
                    />
                    {projectData?.report_status == 0 &&
                        <Button
                            color="primary"
                            className="me-1 mb-75"
                            onClick={() => generateReports()}
                        >
                            Generate Report
                        </Button>

                    }
                </Col>
            </Row>
        </div>
    );
}

export default Report;
