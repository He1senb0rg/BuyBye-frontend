import React from 'react';

const ShopPictureCard = () => {
  return (
    <div className="card mb-3">
      <div className="card-header">Foto da Loja</div>
      <div className="card-body text-center">
        <img
          className="img-account-profile rounded-circle mb-3"
          src="/assets/images/account-profile.png"
          alt="profile"
          width="40%"
        />
        <div className="small font-italic text-muted mb-3">
          JPG ou PNG menor que 5 MB
        </div>
        <label htmlFor="fileUpload" className="btn btn-primary">
          Upload da imagem
        </label>
        <input hidden type="file" id="fileUpload" name="fileUpload" />
      </div>
    </div>
  );
};

export default ShopPictureCard;
