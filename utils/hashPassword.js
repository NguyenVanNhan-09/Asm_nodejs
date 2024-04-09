import bcryptjs from "bcryptjs";
export const hashPassword = async (password) => {
   const salt = await bcryptjs.genSalt(10);
   const hashPassword = await bcryptjs.hash(password, salt);
   return hashPassword;
};
export const comparePassword = async (password, hashPassword) => {
   const checkPassword = await bcryptjs.compare(
      password, // mật khẩu chưa bị mã hóa ở dữ liệu người dùng nhập vào
      hashPassword // mật khẩu đã bị mã hóa rồi ở trong db
   );
   if (checkPassword) {
      return checkPassword;
   }
   return false;
};
