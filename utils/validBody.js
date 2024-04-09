// import { registerValidate } from "../validations/auth.js";

const validBody = (data, isSchema) => {
   //    const isSchema = "login" ? loginValidate : registerValidate;
   const { error } = isSchema.validate(data, {
      abortEarly: false,
   });
   if (error) {
      const errors = error.details.map((item) => item.message);
      return { errors };
   }
   return;
};

export { validBody };
