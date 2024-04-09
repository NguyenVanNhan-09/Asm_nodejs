import Jwt from "jsonwebtoken";
import { errorMessages, successMessages } from "../constants/messages.js";
import Auth from "../models/user.js";
import { comparePassword, hashPassword } from "../utils/hashPassword.js";
import { validBody } from "../utils/validBody.js";
import { loginValidate, registerValidate } from "../validations/auth.js";
import dotenv from "dotenv";
dotenv.config({ path: "./.env.local" });
const IWT_SECRET = process.env;
class AuthController {
   async register(req, res) {
      try {
         const { email, password } = req.body;
         // 1: kiểm tra dữ liệu dầu vào
         const resultValid = validBody(req.body, registerValidate);
         if (resultValid) {
            return res.status(400).json({ message: resultValid.errors });
         }

         // 2: kiểm tra email đã tồn tại hay chưa
         const checkEmail = await Auth.findOne({ email });
         if (checkEmail) {
            return res
               .status(400)
               .json({ message: errorMessages.EMAIL_EXISTED });
         }

         // 3: mã hóa password
         const hashedPassword = await hashPassword(password);
         // 4: tạo user mới

         const user = await Auth.create({
            ...req.body,
            password: hashedPassword,
         });
         return res.status(201).json({
            message: successMessages.REGISTER_SUCCESS,
            user,
         });
         // 5: thông báo thành công
      } catch (error) {
         return res.status(500).json({ message: error.message });
      }
   }
   async login(req, res) {
      try {
         // Bước 1 : Kiểm tra email và password
         const { email, password } = req.body;

         const resultValid = validBody(req.body, loginValidate);
         if (resultValid) {
            return res.status(400).json({ message: resultValid.errors });
         }
         // Bước 2 : Kiểm tra eamil có tồn tại không
         const userExist = await Auth.findOne({ email });
         if (!userExist) {
            return res.status(400).json({
               message: errorMessages.EMAIL_NOT_FOUND,
            });
         }
         // Bước 3: Kiểm tra password có khớp không
         if (!(await comparePassword(password, userExist.password))) {
            return res
               .status(400)
               .json({ message: errorMessages.INVALID_PASSWORD });
         }
         // Bước 4: Tạo token -> JWT
         const token = Jwt.sign({ id: userExist._id }, IWT_SECRET, {
            expiresIn: "1h", // hạn sử dụng token này
         });
         // Bước 5: trả về token cho client
         userExist.password = undefined;
         return res.status(201).json({
            message: successMessages.LOGIN_SUCCESS,
            token,
            userExist,
         });
      } catch (error) {
         return res.status(500).json({ message: error.message });
      }
   }
}
export default AuthController;
