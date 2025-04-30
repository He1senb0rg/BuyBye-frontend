import React from 'react';
import AccountNavigation from '../../components/accountDetailsComponents/AccountNavigation';
import ProfilePictureCard from '../../components/accountDetailsComponents/ProfilePictureCard';
import AccountDetailsCard from '../../components/accountDetailsComponents/AccountDetailsCard';

const ProfilePage = () => {
  return (
    <main>
      <div className="container-xl px-4 mt-4">
        <AccountNavigation activePage="profile" />
        <hr className="mt-0 mb-3" />
        <div className="row">
          <div className="col-md-6 mb-3">
            <ProfilePictureCard />
          </div>
          <div className="col-md-6 mb-3">
            <AccountDetailsCard />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
