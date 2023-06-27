import Request from ".";
import { ApiRoutes } from "../constants";

const LoginRequest = async (data) => {
  try {
    const res = await Request.post(ApiRoutes.LOGIN, data);
    return res;
  } catch (error) {
    throw error;
  }
};
export { LoginRequest };
