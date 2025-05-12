import React from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext'

const WishlistRow = ({ item }) => {
  const { user } = useAuth();

  const handleRemove = () => {
    // Check if the user is authenticated
    if (!user) {
      alert('You must be logged in to remove items from your wishlist.');
      return;
    }

    // Call the remove from wishlist API
    fetch('/api/wishlist/remove', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify({ userId: user._id, productId: item.product._id }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error('Error removing from wishlist:', error));
  };

  return (
    <tr>
      <td>{item.product.name}</td>
      <td>${item.product.price}</td>
      <td>{item.product.stock > 0 ? 'In Stock' : 'Out of Stock'}</td>
      <td>
        <Button variant="danger" onClick={handleRemove}>
          Remover
        </Button>
      </td>
    </tr>
  );
};

export default WishlistRow;