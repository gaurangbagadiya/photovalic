import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Card, CardHeader, CardTitle, CardText, CardBody, Button, Col, Row, } from 'reactstrap'
import UILoader from '@components/ui-loader'
import Breadcrumbs from '@components/breadcrumbs'

import '@styles/react/apps/app-users.scss'


import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapComponent.css';
import Marker from '../../../@core/assets/Marker.png';
import { element } from 'prop-types'
import { getAllProjects, getAllProjectsWithProducts } from '../../../@core/api/common_api'
import { useNavigate } from 'react-router-dom'

function MapView() {
  const mapRef = useRef(null);
  const navigate = useNavigate();
  const [projects, setProjects] = useState([])
  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    const mapOptions = {
      center: [50.8282, 12.9209],
      zoom: 10,
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
    console.log("resppppppppppppppppppp", projects);

    projects?.forEach((project) => {
      project?.products?.map((element) => {
        // console.log(element.longitude)
        const marker = new L.Marker([element.latitude, element.longitude]).addTo(map);

        marker.on('mouseover', () => {
          marker.bindPopup(`<div>
          <h5>${project?.project?.project_name}</h5>
          <h4>${element.product_name}</h4>
          <h6>Location : ${element.city},${element.state}</h6>
          <h6>Efficiency : ${element.efficiency} </h6>
          <h6>Peak Power : ${element.peak_power} kwh/m²</h6>
          <h6>Avg Temprature : ${element.avg_Tempraure}°</h6>
          <h6>Orientation : ${element.orientation} facing</h6>
          <h6>Elevation : ${element.elevation} m²</h6>
          <h6>Watt : ${element.watt} W</h6>

          </div>`, popupOptions).openPopup();

        });

        marker.on('mouseout', () => {
          marker.closePopup();
        });

        marker.on('click', () => {
          navigate("/projectview", { state: { project_id: project?.project?._id } })
        });
      })

    });

    return () => {
      map.remove();
    };
  }, [projects]);

  const fetchData = async () => {
    // try {
    let response = await getAllProjectsWithProducts();
    // console.log("response", response);
    setProjects(response?.data)
  };

  return <div id="map" style={{ width: 'auto', height: '600px', borderRadius: '5px' }} ref={mapRef}></div>;

}
export default MapView
