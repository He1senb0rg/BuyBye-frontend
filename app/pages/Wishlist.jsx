import React from 'react';
import WishlistTable from '../components/wishlist/WishlistTable'

const Wishlist = () => {
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-12">
          <h2 className="mb-4">My Wishlist</h2>
          <WishlistTable />
        </div>
      </div>
    </div>
  );
};

export default Wishlist;