import { registerValidate } from "../validations/auth.js";

const validAuth = (user) => {
   //    const isSchema = "login" ? loginValidate : registerValidate;
   const { error } = registerValidate.validate(user, {
      abortEarly: false,
   });
   if (error) {
      const errors = error.details.map((item) => item.message);
      return { message: errors };
   }
};

export { validAuth };
