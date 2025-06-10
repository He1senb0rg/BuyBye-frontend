import React from "react";
import { useAuth } from "../contexts/AuthContext";
import FloatingInput from "./FloatingInput";
import { useEffect, useState } from "react";
import { getShopByID, editShopBanner } from "../services/api";
import toast from "react-hot-toast";

//684743fde07423dcb81fc329
const ShopBanner = () => {
  const { user } = useAuth();
  const isAdmin = user && user.role === "admin";

  const [shopBanner, setShopBanner] = useState([]);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const response = await getShopByID("684743fde07423dcb81fc329");
        setShopBanner(response.banner);
      } catch (error) {
        console.error("Erro:", error.message);
        toast.error("Erro ao buscar o banner da loja");
      }
    };

    fetchShop();
  }, []);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const updatedBanner = {
        title: shopBanner.title,
        description: shopBanner.description,
        link: shopBanner.link,
        buttonText: shopBanner.buttonText,
        image: shopBanner.image,
      };
      await editShopBanner("684743fde07423dcb81fc329", updatedBanner);
      toast.success("Banner atualizado com sucesso!");
    } catch (error) {
      console.error("Erro:", error.message);
      toast.error("Erro ao atualizar o banner da loja");
    }
  }
  
  const handleChange = (e) => {
    setShopBanner({ ...shopBanner, [e.target.name]: e.target.value });
  };

  return (
    <>
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">{shopBanner?.title}</h1>
            <p className="lead text-body-secondary">{shopBanner?.description}</p>
            <p>
              {(shopBanner?.buttonText && shopBanner?.link) && (
                 <a href={shopBanner?.link} className="btn btn-primary my-2">
                {shopBanner?.buttonText}
              </a>
              )}
             
              {isAdmin && (
                <button
                  className="btn btn-primary ms-2 my-2"
                  data-bs-toggle="modal"
                  data-bs-target="#editModal"
                >
                  <i className="bi bi-pencil-square"></i>
                </button>
              )}
            </p>
          </div>
        </div>
      </section>
      {isAdmin && (
        <div className="modal fade" id="editModal" tabIndex="-1">
          <div className="modal-dialog">
            <form className="modal-content" onSubmit={handleEdit}>
              <div className="modal-header">
                <h5 className="modal-title">Editar Banner da Loja</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Fechar"
                ></button>
              </div>
              <div className="modal-body">
                <FloatingInput
                  label="Título"
                  name="title"
                  type="text"
                  placeholder="Título do Banner"
                  value={shopBanner?.title}
                  onChange={handleChange}
                />
                <FloatingInput
                  label="Descrição"
                  type="text"
                  name="description"
                  placeholder="Descrição do Banner"
                  value={shopBanner?.description}
                  onChange={handleChange}
                />
                <FloatingInput
                  label="Link"
                  type="text"
                  name="link"
                  placeholder="Link do Banner"
                  value={shopBanner?.link}
                  onChange={handleChange}
                />
                <FloatingInput
                  label="Texto do Botão"
                  type="text"
                  name="buttonText"
                  placeholder="Texto do Botão"
                  value={shopBanner?.buttonText}
                  onChange={handleChange}
                />
                <FloatingInput
                  label="Imagem do Banner"
                  type="text"
                  name="image"
                  placeholder="URL da Imagem"
                  value={shopBanner?.image}
                  onChange={handleChange}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn btn-primary"
                >
                  Editar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default ShopBanner;
