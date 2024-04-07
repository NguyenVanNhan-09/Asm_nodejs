import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
   {
      username: {
         type: String,
         unique: true,
      },
      email: {
         type: String,
         unique: true,
      },
      password: {
         type: String,
         required: true,
      },
      role: {
         type: String,
         default: "member",
      },
      avatar: {
         type: String,
      },
      address: {
         type: String,
      },
      phoneNumber: {
         type: String,
         unique: true,
      },
   },
   {
      timestamps: true,
      versionKey: false,
   }
);

export default mongoose.model("Auth", authSchema);
