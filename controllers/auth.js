import Auth from "../models/user.js";
import { hashPassword } from "../utils/hashPassword.js";
import { registerValidate, loginValidate } from "../validations/auth.js";
import bcryptjs from "bcryptjs";
import Jwt from "jsonwebtoken";
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
         // const salt = await bcryptjs.genSalt(10);
         // const hashedPassword = await bcryptjs.hash(password, salt);

         const hashedPassword = await hashPassword(password);

         // 4: tạo user mới
         const user = await Auth.create({
            ...req.body,
            password: hashedPassword,
         });
         return res.status(201).json({
            message: "đăng ký thành công",
            user,
         });
         // 5: thông báo thành công
      } catch (error) {
         return res.status(500).json({ message: error.message });
      }
   }
   async login(req, res) {
      try {
         /**
          * 1: kiểm tra email và password
          * 2: kiểm tra email có tồn tại không
          * 3: kiểm tra password có khớp không
          * 4: tạo token -> JWT
          * 5: trả về token cho client
          */

         // Bước 1 : Kiểm tra email và password
         const { email, password } = req.body;
         const { error } = loginValidate.validate(req.body, {
            abortEarly: false,
         });
         if (error) {
            const errors = error.details.map((item) => item.message);
            return res.status(400).json({ message: errors });
         }
         // Bước 2 : Kiểm tra eamil có tồn tại không
         const userExist = await Auth.findOne({ email });
         if (!userExist) {
            return res.status(400).json({
               message: "email không tồn tại bank có muốn đăng ký không ???",
            });
         }
         // Bước 3: Kiểm tra password có khớp không
         const checkPassword = await bcryptjs.compare(
            password, // mật khẩu chưa bị mã hóa ở dữ liệu người dùng nhập vào
            userExist.password // mật khẩu đã bị mã hóa rồi ở trong db
         );
         if (!checkPassword) {
            return res.status(400).json({ message: "mật khẩu không đúng" });
         }
         // Bước 4: Tạo token -> JWT
         const token = Jwt.sign({ id: userExist._id }, "codeofx", {
            expiresIn: "1h", // hạn sử dụng token này
         });
         // Bước 5: trả về token cho client
         userExist.password = undefined;
         return res.status(200).json({
            message: "đăng nhập thành công !!!",
            token,
            userExist,
         });
      } catch (error) {
         return res.status(500).json({ message: error.message });
      }
   }
}
export default AuthController;
