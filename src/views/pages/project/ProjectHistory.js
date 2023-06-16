import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Card, CardHeader, CardTitle, CardText, CardBody, Button, Col, Row, } from 'reactstrap'
import UILoader from '@components/ui-loader'
import Breadcrumbs from '@components/breadcrumbs'

import '@styles/react/apps/app-users.scss'

function ProjectHistory() {

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
                <Breadcrumbs title='Projects' data={[{ title: 'Project History' }]} />
                <Row>
                    <Col xs={12}>
                        <Card>
                            <CardHeader>
                                <CardTitle tag='h4'>Project Name</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <CardText>
                                    Project Description---------------Lorem ipsum dolor sit amet, an vel affert soleat possim. Usu meis neglegentur ut, oporteat salutandi
                                    dignissim at mea. Pericula erroribus quaerendum ex duo, his autem accusamus ad, alienum detracto rationibus
                                    vis et. No est volumus ocurreret vituperata.
                                </CardText>

                                <div className='d-flex mb-2 mt-1'>
                                    <Button className='me-1' color='primary' outline onClick={handleBlock}>
                                        View Project Details
                                    </Button>
                                    <Button className='me-1' color='primary' type='submit'>
                                        Update
                                    </Button>
                                    <Button outline color='secondary' type='submit'>
                                        Delete
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Fragment>
        </UILoader>
    )
}
export default ProjectHistory
