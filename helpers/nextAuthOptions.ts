import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "./mongoClient.ts";
import Github from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import User from "@/models/UserModel.ts";
import bcrypt from "bcryptjs";

export const nextAuthOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Type Your Password",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const { email, password } = credentials;

        // find user
        const userEmail = await User.findOne({ email });

        //  check email
        if (!userEmail) {
          throw new Error("Email Not Found");
        }

        // check password
        if (!bcrypt.compareSync(password, userEmail.password)) {
          throw new Error("Password Does Not Match");
        }

        return userEmail;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    // jwt: {
    //   encryption: true,
    //   secret: process.env.JWT_SECRET,
    // },
  },
  secret: "LKGNEZCzrghjLpKnKrB9WLI96sm2rj/z84N5GnMmv1I=",
  pages: {
    signIn: "/login",
  },
};

// import { NextAuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
// import clientPromise from "./mongoClient";
// import GithubProvider from "next-auth/providers/github";
// import CredentialsProvider from "next-auth/providers/credentials";

// // Define the NextAuth options with proper types
// export const nextAuthOptions: NextAuthOptions = {
//   adapter: MongoDBAdapter(clientPromise),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     GithubProvider({
//       clientId: process.env.GITHUB_CLIENT_ID!,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET!,
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: {
//           label: "Email",
//           type: "email",
//           placeholder: "Enter your email",
//         },
//         password: {
//           label: "Password",
//           type: "password",
//         },
//       },
//       async authorize(credentials: Record<string, string> | undefined) {
//         if (!credentials?.email || !credentials?.password) {
//           return null;
//         }

//         // Example: Replace with actual logic to authenticate user (e.g., checking credentials in a DB)
//         const user = { id: "1", name: "J Smith", email: credentials.email };

//         if (user) {
//           return user; // Any object returned will be saved in `user` property of the JWT
//         } else {
//           return null; // If no user found, return null (display error on UI)
//         }
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   secret:
//     process.env.JWT_SECRET || "LKGNEZCzrghjLpKnKrB9WLI96sm2rj/z84N5GnMmv1I=", // Ensure this is set in your .env file
//   pages: {
//     signIn: "/login",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       // Add user data to JWT token after successful login
//       if (user) {
//         token.id = user.id;
//         token.email = user.email;
//         token.name = user.name;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       // Add JWT token data to session object
//       if (token) {
//         session.user.id = token.id as string;
//         session.user.email = token.email as string;
//         session.user.name = token.name as string;
//       }
//       return session;
//     },
//   },
// };

// export default nextAuthOptions;
