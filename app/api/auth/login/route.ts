import { signIn } from "next-auth/react";
import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({ msg: "Hello" });
};

// export const POST = async (request) => {
//   const { email, password } = await request.json();

//   const response = await signIn("Credentials", { email, password });

//   console.log(response);

//   return NextResponse.json({ msg: hello });
// };
