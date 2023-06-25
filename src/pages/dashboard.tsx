import AuthWrapper from '@/components/AuthWrapper';
import { useSession } from 'next-auth/react';
import * as React from 'react';

export interface IDashboardProps {
}

const Dashboard: React.FC<IDashboardProps> = ({ }) => {

  return (
    <AuthWrapper>
    <div>
      <div className="container">
        <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
          <h1 className="display-4">Pricing</h1>
          <p className="lead">We are providing different types of IT-related solutions. Here is the pricing for different types of services. Find the best one for you and contact us for any queries.</p>
        </div>
        <div className="row row-cols-1 row-cols-md-1 row-cols-lg-3 text-center">
          <div className="col mb-4">
          <div className="card mb-4 box-shadow">
            <div className="card-header">
              <h4 className="my-0 font-weight-normal">Free</h4>
            </div>
            <div className="card-body">
              <h1 className="card-title pricing-card-title">$0 <small className="text-muted">/ mo</small></h1>
              <ul className="list-unstyled mt-3 mb-4">
                <li>1 user included</li>
                <li>Email support</li>
                <li>Help center access</li>
              </ul>
              <a href="https://nandeepbarochiya.com" target="_blank" rel="noreferrer" className="btn btn-lg btn-block btn-outline-primary">Get started</a>
            </div>
          </div>
          </div>
          <div className="col mb-4">
          <div className="card mb-4 box-shadow">
            <div className="card-header">
              <h4 className="my-0 font-weight-normal">Pro</h4>
            </div>
            <div className="card-body">
              <h1 className="card-title pricing-card-title">$15 <small className="text-muted">/ mo</small></h1>
              <ul className="list-unstyled mt-3 mb-4">
                <li>5 users included</li>
                <li>Priority email support</li>
                <li>Help center access</li>
              </ul>
              <a href="https://nandeepbarochiya.com" target="_blank" rel="noreferrer" className="btn btn-lg btn-block btn-primary">Get started</a>
            </div>
          </div>
          </div>
          <div className="col mb-4">
          <div className="card mb-4 box-shadow">
            <div className="card-header">
              <h4 className="my-0 font-weight-normal">Enterprise</h4>
            </div>
            <div className="card-body">
              <h1 className="card-title pricing-card-title">$29 <small className="text-muted">/ mo</small></h1>
              <ul className="list-unstyled mt-3 mb-4">
                <li>10 users included</li>
                <li>Phone and email support</li>
                <li>Help center access</li>
              </ul>
              <a href="https://nandeepbarochiya.com" target="_blank" rel="noreferrer" className="btn btn-lg btn-block btn-outline-primary">Contact us</a>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
    </AuthWrapper>
  );
};

export default Dashboard;