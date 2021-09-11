import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    match: /.+\@.+\..+/,
    unique: true,
    required: true,
    trim: true,
    validate: {
      validator: async function (value) {
        const count = await this.model("UserModel").count({ email: value });
        
        if (count > 0) {
          return false;
        }
        return true;
      },
      message: "Email already exists",
    },
  },
  password: { type: String, required: true },
  role: String,
  photo: String,
  date_created: Date,
  date_updated: Date,
});

export default mongoose.model("UserModel", UserSchema, "admins");
