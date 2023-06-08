// ** React Imports
import { Fragment } from "react";

// ** Third Party Components
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Check, ChevronLeft, ChevronRight } from "react-feather";

// ** Reactstrap Imports
import { Form, Label, Input, Row, Col, Button, FormFeedback } from "reactstrap";

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle";
import { useNavigate } from "react-router-dom";

const defaultValues = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  mobileNumber: "",
  password: "",
  confirmPassword: "",
};

const AccountDetails = ({ stepper }) => {
  const navigate = useNavigate();

  const SignupSchema = yup.object().shape({
    firstName: yup.string().required("First Name is required field"),
    lastName: yup.string().required("Last Name is required field"),
    userName: yup.string().required("User Name is required field"),
    email: yup.string().email().required("Email is required field"),
    mobileNumber: yup.string().required("Mobile Number is required field"),
    password: yup.string().required("Password is required field"),
    confirmPassword: yup
      .string()
      .required("Confirm Password is required field")
      .oneOf([yup.ref(`password`), null], "Passwords must match"),
  });

  // ** Hooks

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(SignupSchema),
  });

  const onSubmit = (data) => {
    if (Object.values(data).every((field) => field.length > 0)) {
      console.log(data);
    }
  };

  return (
    <Fragment>
      <div className="content-header mb-2">
        <h2 className="fw-bolder mb-75">Account Information</h2>
        <span>Enter your username password details</span>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="firstName">
              First Name
            </Label>
            <Controller
              id="firstName"
              name="firstName"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="john doe"
                  invalid={errors.firstName && true}
                  {...field}
                />
              )}
            />
            {errors.firstName && (
              <FormFeedback>{errors.firstName.message}</FormFeedback>
            )}
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="lastName">
              Last Name
            </Label>
            <Controller
              id="lastName"
              name="lastName"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="john doe"
                  invalid={errors.lastName && true}
                  {...field}
                />
              )}
            />
            {errors.lastName && (
              <FormFeedback>{errors.lastName.message}</FormFeedback>
            )}
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="userName">
              Username
            </Label>
            <Controller
              id="userName"
              name="userName"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="john doe"
                  invalid={errors.userName && true}
                  {...field}
                />
              )}
            />
            {errors.userName && (
              <FormFeedback>{errors.userName.message}</FormFeedback>
            )}
          </Col>
          <Col md="6" sm="12">
            <div className="mb-1">
              <Label className="form-label" for="mobileNumber">
                Mobile Number:
              </Label>
              <Controller
                control={control}
                name="mobileNumber"
                render={({ field }) => (
                  <Input
                    type="number"
                    id="mobileNumber"
                    placeholder="0123456789"
                    invalid={errors.mobileNumber && true}
                    {...field}
                  />
                )}
              />
              {errors.mobileNumber && (
                <FormFeedback>{errors.mobileNumber.message}</FormFeedback>
              )}
            </div>
          </Col>

          <Col md="6" className="mb-1">
            <Label className="form-label" for="email">
              Email
            </Label>
            <Controller
              control={control}
              id="email"
              name="email"
              render={({ field }) => (
                <Input
                  type="email"
                  placeholder="john.doe@email.com"
                  invalid={errors.email && true}
                  {...field}
                />
              )}
            />
            {errors.email && (
              <FormFeedback>{errors.email.message}</FormFeedback>
            )}
          </Col>
        </Row>
        <Row>
          <div className="form-password-toggle col-md-6 mb-1">
            <Controller
              id="password"
              name="password"
              control={control}
              render={({ field }) => (
                <InputPasswordToggle
                  label="Password"
                  htmlFor="password"
                  className="input-group-merge"
                  invalid={errors.password && true}
                  {...field}
                />
              )}
            />
            {errors.password && (
              <FormFeedback>{errors.password.message}</FormFeedback>
            )}
          </div>
          <div className="form-password-toggle col-md-6 mb-1">
            <Controller
              control={control}
              id="confirmPassword"
              name="confirmPassword"
              render={({ field }) => (
                <InputPasswordToggle
                  label="Confirm Password"
                  htmlFor="password"
                  className="input-group-merge"
                  invalid={errors.confirmPassword && true}
                  {...field}
                />
              )}
            />
            {errors.confirmPassword && (
              <FormFeedback>{errors.confirmPassword.message}</FormFeedback>
            )}
          </div>
        </Row>
        {/* <Row>
          <Col sm={12} className='mb-1'>
            <Label className='form-label' for='profile-link'>
              Profile Link
            </Label>
            <Input id='profile-link' placeholder='johndoe/profile' />
          </Col>
          <Col sm={12} className='mb-1'>
            <div className='form-check form-check-inline'>
              <Input type='checkbox' id='remember-me' />
              <Label for='remember-me' className='form-check-label'>
                Remember Me
              </Label>
            </div>
          </Col>
        </Row> */}
        <div className="d-flex justify-content-between mt-2">
          <Button
            color="secondary"
            className="btn-prev"
            outline
            onClick={() => navigate("/login")}
          >
            <ChevronLeft
              size={14}
              className="align-middle me-sm-25 me-0"
            ></ChevronLeft>
            <span className="align-middle d-sm-inline-block d-none">
              Back to Login
            </span>
          </Button>
          <Button type="submit" color="primary" className="btn-next">
            <span className="align-middle d-sm-inline-block d-none">
              Register
            </span>
            <Check size={14} className="align-middle ms-sm-25 ms-0"></Check>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default AccountDetails;
