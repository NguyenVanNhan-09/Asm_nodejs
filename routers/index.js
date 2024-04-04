import authRouter from "./auth.js";
import productRouter from "./product.js";

export default function routers(app) {
   app.get("/", (req, res) => {
      res.send("home");
   });
   app.use("/products", productRouter);
   app.use("auth", authRouter);
}
