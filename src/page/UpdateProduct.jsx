import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import instance from "../Api";
import { useParams } from "react-router-dom";

const productschema = z.object({
   title: z.string().nonempty("Tiêu đề là bắt buộc").min(5),
   price: z.number().min(0, "Giá là bắt buộc và phải lớn hơn hoặc bằng 0"),
   image: z.string().nonempty("Ảnh là bắt buộc"),
   category: z.string().nonempty("Danh mục là bắt buộc"),
   description: z.string(),
});

function UpdateProduct({ onEdit }) {
   const { id } = useParams();
   const [product, setProduct] = useState();
   useEffect(() => {
      (async () => {
         try {
            const { data } = await instance.get("/products/" + id);
            setProduct(data);
         } catch (error) {
            console.log(error.message);
         }
      })();
   }, [id]);
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ resolver: zodResolver(productschema) });
   const onSubmit = (data) => {
      onEdit({ ...data, id });
   };
   return (
      <>
         <div class="text-center p-10">
            <h1 class="font-bold text-4xl mb-4 ">Update Product</h1>
         </div>
         <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div class="relative mb-6">
               <label class="flex  items-center mb-2 text-gray-600 text-sm font-medium">
                  Title
               </label>
               <input
                  type="text"
                  id="default-search"
                  class="block w-full h-11 px-5 py-2.5 leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none "
                  placeholder="name product..."
                  {...register("title", { required: true })}
                  defaultValue={product?.title}
               />
               {errors.title?.message && <p>{errors.title?.message}</p>}
            </div>
            <div class="relative mb-6">
               <label class="flex  items-center mb-2 text-gray-600 text-sm font-medium">
                  Price
               </label>
               <input
                  type="text"
                  id="default-search"
                  class="block w-full h-11 px-5 py-2.5 leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none "
                  placeholder="price..."
                  {...register("price", {
                     required: true,
                     valueAsNumber: true,
                  })}
                  defaultValue={product?.price}
               />
               {errors.price?.message && <p>{errors.price?.message}</p>}
            </div>
            <div class="relative mb-6">
               <label class="flex  items-center mb-2 text-gray-600 text-sm font-medium">
                  Images
               </label>
               <input
                  type="text"
                  id="default-search"
                  class="block w-full h-11 px-5 py-2.5 leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none "
                  placeholder="image.."
                  {...register("image", { required: true })}
                  defaultValue={product?.image}
               />
               {errors.image?.message && <p>{errors.image?.message}</p>}
            </div>
            <div class="relative mb-6">
               <label class="flex  items-center mb-2 text-gray-600 text-sm font-medium">
                  Category
               </label>
               <input
                  type="text"
                  id="default-search"
                  class="block w-full h-11 px-5 py-2.5 leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none "
                  placeholder="Category..."
                  {...register("category", { required: true })}
                  defaultValue={product?.category}
               />
               {errors.category?.message && <p>{errors.category?.message}</p>}
            </div>

            <div class="relative mb-6">
               <label class="flex items-center mb-2 text-gray-600 text-sm font-medium">
                  Description
               </label>
               <div class="flex">
                  <div class="relative w-full">
                     <textarea
                        class="block w-full h-40 px-4 py-2.5 text-base leading-7 font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-2xl placeholder-gray-400 focus:outline-none resize-none"
                        placeholder="Write a Description..."
                        {...register("description")}
                        defaultValue={product?.description}
                     ></textarea>
                     {errors.description?.message && (
                        <p>{errors.description.message}</p>
                     )}
                  </div>
               </div>
            </div>
            <button
               type="submit"
               class="w-52 h-12 bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 rounded-full shadow-xs text-white text-base font-semibold leading-6"
            >
               Send Message
            </button>
         </form>
      </>
   );
}

export default UpdateProduct;
