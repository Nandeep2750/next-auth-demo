import { useSession } from 'next-auth/react';
import * as React from 'react';

export interface IDashboardProps {
}

const Dashboard: React.FC<IDashboardProps> = ({ }) => {

  let {data, status} = useSession()
  console.log("🚀 ~ file: dashboard.tsx:10 ~ status:", status)
  console.log("🚀 ~ file: dashboard.tsx:10 ~ data:", data)
  // Add your component logic and JSX here
  return (
    <div>
      Dashboard
    </div>
  );
};

export default Dashboard;

