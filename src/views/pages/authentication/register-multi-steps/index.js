// ** React Imports
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

// ** Custom Components
import Wizard from "@components/wizard";

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

// ** Third Party Components
import { Home, User, CreditCard } from "react-feather";

// ** Steps
import AccountDetails from "./steps/AccountDetails";

// ** Styles
import "@styles/react/pages/page-authentication.scss";

const RegisterMultiSteps = () => {
  // ** Ref
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);

  const steps = [
    {
      id: "account-details",
      title: "Create Account ",
      subtitle: "Enter username",
      icon: <Home size={18} />,
      content: <AccountDetails stepper={stepper} />,
    },
  ];

  const source = require("@src/assets/images/pages/create-account.svg").default;

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/">
          <h2 className="brand-text text-primary ms-1">PHOTOVOLTAIK</h2>
        </Link>
        <Col lg="3" className="d-none d-lg-flex align-items-center p-0">
          <div className="w-100 d-lg-flex align-items-center justify-content-center">
            <img className="img-fluid w-100" src={source} alt="Login Cover" />
          </div>
        </Col>
        <Col
          lg="9"
          className="d-flex align-items-center auth-bg px-2 px-sm-3 px-lg-5 pt-3"
        >
          <div className="width-700 mx-auto">
            <Wizard
              ref={ref}
              steps={steps}
              instance={(el) => setStepper(el)}
              headerClassName="px-0"
              contentWrapperClassName="px-0 mt-4"
              className="register-multi-steps-wizard shadow-none"
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default RegisterMultiSteps;
