import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Card, CardHeader, CardTitle, CardText, CardBody, Button, Col, Row, } from 'reactstrap'
import UILoader from '@components/ui-loader'
import Breadcrumbs from '@components/breadcrumbs'

import '@styles/react/apps/app-users.scss'


import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapComponent.css';
import Marker from '../../../@core/assets/Marker.png';
import { getAllProducts } from '../../../@core/api/common_api'
function MapView() {

    const [block, setBlock] = useState(false)

    useEffect(() => {
        return () => setBlock(false)
    }, [])

    const handleBlock = () => {
        setBlock(true)

        setTimeout(() => {
            setBlock(false)
        }, 2000)
    }

    const mapRef = useRef(null);
    const [projects, setProjects] = useState([])
      useEffect(()=>{
        fetchData();
      },[])
  
    useEffect(() => {
      const mapOptions = {
          center: [50.8282, 12.9209],
          zoom: 12,
        };
      let map =  L.map(mapRef.current, mapOptions);
  
      let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
     
      map.addLayer(layer);
      console.log("eeeee")
    const popupOptions = {
      closeButton: false,
    };
    console.log("resppppppppppppppppppp",projects);
    projects?.forEach((element) => {
        console.log(element.longitude)
      const marker = new L.Marker([element.latitude, element.longitude]).addTo(map);

      marker.on('mouseover', () => {
        marker.bindPopup(`<div class="card">
          <h3>${element.project_name}</h3>
        </div>`, popupOptions).openPopup();
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
  }, [projects]);

  const fetchData = async () => {
    // try {
    //    await API_HOSTNAME.get("/projects/getproject")
    //     .then(async(response) => {
    //         console.log(response.data.project)
    //         setProjects(response.data.project)
        
    //     }).catch((err) => {
    //       console.log(err)
    //     })
    // } catch (error) {
    //   console.error('Error fetching data:', error);
    // }

   let resp  =await getAllProducts();
   console.log("resppppppppppppppppppp",resp);
   setProjects(resp?.project)
  };

  return <div id="map" style={{ width: '1080px', height: '600px', borderRadius: '5px' }} ref={mapRef}></div>;

    // return (
    //     <UILoader blocking={block}>
    //         <Fragment>
    //             <Breadcrumbs title='Geography' data={[{ title: 'Geography View' }]} />
    //             <Row>
    //                 <Col xs={12}>
    //                     <Card>
    //                         <CardHeader>
    //                             <CardTitle tag='h4'>All Products</CardTitle>
    //                         </CardHeader>
    //                         <CardBody>
    //                             <CardText>
    //                                 {/* <div id="map" style={{ width: '1080px', height: '600px', borderRadius: '5px' }} ref={mapRef}></div> */}
    //                             </CardText>
    //                         </CardBody>
    //                     </Card>
    //                 </Col>
    //             </Row>
    //         </Fragment>
    //     </UILoader>
    // )
}
export default MapView
