import Auth from "../models/user.js";
import { registerValidate } from "../validations/auth.js";
import bcryptjs from "bcryptjs";
class AuthController {
   async register(req, res) {
      try {
         const { email, password } = req.body;
         // 1: kiểm tra dữ liệu dầu vào
         const { error } = registerValidate.validate(req.body, {
            abortEarly: false,
         });
         if (error) {
            const errors = error.details.map((item) => item.message);
            return res.status(400).json({ message: errors });
         }
         // 2: kiểm tra email đã tồn tại hay chưa
         const checkEmail = await Auth.findOne({ email });
         if (checkEmail) {
            return res.status(400).json({ message: "Email đã tồn tại" });
         }
         // 3: mã hóa password
         const salt = await bcryptjs.genSalt(10);
         const hasPassword = await bcryptjs.hash(password, salt);

         // 4: tạo user mới
         const user = await Auth.create({ ...req.body, password: hasPassword });
         return res.status(201).json({
            message: "đăng ký thành công",
            user,
         });
         // 5: thông báo thành công
      } catch (error) {
         return res.status(500).json({ message: error.message });
      }
   }
}
export default AuthController;
