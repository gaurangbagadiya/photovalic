// ** React Imports
import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

// ** Custom Hooks
import { useSkin } from "@hooks/useSkin";
import useJwt from "@src/auth/jwt/useJwt";

// ** Third Party Components
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";

// ** Actions
// import { handleLogin } from "@store/authentication";

// ** Context
import { AbilityContext } from "@src/utility/context/Can";

// ** Custom Components
import Avatar from "@components/avatar";
import InputPasswordToggle from "@components/input-password-toggle";

// ** Utils
import { getHomeRouteForLoggedInUser, isObjEmpty, handleLogin } from "@utils";

import { LoginRequest } from "../../../@core/api/auth";

// ** Reactstrap Imports
import {
  Form,
  Input,
  Label,
  Alert,
  Button,
  CardText,
  CardTitle,
  UncontrolledTooltip,
  FormFeedback,
  Card,
  CardBody,
} from "reactstrap";

// ** Styles
import "@styles/react/pages/page-authentication.scss";
import { notification } from "../../../@core/constants/notification";
import { isUserLoggedIn } from "../../../utility/Utils";

//const ToastContent = ({ t, name, role }) => {
// return (
// <div className="d-flex">
// <div className="me-1">
// <Avatar size="sm" color="success" icon={<Coffee size={12} />} />
//      </div>
//    <div className="d-flex flex-column">
//    <div className="d-flex justify-content-between">
//    <h6>{name}</h6>
//  <X
//  size={12}
//className="cursor-pointer"
//       onClick={() => toast.dismiss(t.id)}
//   />
// </div>
//<span>
//You have successfully logged in as an {role} user to Vuexy. Now you
// can start to explore. Enjoy!
// </span>
//  </div>
//  </div>
// );
//};

const defaultValues = {
  email: "niravmendapara@gmail.com",
  password: "Nivs#111",

};

const Login = () => {
  // ** Hooks
  const { skin } = useSkin();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ability = useContext(AbilityContext);
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });
  const illustration = skin === "dark" ? "login-v2-dark.svg" : "login-v2.svg",
    source = require(`@src/assets/images/pages/${illustration}`).default;

  const onSubmit = async (data) => {
    if (Object.values(data).every((field) => field.length > 0)) {
      // useJwt
      //   .login({ email: data.email, password: data.password })
      //   .then((res) => {
      //     const data = {
      //       ...res.data.userData,
      //       accessToken: res.data.accessToken,
      //       refreshToken: res.data.refreshToken,
      //     };
      //     dispatch(handleLogin(data));
      //     ability.update(res.data.userData.ability);
      //     navigate(getHomeRouteForLoggedInUser(data.role));
      //     toast((t) => (
      //       <ToastContent
      //         t={t}
      //         role={data.role || "admin"}
      //         name={data.fullName || data.username || "John Doe"}
      //       />
      //     ));
      //   })
      //   .catch((err) => console.log(err));
      console.log("data", data);
      setLoading(true);
      const response = await LoginRequest(data);
      console.log(response, "response");
      if (response?.status === 1) {
        await handleLogin(response);
        window.location.href = `${getHomeRouteForLoggedInUser("admin")}`;
        // if (response?.data.type == 0) {
        // } else {
        //   window.location.href = `${getHomeRouteForLoggedInUser("client")}`;
        // }
        setLoading(false);

        notification({
          type: "success",
          // title: "Login Successfully",
          message: response.message,
        });
      } else {
        setLoading(false);
        notification({
          type: "error",
          title: "Login Unsuccessful",
          message: response.message,
        });
      }
    } else {
      for (const key in data) {
        if (data[key]?.length === 0) {
          setError(key, {
            type: "manual",
          });
        }
      }
    }
  };

  return (
    <div className="auth-wrapper auth-basic px-2">
      <div className="auth-inner my-2">
        <Card className="mb-0">
          <CardBody>
            {/* <Link className='brand-logo' to='/' 
          onClick={e => e.preventDefault()}
          > */}
            <svg viewBox="0 0 139 95" version="1.1" height="28" />
            <defs>
              <linearGradient
                x1="100%"
                y1="10.5120544%"
                x2="50%"
                y2="89.4879456%"
                id="linearGradient-1"
              >
                <stop stopColor="#000000" offset="0%"></stop>
                <stop stopColor="#FFFFFF" offset="100%"></stop>
              </linearGradient>
              <linearGradient
                x1="64.0437835%"
                y1="46.3276743%"
                x2="37.373316%"
                y2="100%"
                id="linearGradient-2"
              >
                <stop stopColor="#EEEEEE" stopOpacity="0" offset="0%"></stop>
                <stop stopColor="#FFFFFF" offset="100%"></stop>
              </linearGradient>
            </defs>
            <g
              id="Page-1"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            ></g>
            <h2 className="brand-text text-primary ms-1">PHOTOVOLTAIK</h2>
            <CardTitle tag="h4" className="mb-1">
              Welcome To photovoltaik
            </CardTitle>
            <CardText className="mb-2">
              Please Log-in to your account and start the adventure
            </CardText>
            <Form
              className="auth-login-form mt-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mb-1">
                <Label className="form-label" for="login-email">
                  Email
                </Label>
                <Controller
                  id="email"
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      type="email"
                      placeholder="john@example.com"
                      invalid={errors.email && true}
                      {...field}
                    />
                  )}
                />
                {/* {errors?.email && (
                  <FormFeedback>{errors?.email?.message}</FormFeedback>
                )} */}
              </div>
              <div className="mb-1">
                <div className="d-flex justify-content-between">
                  <Label className="form-label" for="login-email">
                    Password
                  </Label>
                  <Link to="/forgot-password">
                    <small>Forgot Password?</small>
                  </Link>
                </div>
                <Controller
                  id="password"
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle
                      id="password"
                      name="password"
                      className="input-group-merge"
                      invalid={errors.password && true}
                      {...field}
                    />
                  )}
                />
                {/* {errors?.password && (
                  <FormFeedback>{errors?.password?.message}</FormFeedback>
                )} */}
              </div>
              {/* <div className="form-check mb-1">
                <Input type="checkbox" id="remember-me" />
                <Label className="form-check-label" for="remember-me">
                  Remember Me
                </Label>
              </div> */}

              <Button type="submit" color="primary" block>
                Sign in
              </Button>
            </Form>
            <p className="text-center mt-2">
              <span className="me-25">New on our platform?</span>
              <Link to="/register">
                <span>Create an account</span>
              </Link>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
//export default Login;

const CheckLogin = () => {
  // console.log("isUserLoggedIn() ", isUserLoggedIn());
  return isUserLoggedIn() ? <Navigate to="/" /> : <Login />;
};
export default CheckLogin;