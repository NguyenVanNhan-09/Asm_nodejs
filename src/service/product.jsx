import instance from "../Api";

export const GetAllProducts = async () => {
   try {
      const { data } = await instance.get("/products");
      return data;
   } catch (error) {
      console.log(error);
   }
};
export const GetById = async (id) => {
   try {
      const { data } = await instance.get("/products" + `/${id}`);
      return data;
   } catch (error) {
      console.log(error);
   }
};
export const AddProduct = async (formData) => {
   try {
      const { data } = await instance.post("/products", formData);
      return data;
   } catch (error) {
      console.log(object);
   }
};
export const DeleteProduct = async (id) => {
   try {
      const { data } = await instance.delete("/products" + `/${id}`);
      return data;
   } catch (error) {
      console.log(error);
   }
};
export const UpdateProduct = async (id, formData) => {
   try {
      const { data } = await instance.put("/products" + `/${id}`, formData);
      return data;
   } catch (error) {
      console.log(error);
   }
};
