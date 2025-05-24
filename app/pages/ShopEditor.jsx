import React from 'react';
import ShopPictureCard from '../components/shopEditorComponents/ShopPictureCard';
import ShopDetailsCard from '../components/shopEditorComponents/ShopDetailsCard';

const ShopEditor = () => {
  return (
    <main>
      <div className="container-xl px-4 mt-4">
        <div className="row">
          <div className="col">
            <h1 className="mt-4">Editar Loja</h1>
          </div>
        </div>
        <hr className="mt-0 mb-3" />
        <div className="row">
          <div className="col-md-6 mb-3">
            <ShopPictureCard />
          </div>
          <div className="col-md-6 mb-3">
            <ShopDetailsCard />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ShopEditor;
