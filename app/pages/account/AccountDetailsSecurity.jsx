import React from 'react';
import AccountNavigation from '../../components/accountDetailsComponents/AccountNavigation';
import ChangePasswordCard from '../../components/accountDetailsComponents/ChangePasswordCard';
import TwoFactorAuthCard from '../../components/accountDetailsComponents/TwoFactorAuthCard';
import DeleteAccountCard from '../../components/accountDetailsComponents/DeleteAccountCard';

const SecurityPage = () => {
  return (
    <main>
      <div className="container-xl px-4 mt-4">
        <AccountNavigation activePage="security" />
        <hr className="mt-0 mb-3" />
        <div className="row">
          <div className="col-md-8">
            <ChangePasswordCard />
          </div>
          <div className="col-md-4">
            <TwoFactorAuthCard />
            <DeleteAccountCard />
          </div>
        </div>
      </div>
    </main>
  );
};

export default SecurityPage;
