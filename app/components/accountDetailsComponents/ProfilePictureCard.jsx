import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { removeImage } from '../../services/api';
import toast from 'react-hot-toast';

const ProfilePictureCard = () => {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleRemoveImage = async () => {
    if (!user?.id) return toast.error("ID do utilizador não encontrado.");

    try {
      setLoading(true);
      const res = await removeImage(user.id);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success("Imagem de perfil removida.");
        setUser(res); // Update user context with the new image-less user
      }
    } catch (err) {
      toast.error("Erro ao remover imagem de perfil.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-header">Foto de Perfil</div>
      <div className="card-body text-center">
        <img
          className="img-account-profile rounded-circle mb-3"
          src={user?.imageUrl || "/assets/images/account-profile.png"}
          alt="profile"
          width="29%"
        />
        <div className="small font-italic text-muted mb-3">
          JPG ou PNG menor que 5 MB
        </div>

        <div className="d-flex justify-content-center gap-2">
          <label htmlFor="fileUpload" className="btn btn-primary">
            Upload da imagem
          </label>
          <input hidden type="file" id="fileUpload" name="fileUpload" />
          <button
            className="btn btn-outline-danger"
            onClick={handleRemoveImage}
            disabled={loading}
          >
            {loading ? "A remover..." : "Remover Imagem"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePictureCard;