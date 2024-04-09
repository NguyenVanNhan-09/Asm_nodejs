import { errorMessages } from "../constants/messages.js";

class ErrorHand {
   errorHandler = (err, req, res) => {
      return res.status(err.status || 500).json({
         error: {
            message: err.message || errorMessages.ERROR_SERVER,
         },
      });
   };
   errorHandlerNotFound = (req, res, next) => {
      // res.status(404).json({ message: "NOT Found" });
      const error = new Error("not found!!!");
      error.status = 404;
      next(error);
   };
}
export default ErrorHand;
