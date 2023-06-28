import Request from ".";

import { ApiRoutes } from "../constants";
import { notification } from "../constants/notification";

export const forgotPassword = async (formdata) => {
  try {
    const res = await Request.post(ApiRoutes.FORGOTPASSWORD, formdata);
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const checkEmail = async (data) => {
  try {
    const res = await Request.post(ApiRoutes.CHECKEMAIL, data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const checkMobile = async (data) => {
  try {
    const res = await Request.post(ApiRoutes.CHECKMOBILE, data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (data) => {
  try {
    const res = await Request.post(ApiRoutes.REGISTER, data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getAttributeById = async (type) => {
  try {
    const res = await Request.get(ApiRoutes.GETATTRIBUTEBYID + "/" + type);
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const getAllProjects = async () => {
  try {
    const res = await Request.get(ApiRoutes.GETALLPROJECTS);
    console.log("res");
    return res;
  } catch (error) {
    throw error;
  }
};

export const getAllProjectsWithProducts = async () => {
  try {
    const res = await Request.get(ApiRoutes.GETALLPROJECTSWITHPRODUCTS);
    console.log("res");
    return res;
  } catch (error) {
    throw error;
  }
};

export const getProjectById = async (id) => {
  try {
    const res = await Request.get(ApiRoutes.GETPROJECTBYID + "/" + id);
    console.log("res");
    return res;
  } catch (error) {
    throw error;
  }
};

export const insertProject = async (data) => {
  try {
    const res = await Request.post(ApiRoutes.INSERTPROJECT, data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const updateProject = async (data) => {
  try {
    const res = await Request.put(
      ApiRoutes.UPDATEPROJECT + "/" + data?.project_id,
      data
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const deleteProject = async (id) => {
  try {
    const res = await Request.delete(ApiRoutes.DELETEPROJECTBYID + "/" + id);
    return res;
  } catch (error) {
    throw error;
  }
};

export const insertProduct = async (data) => {
  try {
    const res = await Request.post(ApiRoutes.INSERTPRODUCT, data);
    return res;
  } catch (error) {
    console.log("aaaaaaaaaaaaaaaaaaaa0", error?.message);
    notification("error", error?.message?.message);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const res = await Request.delete(ApiRoutes.DELETEPRODUCTBYID + "/" + id);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getAllProductsById = async (id) => {
  try {
    const res = await Request.get(ApiRoutes.GETALLPRODUCTSBYID + "/" + id);
    console.log("res");
    return res;
  } catch (error) {
    throw error;
  }
};

export const getAllPredefine = async () => {
  try {
    const res = await Request.get(ApiRoutes.GETALLPREDEFINE);
    return res;
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (data) => {
  try {
    const res = await Request.put(
      ApiRoutes.UPDATEPRODUCT + "/" + data?.product_id,
      data
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (data) => {
  try {
    const res = await Request.put(
      ApiRoutes.UPDATEUSERBYID + "/" + data?._id,
      data
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const res = await Request.delete(ApiRoutes.DELETEUSER + "/" + id);
    return res;
  } catch (error) {
    throw error;
  }
};


export const getUserById = async (id) => {
  try {
    const res = await Request.get(ApiRoutes.GETUSERDATA + "/" + id);
    console.log("res");
    return res;
  } catch (error) {
    throw error;
  }
};