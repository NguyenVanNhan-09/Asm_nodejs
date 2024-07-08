import { Navigate, Outlet } from "react-router-dom";

function PrivateRouter() {
   const acccessToken = JSON.parse(localStorage.getItem("user"))?.accessToken;
   return acccessToken ? <Outlet /> : <Navigate to="/login" />;
}
export default PrivateRouter;
