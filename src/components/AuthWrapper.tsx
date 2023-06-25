import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import Header from './Header';

interface AuthWrapperProps {
  children: ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const { data: session, status,  } = useSession()

  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  // If user is not authenticated, redirect to the sign-in page
  if (!session) {
    // router.push('/')
    signIn(); // Optional: You can provide a custom `redirect` parameter to specify the sign-in page URL
    return null; // Or you can render a loading state or a sign-in message
  }

  // If user is authenticated, render the protected route
  return <>
  <Header/>
  {children}
  </>;
};

export default AuthWrapper;