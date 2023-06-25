import "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    token: string,
  }

  // interface Session extends DefaultSession {
  //   token: string,
  // }
}
