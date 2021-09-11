import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import UserModel from "../models/users.model.js";
import { ERROR, SUCCESS } from "../common/constants.js";

export const add = async (body) => {
  const { firstName, lastName, email, role, password, photo } = body;

  const salt = await bcrypt.genSalt(10).catch((error) => {
    throw new Error(error);
  });

  const hash = await bcrypt.hash(password, salt).catch((error) => {
    throw new Error(error);
  });

  const date = new Date();
  const newUser = {
    firstName,
    lastName,
    email,
    password: hash,
    role,
    photo,
    date_created: date,
    date_updated: date,
  };

  const result = await UserModel.create(newUser)
    .then((value) => {
      return { type: SUCCESS, value };
    })
    .catch((err) => {
      const firstErrorKey = Object.keys(err.errors)[0];
      const firstErrorMsg = err.errors[firstErrorKey].properties.message;
      return { type: ERROR, value: firstErrorMsg };
    });

  return result;
};

export const remove = async (userId) => {
  const result = await UserModel.deleteOne({ _id: userId })
    .then((value) => {
      return { type: SUCCESS, value };
    })
    .catch(() => {
      return {
        type: ERROR,
        value: "Error deleting user.",
      };
    });

  return result;
};

export const update = async (userId, body) => {
  const { firstName, lastName, email, role, password, photo, date_created } =
    body;

  const filter = { _id: userId };

  const update = {
    firstName,
    lastName,
    email,
    password,
    role,
    photo,
    date_created,
    date_updated: new Date(),
  };

  const result = await UserModel.findOneAndUpdate(filter, update)
    .then((value) => {
      return { type: SUCCESS, value };
    })
    .catch(() => {
      return {
        type: ERROR,
        value: "Error updating user.",
      };
    });

  return result;
};

export const findOneById = async (userId) => {
  const result = await UserModel.findOne({
    _id: mongoose.Types.ObjectId(userId),
  })
    .then((value) => {
      return { type: SUCCESS, value: value ?? {} };
    })
    .catch((err) => {
      return {
        type: ERROR,
        value: JSON.stringify(err),
      };
    });

  return result;
};

export const findAll = async () => {
  const result = await UserModel.find()
    .then((value) => {
      return { type: SUCCESS, value };
    })
    .catch((err) => {
      return {
        type: ERROR,
        value: JSON.stringify(err),
      };
    });

  return result;
};
