import React from 'react';
import WishlistRow from './WishlistRow';

const WishlistTable = () => {
  // Sample data for the wishlist items
  const wishlistItems = [
    {
      id: 1,
      name: "Apple iPad Mini",
      price: 110.00,
      inStock: true,
      imageUrl: "https://www.91-img.com/pictures/laptops/asus/asus-x552cl-sx019d-core-i3-3rd-gen-4-gb-500-gb-dos-1-gb-61721-large-1.jpg"
    },
    {
      id: 2,
      name: "Apple iPad Mini",
      price: 110.00,
      inStock: false,
      imageUrl: "https://www.91-img.com/pictures/laptops/asus/asus-x552cl-sx019d-core-i3-3rd-gen-4-gb-500-gb-dos-1-gb-61721-large-1.jpg"
    },
    // Add more items here
  ];

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th width="45%">Product Name</th>
            <th width="15%">Unit Price</th>
            <th width="15%">Stock Status</th>
            <th width="15%">Action</th>
            <th width="10%"></th>
          </tr>
        </thead>
        <tbody>
          {wishlistItems.map((item) => (
            <WishlistRow key={item.id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WishlistTable;