import { Router } from "express";
import ProductControllers from "../controllers/product.js";

const productRouter = Router();
const productController = new ProductControllers();
productRouter.get("/", productController.getProduct);
productRouter.post("/", productController.createProduct);
productRouter.get("/:id", productController.getProductById);
productRouter.put("/update/:id", productController.updateProductById);
productRouter.put("/hide/:id", productController.softRemoveProductbyid);
productRouter.delete("/delete/:id", productController.deleteProductByid);
export default productRouter;
