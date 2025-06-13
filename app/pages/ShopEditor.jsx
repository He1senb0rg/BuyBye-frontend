import React from "react";
import { useState, useEffect } from "react";
import { editShop, getShopByID } from "../services/api";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const ShopEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [shopData, setShopData] = useState({
    name: "",
    ownerName: "",
    userId: "",
    description: "",
    phone: "",
    logo: "",
  });

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const response = await getShopByID(id);

        if (!response || response.error) {
          throw new Error("Loja não encontrada");
        }

        setShopData(response);
      } catch (error) {
        console.log(error);
        toast.error("Erro ao buscar a loja.");
        navigate("/404");
      }
    };

    fetchShop();
  }, []);

  const handleChange = (e) => {
    setShopData({ ...shopData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await editShop(shopData, id);
      toast.success("Loja criada com sucesso!");
      setTimeout(() => navigate("/admin/dashboard"), 100);
    } catch (error) {
      console.error("Erro:", error.message);
      toast.error("Erro ao criar a loja.");
    }
  };

  return (
    <main>
      <div className="container-xl px-4 mt-4">
        <div className="row">
          <div className="col">
            <h1 className="mt-4">Editar Loja</h1>
          </div>
        </div>
        <div className="row">
          <div className="col mb-3">
            <div className="card mb-2 h-100">
              <div className="card-header">Detalhes de Loja</div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-8">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          placeholder="Nome da Loja"
                          onChange={handleChange}
                          value={shopData.name}
                        />
                        <label htmlFor="inputUser">Nome da Loja</label>
                      </div>
                      <div className="row mb-3">
                        <div className="col">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              name="ownerName"
                              placeholder="Nome do Dono"
                              onChange={handleChange}
                              value={shopData.ownerName}
                            />
                            <label htmlFor="inputFirstName">Nome do Dono</label>
                          </div>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col">
                          <div className="form-floating">
                            <input
                              type="tel"
                              className="form-control"
                              name="phone"
                              placeholder="Número de telefone"
                              onChange={handleChange}
                              value={shopData.phone}
                            />
                            <label htmlFor="inputPhone">
                              Número de Telefone
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="form-floating mb-3">
                        <textarea
                          className="form-control"
                          name="description"
                          maxLength={100}
                          placeholder="Descrição da loja"
                          onChange={handleChange}
                          value={shopData.description}
                        ></textarea>
                        <label htmlFor="description">Descrição da Loja</label>
                        <div className="form-text text-end">
                          {shopData.description.length} / 100
                        </div>
                      </div>
                    </div>
                    <div className="col-4 mb-3">
                      <div className="card mb-3 h-100">
                        <div className="card-header">Logo da Loja</div>
                        <div className="card-body text-center d-flex flex-column align-items-center justify-content-center">
                          <img
                            className="img-account-profile mb-3"
                            src={shopData.logo || "/assets/images/BuyByeLogo.png"}
                            alt="logo"
                            width="70%"
                          />
                          <div className="small font-italic text-muted mb-3">
                            JPG ou PNG menor que 5 MB
                          </div>
                          <label
                            htmlFor="fileUpload"
                            className="btn btn-primary"
                          >
                            Upload da imagem
                          </label>
                          <input
                            hidden
                            type="file"
                            id="fileUpload"
                            name="fileUpload"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-primary" type="submit">
                      Editar Loja
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ShopEditor;
