import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import {
   AddProduct,
   DeleteProduct,
   GetAllProducts,
   UpdateProduct,
} from "../service/product";
import { useNavigate } from "react-router-dom";

export const productCT = createContext({});
const ProductContext = ({ children }) => {
   const [products, setProducts] = useState([]);
   const navi = useNavigate();
   useEffect(() => {
      const fetchProducts = async () => {
         const data = await GetAllProducts();
         if (data) {
            setProducts(data);
         }
      };
      fetchProducts();
   }, []);
   const handleDelete = async (id) => {
      try {
         if (confirm("Are you sure you want to delete !!!")) {
            await DeleteProduct(id);
            alert("Delete product successfully !!!");
            setProducts(products.filter((i) => i.id !== id));
         }
      } catch (error) {
         console.log(error);
      }
   };
   const handleAddProduct = async (formData) => {
      try {
         const data = await AddProduct(formData);
         setProducts([...products, data]);
         alert("Add product successfully!");
      } catch (error) {
         console.log(error);
      }
   };
   const handleUpdate = async (id, formData) => {
      try {
         const data = await UpdateProduct(id, formData);
         setProducts(products.map((i) => (i.id == id ? data : i)));
         alert("Updated successfully");
      } catch (error) {
         console.log(error);
      }
   };
   const navigate = (myRouter) => {
      return navi(`${myRouter}`);
   };

   return (
      <productCT.Provider
         value={{
            products,
            handleDelete,
            handleAddProduct,
            handleUpdate,
            navigate,
         }}
      >
         {children}
      </productCT.Provider>
   );
};

export default ProductContext;
