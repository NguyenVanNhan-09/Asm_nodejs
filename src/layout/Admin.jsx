import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../page/dashboard";
import ListProducts from "../page/ListProduct";
import HomeAdmin from "../page/HomeAdmin";
import AddProduct from "../page/AddProduct";
import UpdateProduct from "../page/UpdateProduct";

export default function Admin() {
   return (
      <>
         <div class="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
            <div class="h-32 rounded-lg bg-gray-200">
               <Dashboard />
            </div>
            <div class="h-32 rounded-lg bg-gray-200 lg:col-span-3">
               <Routes>
                  <Route path="/" element={<Navigate to="home" />} />
                  <Route path="/home" element={<HomeAdmin />} />
                  <Route path="/products-list" element={<ListProducts />} />
                  <Route path="/products-add" element={<AddProduct />} />
                  <Route
                     path="/products-update/:id"
                     element={<UpdateProduct />}
                  />
               </Routes>
            </div>
         </div>
      </>
   );
}
