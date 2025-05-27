import React from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';

const WishlistRow = ({ item, onRemoved }) => {
  const { user } = useAuth();

  const handleRemove = () => {
    if (!user) {
      alert('You must be logged in to remove items from your wishlist.');
      return;
    }

    fetch('/api/wishlist/remove', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        userId: user._id,
        productId: item.product._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Removed from wishlist:', data);
        alert('Produto removido da lista de desejos.');
        if (onRemoved) onRemoved(item.product._id); // trigger a reload or update
      })
      .catch((err) => {
        console.error('Error removing from wishlist:', err);
        alert('Erro ao remover o item.');
      });
  };

  return (
    <tr>
      <td>{item.product.name}</td>
      <td>€{item.product.price}</td>
      <td>{item.product.stock > 0 ? 'Em stock' : 'Esgotado'}</td>
      <td>
        <Button variant="danger" onClick={handleRemove}>
          Remover
        </Button>
      </td>
    </tr>
  );
};

export default WishlistRow;