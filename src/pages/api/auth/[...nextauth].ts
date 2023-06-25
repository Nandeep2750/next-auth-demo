import NextAuth, { Account, AuthOptions, Profile, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios, { AxiosError } from "axios";
import axiosInstance from "../../../utils/axiosInterceptor";
import { JWT } from "next-auth/jwt";

interface CustomCredentials {
  email: string;
  password: string;
}

interface ErrorResponse {
  error: string;
}

const authOptions: AuthOptions = {
  secret: "next.auth.secret",
  pages: {
    signIn: '/', // Specify the path to your sign-in page
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "email@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: CustomCredentials | undefined): Promise<User | null>  {
        if (!credentials) {
          throw new Error("Missing credentials");
        }
        try {
          const response = await axiosInstance.post("/api/login", credentials);
          console.log("🚀 ~ file: [...nextauth].ts:30 ~ authorize ~ response:", response.data);
          // 🚀 ~ file: [...nextauth].ts:30 ~ authorize ~ response: { token: 'QpwL5tke4Pnpja7X4' }
          const token = response.data.token;
          console.log("🚀 ~ file: [...nextauth].ts:34 ~ authorize ~ token:", token)

          if (!token) {
            return null;
          }

          // Create a user object with the necessary properties
          const user: User = {
            id: token, // or any unique identifier for the user
            email: credentials.email,
            token: token,
          };

          return user;
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<ErrorResponse>;
            throw new Error(String(axiosError.response?.data?.error));
          } else {
            throw new Error(String(error));
          }
        }
      },
    }),
    // ...add more providers here
  ],
  // callbacks: {
  //   async jwt({ token, account, user }: { token: JWT; account?: Account | null; user?: User }) {
  //     token.user = user;
  //     return token;
  //   },
  //   async session({ session, token, user }: { session: Session; token: JWT; user?: { email: string; token: string } }) {
  //     console.log("🚀 ~ file: [...nextauth].ts:67 ~ session ~ user:", user)
  //     console.log("🚀 ~ file: [...nextauth].ts:67 ~ session ~ session:", session)
  //     console.log("🚀 ~ file: [...nextauth].ts:67 ~ session ~ token:", token)
  //     // Set the email and token in the session if user is 
  //     // session.user = user

  //     return session;
  //   },
  // },
};

export default NextAuth(authOptions);
