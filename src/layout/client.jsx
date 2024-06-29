import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Contact from "../page/Contact";
import Home from "../page/Home";
import instance from "./../Api/index";
import { useEffect, useState } from "react";
import ProductDetail from "../components/ProductDetail";
import Banner from "./../components/Banner";

export default function Client() {
   const [products, setProducts] = useState([]);
   const location = useLocation();

   useEffect(() => {
      (async () => {
         try {
            const { data } = await instance.get("/products");
            // console.log(data);
            setProducts(data);
         } catch (error) {
            console.log(error.message);
         }
      })();
   }, []);

   const hideHeaderFooter = location.pathname.includes("home/detail");

   return (
      <>
         <div className="flex flex-col justify-between min-h-[100vh]">
            <Header />
            {!hideHeaderFooter && <Banner />}
            <Routes>
               <Route path="home" element={<Home data={products} />} />
               <Route path="home/detail/:id" element={<ProductDetail />} />
               <Route path="contact" element={<Contact />} />
            </Routes>
            <Footer />
         </div>
      </>
   );
}
