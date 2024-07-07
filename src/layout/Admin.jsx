<<<<<<< HEAD
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "../page/dashboard";
import ListProducts from "../page/ListProduct";
import { useEffect, useState } from "react";
import instance from "./../Api/index";
import HomeAdmin from "../page/HomeAdmin";
import AddProduct from "../page/AddProduct";
import UpdateProduct from "../page/UpdateProduct";
=======
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../page/dashboard";
import ListProducts from "../page/ListProduct";
>>>>>>> f8751783e293e378ea70103c8d099700fd700556

export default function Admin() {
   const navi = useNavigate();
   const [products, setProducts] = useState([]);
   useEffect(() => {
      (async () => {
         try {
            const { data } = await instance.get("/products");
            console.log(data);
            setProducts(data);
         } catch (error) {
            console.log(error.massage);
         }
      })();
   }, []);

   // Create
   const handleCreate = (product) => {
      (async () => {
         try {
            const { data } = await instance.post("/products", product);
            setProducts([...products, data]);
            if (confirm("create successfully, remove the home page")) {
               navi("/admin/products-list");
            }
         } catch (error) {
            console.log(error.message);
         }
      })();
   };
   // Delete
   const handleDelete = (id) => {
      (async () => {
         try {
            if (confirm("Are you sure you want to delete")) {
               await instance.delete(`/products/${id}`);
               alert("Delete successfully");
               setProducts(products.filter((product) => product.id !== id));
               navi("/admin/products-list");
            }
         } catch (error) {
            console.log(error.message);
         }
      })();
   };
   // Update

   const hanldeUpdate = (product) => {
      (async () => {
         try {
            const { data } = await instance.put(
               `/products/${product.id}`,
               product
            );
            setProducts(products.map((i) => (i.id === data.id ? data : i)));
            navi("/admin/products-list");
         } catch (error) {
            console.log(error.message);
         }
      })();
   };

   return (
      <>
         <div class="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
            <div class="h-32 rounded-lg bg-gray-200">
               <Dashboard />
            </div>
            <div class="h-32 rounded-lg bg-gray-200 lg:col-span-3">
               <Routes>
<<<<<<< HEAD
                  <Route path="/" element={<Navigate to="home" />} />
                  <Route path="/home" element={<HomeAdmin />} />
                  <Route
                     path="/products-list"
                     element={
                        <ListProducts data={products} onDel={handleDelete} />
                     }
                  />
                  <Route
                     path="/products-add"
                     element={<AddProduct onAdd={handleCreate} />}
                  />

                  <Route
                     path="/products-update/:id"
                     element={<UpdateProduct onEdit={hanldeUpdate} />}
                  />
=======
                  <Route path="/" element={<Navigate to="products-list" />} />
                  <Route path="products-list" element={<ListProducts />} />
>>>>>>> f8751783e293e378ea70103c8d099700fd700556
               </Routes>
            </div>
         </div>
      </>
   );
}
