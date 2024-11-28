"use server";

import mongoDBConnection from "@/config/mongoDBConnect.ts";

import User from "@/models/UserModel.ts";
import bcrypt from "bcryptjs";
import { signIn } from "next-auth/react";

// create a new user

export const createAUser = async (FormData) => {
  await mongoDBConnection();

  const name = FormData.get("name");
  const email = FormData.get("email");
  const password = FormData.get("password");

  await User.create({ name, email, password: bcrypt.hashSync(password, 12) });
};

// create a new user

// export const userLogin = async (FormData) => {
//   const email = FormData.get("email");
//   const password = FormData.get("password");

//   // await signIn("credentials", {
//   //   redirect: false,
//   //   email,
//   //   password,
//   // });

//   // const response = await axios.post(`http://localhost:3000/api/auth/login`);

//   const response = await axi;

//   console.log(response);
// };
