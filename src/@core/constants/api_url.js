export const ApiRoutes = {
  API_HOSTNAME: "http://localhost:7000",
  // your api end points

  LOGIN: "users/login",
  REGISTER: "users/register",
  FORGOTPASSWORD: "users/forgot-password",
  CHECKEMAIL: "check-email",
  CHECKMOBILE: "check-mobile",

  GETATTRIBUTEBYID: "get-attributebyid",

  GETALLPROJECTS: "/projects/getproject",
  GETALLPROJECTSWITHPRODUCTS: "/projects/getprojectwithproducts",
  GETPROJECTBYID: "/projects/projectbyid",
  INSERTPROJECT: "/projects/add",
  DELETEPROJECTBYID: "/projects/Alldelete",
  UPDATEPROJECT: "/projects/update",

  INSERTPRODUCT: "/Product/add",
  DELETEPRODUCTBYID: "Product/delete",

  UPDATEPRODUCT: "/Product/update",
  GETALLPRODUCTSBYID: "/Product/allproducts",

  GETALLPREDEFINE: "/Predefine/getAllData",
  UPDATEUSERBYID: "/users/update",
  DELETEUSER: "/users/delete",
  GETUSERDATA:"/users/getUser",
  RESETPASSWORD:"/users/resetPassword",

  SENDREPORTBYID:"/projects/CalculatePeakPower",
};
