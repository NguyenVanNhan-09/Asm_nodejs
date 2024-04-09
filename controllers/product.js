import { errorMessages, successMessages } from "../constants/messages.js";
import product from "../models/product.js";
import { validBody } from "../utils/validBody.js";
import productValidate from "../validations/product.js";

class ProductControllers {
   // Get all
   async getProduct(req, res, next) {
      try {
         // const { data } = await instance.get("/products");
         const data = await product.find({});
         if (data && data.length > 0) {
            return res.status(200).json({
               message: successMessages.GET_PRODUCT_SUCCESS,
               data,
            });
         }
         return res.status(404).json({ message: errorMessages.GET_ALL_FAIL });
      } catch (error) {
         next(error);
      }
   }
   // Get detail
   async getProductById(req, res, next) {
      try {
         // const { data } = await instance.get(`/products/${req.params.id}`);
         const data = await product.findById(req.params.id);
         if (!data) {
            return res
               .status(404)
               .json({ message: errorMessages.GET_DETAIL_FAIL });
         }
         return res
            .status(200)
            .json({ message: successMessages.GET_PRODUCT_SUCCESS, data });
      } catch (error) {
         next(error);
      }
   }
   // Create
   async createProduct(req, res, next) {
      try {
         const resultValid = validBody(req.body, productValidate);
         if (resultValid) {
            return res.status(400).json({ message: resultValid.errors });
         }
         // const { data } = await instance.post("/products", req.body);
         const data = await product.create(req.body);
         if (!data) {
            return res.status(400).json({ message: errorMessages.CREATE_FAIL });
         }
         return res.status(200).json({
            message: successMessages.CREATE_PRODUCT_SUCCESS,
            data,
         });
      } catch (error) {
         next(error);
      }
   }
   // Update
   async updateProductById(req, res, next) {
      try {
         const resultValid = validBody(req.body, productValidate);
         if (resultValid) {
            return res.status(400).json({ message: resultValid.errors });
         }
         const data = await product.findByIdAndUpdate(
            `${req.params.id}`,
            req.body,
            { new: true }
         );
         if (!data) {
            return res.status(400).json({ message: errorMessages.UPDATE_FAIL });
         }
         return res
            .status(200)
            .json({ message: successMessages.UPDATE_PRODUCT_SUCCESS, data });
      } catch (error) {
         next(error);
      }
   }
   // Delete hard
   async deleteProductByid(req, res, next) {
      try {
         const data = await product.findByIdAndDelete(req.params.id);
         if (data) {
            return res.status(200).json({
               message: successMessages.DELETE_PRODUCT_SUCCESS,
               data,
            });
         }
         return res.status(400).json({
            message: errorMessages.DELETE_FAIL,
         });
      } catch (error) {
         next(error);
      }
   }
   // DeleteSoft
   async softRemoveProductbyid(req, res, next) {
      try {
         const data = await product.findByIdAndUpdate(
            req.params.id,
            { hide: true },
            { new: true }
         );
         if (!data) {
            return res.status(400).json({ message: "xóa thất bại !!!" });
         }
         return res.status(200).json({ message: "xóa thành công !!!", data });
      } catch (error) {
         next(error);
      }
   }
}
export default ProductControllers;
