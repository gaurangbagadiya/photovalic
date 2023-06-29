// ** React Imports
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

// ** Icons Imports
import { ChevronLeft } from "react-feather";

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle";

// ** Reactstrap Imports
import {
    Card,
    CardBody,
    CardTitle,
    CardText,
    Form,
    Label,
    Button,
    FormFeedback,
} from "reactstrap";

// ** Styles
import "@styles/react/pages/page-authentication.scss";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPassword } from "../../../@core/api/common_api";
import { notification } from "../../../@core/constants/notification";

const ResetPasswordBasic = () => {

    const defaultValues = {
        password: "",
        confirmPassword: "",
    };
    let { token } = useParams();
    console.log("token",token);
    const navigate = useNavigate();

    const SignupSchema = yup.object().shape({

        password: yup.string().required("Password is required field"),
        confirmPassword: yup
            .string()
            .required("Confirm Password is required field")
            .oneOf([yup.ref(`password`), null], "Passwords must match"),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues,
        resolver: yupResolver(SignupSchema),
    });

    const onSubmit = async (data) => {
        if (Object.values(data).every((field) => field.length > 0)) {
            console.log(data);
            let formData = {
                token:token,
                password: data?.password,
                confirmPassword:data?.confirmPassword
            }
            const response = await resetPassword(formData);
            console.log(response, "response");
            if (response?.status === 1) {
                notification({
                    type: "success",
                    message: response.message,
                });
                navigate("/login")
            } else {
                notification({
                    type: "error",
                    message: response.message,
                });
            }
        }
    };

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
                            <svg viewBox="0 0 139 95" version="1.1" height="28">
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
                                        <stop
                                            stopColor="#EEEEEE"
                                            stopOpacity="0"
                                            offset="0%"
                                        ></stop>
                                        <stop stopColor="#FFFFFF" offset="100%"></stop>
                                    </linearGradient>
                                </defs>
                                <g
                                    id="Page-1"
                                    stroke="none"
                                    strokeWidth="1"
                                    fill="none"
                                    fillRule="evenodd"
                                >
                                    <g
                                        id="Artboard"
                                        transform="translate(-400.000000, -178.000000)"
                                    >
                                        <g id="Group" transform="translate(400.000000, 178.000000)">
                                            <path
                                                d="M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z"
                                                id="Path"
                                                className="text-primary"
                                                style={{ fill: "currentColor" }}
                                            ></path>
                                            <path
                                                d="M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z"
                                                id="Path"
                                                fill="url(#linearGradient-1)"
                                                opacity="0.2"
                                            ></path>
                                            <polygon
                                                id="Path-2"
                                                fill="#000000"
                                                opacity="0.049999997"
                                                points="69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325"
                                            ></polygon>
                                            <polygon
                                                id="Path-2"
                                                fill="#000000"
                                                opacity="0.099999994"
                                                points="69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338"
                                            ></polygon>
                                            <polygon
                                                id="Path-3"
                                                fill="url(#linearGradient-2)"
                                                opacity="0.099999994"
                                                points="101.428699 0 83.0667527 94.1480575 130.378721 47.0740288"
                                            ></polygon>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                            <h2 className="brand-text text-primary ms-1">Vuexy</h2>
                        </Link>
                        <CardTitle tag="h4" className="mb-1">
                            Reset Password 🔒
                        </CardTitle>
                        <CardText className="mb-2">
                            Your new password must be different from previously used passwords
                        </CardText>
                        <Form
                            className="auth-reset-password-form mt-2"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="mb-1">
                                <Label className="form-label" for="new-password">
                                    New Password
                                </Label>
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
                                            autoFocus
                                        />
                                    )}
                                />
                                {errors.password && (
                                    <FormFeedback>{errors.password.message}</FormFeedback>
                                )}
                            </div>
                            <div className="mb-1">
                                <Label className="form-label" for="confirm-password">
                                    Confirm Password
                                </Label>
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
                            <Button color="primary" block>
                                Set New Password
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
};

export default ResetPasswordBasic;
