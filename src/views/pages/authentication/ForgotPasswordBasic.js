// ** React Imports
import { Link } from "react-router-dom";

// ** Icons Imports
import { ChevronLeft } from "react-feather";

// ** Third Party Components
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button,
  FormFeedback,
} from "reactstrap";

// ** Styles
import "@styles/react/pages/page-authentication.scss";
import { isUserLoggedIn } from "../../../utility/Utils";
import { forgotPassword } from "../../../@core/api/common_api";
const ForgotPasswordBasic = () => {
  const defaultValues = { email: "" };
  const validationSchema = yup.object().shape({
    email: yup.string().email().required("Email is required field"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async(data) => {
    if (Object.values(data).every((field) => field.length > 0)) {
      console.log(data);
      let response = await forgotPassword(data);
      console.log("response",response);

    }
  };
  if (!isUserLoggedIn()) {
    return (
      <div className="auth-wrapper auth-basic px-2">
        <div className="auth-inner my-2">
          <Card className="mb-0">
            <CardBody>
              <Link
                className="brand-logo"
                to="/"
                onClick={(e) => e.preventDefault()}
              >
                <h2 className="brand-text text-primary ms-1">PHOTOVOLTAIK</h2>
              </Link>
              <CardTitle tag="h4" className="mb-1">
                Forgot Password?
              </CardTitle>
              <CardText className="mb-2">
                Enter your email and we'll send you instructions to reset your
                password
              </CardText>
              <Form
                className="auth-forgot-password-form mt-2"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="mb-1">
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
                        autoFocus
                      />
                    )}
                  />
                  {errors.email && (
                    <FormFeedback>{errors.email.message}</FormFeedback>
                  )}
                </div>
                <Button color="primary" block>
                  Send reset link
                </Button>
              </Form>
              <p className="text-center mt-2">
                <Link to="/login">
                  <ChevronLeft className="rotate-rtl me-25" size={14} />
                  <span className="align-middle">Back to login</span>
                </Link>
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/" />;
  }
};

export default ForgotPasswordBasic;
