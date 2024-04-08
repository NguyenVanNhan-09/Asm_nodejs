import errorMessage from "../constants/messages.js";

class ErrorHand {
   errorHandler = (err, req, res) => {
      return res.status(err.status || 500).json({
         error: {
            message: err.message || errorMessage.ERROR_SERVER,
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
