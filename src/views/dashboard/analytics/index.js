// ** React Imports
import { useContext } from "react";

// ** Custom Components
import Avatar from "@components/avatar";
import { Plus,Eye,Map } from 'react-feather';



// ** Context
import { ThemeColors } from "@src/utility/context/ThemeColors";

// ** Reactstrap Imports
import { Row, Col, Card, CardHeader, CardTitle, CardBody, CardText, } from "reactstrap";
import { Link } from 'react-router-dom';





// ** Styles
import "@styles/react/libs/charts/apex-charts.scss";
import ProjectHistory from "../../pages/project/ProjectHistory";

const AnalyticsDashboard = () => {
  // ** Context
  const { colors } = useContext(ThemeColors);



  return (
    <div id='dashboard-analytics'>
      <Row className='match-height'>
        <Col lg='4' sm='12'>
        <Link to='/project'>
          <Card className='card-congratulations'>
            <CardBody className='text-center'>
              <Avatar icon={<Plus size={28} />} className='shadow' color='primary' size='xl' />
              <div className='text-center'>
                <h1 className='mb-1 text-white'><strong>Create New Project</strong></h1>
                <CardText className='m-auto w-75'>
                  Create a New Project with  products
                </CardText>
              </div>
            </CardBody>
          </Card>
        </Link>
        </Col>

        <Col lg='4' sm='6'>
        <Link to='/projecthistory'>
          <Card className='card-congratulations'>
            <CardBody className='text-center'>
              <Avatar icon={<Eye size={28} />} className='shadow' color='primary' size='xl' />
              <div className='text-center'>
                <h1 className='mb-1 text-white'><strong>Project History</strong></h1>
                <CardText className='m-auto w-75'>
                  Your all previous Projects
                </CardText>
              </div>
            </CardBody>
          </Card>
          </Link>
        </Col>


        <Col lg='4' sm='6'>
        <Link to='/mapview'>

          <Card className='card-congratulations'>
            <CardBody className='text-center'>
              <Avatar icon={<Map size={28} />} className='shadow' color='primary' size='xl' />
              <div className='text-center'>
                <h1 className='mb-1 text-white'><strong>Map View</strong></h1>
                <CardText className='m-auto w-75'>
                  Find your all products from location
                </CardText>
              </div>
            </CardBody>
          </Card>
          </Link>
        </Col>
      
      </Row>

      <Row className="match-height">
        <Col xs="12">
          <ProjectHistory></ProjectHistory>
        </Col>
      </Row>
    </div>
  );
};

export default AnalyticsDashboard;
