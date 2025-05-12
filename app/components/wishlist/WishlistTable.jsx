import React from 'react';
import WishlistRow from './WishlistRow';

const WishlistTable = ({ wishlistItems }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nome do Produto</th>
            <th>Preço por Unidade</th>
            <th>Estado do Stock</th>
            <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {wishlistItems.map((item) => (
            <WishlistRow key={item.product._id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WishlistTable;