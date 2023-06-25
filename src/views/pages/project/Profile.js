import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Card, CardHeader, CardTitle, CardText, CardBody, Button, Col, Row, } from 'reactstrap'
import UILoader from '@components/ui-loader'
import Breadcrumbs from '@components/breadcrumbs'

import '@styles/react/apps/app-users.scss'

function Profile() {

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
            <Breadcrumbs title='Profile' data={[{ title: 'User Profile' }]} />
                <Row>
                    <Col xs={12}>
                        <Card>
                            <CardHeader>
                                <CardTitle tag='h4'>All Products</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <CardText>
                                    user Profile data
                                </CardText>                                
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Fragment>
        </UILoader>
    )
}
export default Profile
