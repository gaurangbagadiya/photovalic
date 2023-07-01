// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Third Party Components
import Select from "react-select";
import Cleave from "cleave.js/react";
import { useForm, Controller } from "react-hook-form";
import "cleave.js/dist/addons/cleave-phone.us";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Form,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  FormFeedback,
} from "reactstrap";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Demo Components
import secureLocalStorage from "react-secure-storage";

import DeleteAccount from "./DeleteAccount";
import { notification } from "../../../@core/constants/notification";
import { getUserById, updateUser } from "../../../@core/api/common_api";

const AccountTabs = () => {
  // ** Hooks
  const defaultValues = {
    lastname: "",
    firstname: "",
  };
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  // ** States
  // const [avatar, setAvatar] = useState(data.avatar ? data.avatar : "");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // const tempdata = UserData
    // setUserData(tempdata);
    const data1 = JSON.parse(secureLocalStorage.getItem("userData"));
    delete data1?.password;
    console.log("data1", data1);
    setUserData(data1);
  }, []);
  console.log("user details", userData);

  const onChange = (e) => {
    const reader = new FileReader(),
      files = e.target.files;
    reader.onload = function () {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const onSubmit = async (data) => {
    console.log("userdata", userData);
    let response = await updateUser(userData);
    // console.log("respo", response);
    notification({
      type: response?.status == 1 ? "success" : "error",
      message: response.message,
    });

    if (response?.status == 1) {
      console.log("response", response);
      let userResponse = await getUserById(userData?._id);
      setUserData(userResponse?.data);
      secureLocalStorage.setItem(
        "userData",
        JSON.stringify(userResponse?.data)
      );
    }

    // if (Object.values(data).every(field => field.length > 0)) {
    //   return null
    // } else {
    // for (const key in data) {
    //   if (data[key].length === 0) {
    //     setError(key, {
    //       type: 'manual'
    //     })
    //   }
    // }
    // }
  };

  // const handleImgReset = () => {
  //   setAvatar(require("@src/assets/images/avatars/avatar-blank.png").default);
  // };

  return (
    <Fragment>
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">Update Profile Details</CardTitle>
        </CardHeader>
        <CardBody className="py-2 my-25">
          {/* <div className='d-flex'>
            <div className='me-25'>
              <img className='rounded me-50' src={avatar} alt='Generic placeholder image' height='100' width='100' />
            </div>
            <div className='d-flex align-items-end mt-75 ms-1'>
              <div>
                <Button tag={Label} className='mb-75 me-75' size='sm' color='primary'>
                  Upload
                  <Input type='file' onChange={onChange} hidden accept='image/*' />
                </Button>
                <Button className='mb-75' color='secondary' size='sm' outline onClick={handleImgReset}>
                  Reset
                </Button>
                <p className='mb-0'>Allowed JPG, GIF or PNG. Max size of 800kB</p>
              </div>
            </div>
          </div> */}
          <Form className="mt-2 pt-50" onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="firstname">
                  First Name
                </Label>
                <Controller
                  id=" "
                  name="firstname"
                  control={control}
                  render={({ field }) => (
                    <Input
                      onChange={(e) => {
                        setUserData({
                          ...userData,
                          firstname: e?.target?.value,
                        });
                      }}
                      value={userData?.firstname}
                      invalid={errors.firstname && true}
                    />
                  )}
                />
                {errors.firstname && (
                  <FormFeedback>{errors.firstname.message}</FormFeedback>
                )}
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="lastname">
                  Last Name
                </Label>
                <Controller
                  id="lastname"
                  name="lastname"
                  control={control}
                  render={({ field }) => (
                    <Input
                      onChange={(e) => {
                        setUserData({
                          ...userData,
                          lastname: e?.target?.value,
                        });
                      }}
                      placeholder="john doe"
                      value={userData?.lastname}
                      invalid={errors.lastname && true}
                    />
                  )}
                />
                {errors.lastname && (
                  <FormFeedback>{errors.lastname.message}</FormFeedback>
                )}
              </Col>
              <Col sm="6" className="mb-1">
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
                      onChange={(e) => {
                        setUserData({ ...userData, phone: e?.target?.value });
                      }}
                      placeholder="0123456789"
                      value={userData?.phone}
                      invalid={errors.mobileNumber && true}
                    />
                  )}
                />
                {errors.mobileNumber && (
                  <FormFeedback>{errors.mobileNumber.message}</FormFeedback>
                )}
              </Col>
              <Col sm="6" className="mb-1">
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
                      onChange={(e) => {
                        setUserData({ ...userData, email: e?.target?.value });
                      }}
                      placeholder="john.doe@email.com"
                      value={userData?.email}
                      invalid={errors.email && true}
                    />
                  )}
                />
                {errors.email && (
                  <FormFeedback>{errors.email.message}</FormFeedback>
                )}
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="userName">
                  Username
                </Label>
                <Controller
                  id="userName"
                  name="userName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      onChange={(e) => {
                        setUserData({
                          ...userData,
                          username: e?.target?.value,
                        });
                      }}
                      placeholder="john doe"
                      value={userData?.username}
                      invalid={errors.userName && true}
                    />
                  )}
                />
                {errors.userName && (
                  <FormFeedback>{errors.userName.message}</FormFeedback>
                )}
              </Col>

              <Col className="mt-2" sm="12">
                <Button type="submit" className="me-1" color="primary">
                  Save changes
                </Button>
                <Button color="secondary" outline>
                  Discard
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
      <DeleteAccount />
    </Fragment>
  );
};

export default AccountTabs;
