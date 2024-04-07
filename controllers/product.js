import product from "../models/product.js";

class ProductControllers {
   // Get all
   async getProduct(req, res, next) {
      try {
         // const { data } = await instance.get("/products");
         const data = await product.find({});
         if (data && data.length > 0) {
            return res.status(200).json({
               message: "lay danh sach san pham thanh cong",
               data,
            });
         }
         return res.status(404).json({ message: "khong co san pham nao" });
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
            return res.status(404).json({ message: "Lấy sản phẩm thất bại" });
         }
         return res
            .status(200)
            .json({ message: "Lấy sản phẩm thành công", data });
      } catch (error) {
         next(error);
      }
   }
   // Create
   async createProduct(req, res, next) {
      try {
         // const { data } = await instance.post("/products", req.body);
         const data = await product.create(req.body);
         if (!data) {
            return res.status(400).json({ message: "them san pham that bai" });
         }
         return res.status(200).json({
            message: "Them san pham thanh con",
            data,
         });
      } catch (error) {
         next(error);
      }
   }
   // Update
   async updateProductById(req, res, next) {
      try {
         const data = await product.findByIdAndUpdate(
            `${req.params.id}`,
            req.body,
            { new: true }
         );
         if (!data) {
            return res.status(400).json({ message: "Cap nhat that bai" });
         }
         return res
            .status(200)
            .json({ message: "Cap nhat san pham thanh cong", data });
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
               message: "Xóa sản phẩm thành công",
               data,
            });
         }
         return res.status(400).json({
            message: "Xóa sản phẩm thất bại",
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
