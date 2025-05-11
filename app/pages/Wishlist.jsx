import React, { useEffect, useState } from 'react';
import WishlistTable from '../components/wishlist/WishlistTable';
import { useAuth } from '../contexts/AuthContext';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useAuth(); // Get user from AuthContext

  useEffect(() => {
    // Check if user is authenticated
    if (!user) {
      alert('Please log in to view your wishlist.');
      return;
    }

    // Fetch wishlist data from backend
    fetch(`/api/wishlist/${user._id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setWishlist(data))
      .catch((error) => console.error('Error fetching wishlist:', error));
  }, [user]);

  return (
    <div className="container my-5">
      <h2>My Wishlist</h2>
      <WishlistTable wishlistItems={wishlist.items || []} />
    </div>
  );
};

export default Wishlist;