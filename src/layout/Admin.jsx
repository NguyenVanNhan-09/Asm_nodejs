import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../page/dashboard";
import ListProducts from "../page/ListProduct";

export default function Admin() {
   return (
      <>
         <div class="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
            <div class="h-32 rounded-lg bg-gray-200">
               <Dashboard />
            </div>
            <div class="h-32 rounded-lg bg-gray-200 lg:col-span-3">
               <Routes>
                  <Route path="/" element={<Navigate to="products-list" />} />
                  <Route path="products-list" element={<ListProducts />} />
               </Routes>
            </div>
         </div>
      </>
   );
}
