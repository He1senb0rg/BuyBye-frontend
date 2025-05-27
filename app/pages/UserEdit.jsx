import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getUser, updateUser, removeImage } from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import FloatingInput from "../components/FloatingInput";
import FloatingSelect from "../components/FloatingSelect";

const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    image: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser(id);
        setUser(response);
      } catch (error) {
        toast.error("Erro ao carregar utilizador");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    console.log("Atualizando utilizador:", user);
    try {
      await updateUser(user);
      toast.success("Utilizador atualizado com sucesso.");
      setTimeout(() => {
        navigate("/admin/users");
      }, 100);
    } catch (error) {
      console.error("Erro:", error.message);
      toast.error("Erro ao atualizar o utilizador.");
    }
  }

  const handleRemoveImage = async () => {
    try {
      await removeImage(user._id);
      setUser({ ...user, image: "/assets/images/account-profile.png" });
      toast.success("Imagem removida com sucesso.");
    } catch (error) {
      console.error("Erro:", error.message);
      toast.error("Erro ao remover a imagem.");
    }
  }

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <main>
      <section className="container py-4">
        <p className="h1">Editar utilizador - {user?.name}</p>
        <div className="row">
          <div className="col">
            <div className="card bg-body-tertiary">
              <div className="card-header">
                <h5 className="card-title mb-1">Informações Básicas</h5>
              </div>
              <form onSubmit={handleUpdateUser}>
                <div className="card-body">
                <div className="row">
                  <div className="col">
                    <div className="row">
                      <div className="col">
                        <FloatingInput
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Nome do Utilizador"
                          label="Nome do Utilizador"
                          value={user?.name || ""}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <FloatingInput
                          type="text"
                          id="email"
                          name="email"
                          placeholder="Email do Utilizador"
                          label="Email do Utilizador"
                          value={user?.email || ""}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <FloatingSelect
                          type="text"
                          id="role"
                          name="role"
                          placeholder="Role do Utilizador"
                          label="Role do Utilizador"
                          value={user?.role || ""}
                          options={[
                            { value: "admin", label: "Administrador" },
                            { value: "user", label: "Utilizador" },
                          ]}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="row">
                      <div className="col">
                        <div className="d-flex justify-content-center">
                          <div className="d-flex flex-column align-items-center">
                            <img
                              src={user?.image || "/images/default-user.png"}
                              alt="Imagem do Utilizador"
                              className="img-fluid rounded-circle"
                              style={{ width: "150px", height: "150px" }}
                            />
                            <p className="text-center mt-2">
                              Imagem do Utilizador
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Guardar
                </button>
                <button
                  onClick={handleRemoveImage}
                  type="button"
                  className="btn btn-danger ms-2"
                >
                  Remover Imagem
                </button>
              </div>
              </form>  
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default UserEdit;
