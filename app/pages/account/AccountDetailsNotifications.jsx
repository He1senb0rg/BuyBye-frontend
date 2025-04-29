import React from 'react';
import AccountNavigation from '../../components/accountDetailsComponents/AccountNavigation';
import EmailNotificationsCard from '../../components/accountDetailsComponents/EmailNotificationCard';
//import GeneralNotificationsCard from '../../components/accountDetailsComponents/GeneralNotificationsCard';

const NotificationsPage = () => {
  return (
    <main>
      <div className="container-xl-6 px-4 mt-4">
        <AccountNavigation activePage="notifications" />
        <hr className="mt-0 mb-3" />
        <div className="row d-flex">
          <div className="col-md-6 mb-3">
            <EmailNotificationsCard />
          </div>
          <div className="col-md-6 mb-3">
            
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotificationsPage;
