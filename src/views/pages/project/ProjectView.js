import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Card, CardHeader, CardTitle, CardText, CardBody, Button, Col, Row, } from 'reactstrap'
import UILoader from '@components/ui-loader'
import Breadcrumbs from '@components/breadcrumbs'

import '@styles/react/apps/app-users.scss'

function ProjectView() {

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

    return (
        <UILoader blocking={block}>
            <Fragment>
                <Breadcrumbs title='Projects' data={[{ title: 'Project Details' }]} />
                <Row>
                    <Col xs={12}>
                        <Card>
                            <CardHeader>
                            <CardTitle tag='h4'>Project Name</CardTitle>
                                <div className='d-flex mb-2 mt-1'>
                                    <Button className='me-1' color='primary' type='submit'>
                                        Update
                                    </Button>
                                    <Button outline color='secondary' type='submit'>
                                        Delete
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <CardText>
                                    Project Description---------------Lorem ipsum dolor sit amet, an vel affert soleat possim. Usu meis neglegentur ut, oporteat salutandi
                                    dignissim at mea. Pericula erroribus quaerendum ex duo, his autem accusamus ad, alienum detracto rationibus
                                    vis et. No est volumus ocurreret vituperata.
                                </CardText>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardBody>
                                map
                            </CardBody>
                        </Card>

                        <Card>
                            <CardHeader>
                                <Row>
                                <Col md="4">
                                
                                </Col>                                    
                                </Row>
                            </CardHeader>
                        </Card>
                    </Col>
                </Row>
            </Fragment>
        </UILoader>
    )
}
export default ProjectView
