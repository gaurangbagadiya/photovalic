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
            <div className=" my-2">
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
                            Reset Password?
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
