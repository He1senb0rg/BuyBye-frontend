import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getUser, deleteUser } from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import FloatingInput from "../components/FloatingInput";
import FloatingSelect from "../components/FloatingSelect";

const UserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
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

  const handleDeleteUser = async () => {
    try {
      await deleteUser(user._id);
      toast.success("Utilizador apagado com sucesso.");
      setTimeout(() => {navigate("/admin/users");}, 100);   
    } catch (error) {
      console.error("Erro:", error.message);
      toast.error("Erro ao apagar o utilizador.");
    }
  }

  return (
    <main>
      <section className="container py-4">
        <p className="h1">Utilizador - {user?.name}</p>
        <div className="row">
          <div className="col">
            <div className="card bg-body-tertiary">
              <div className="card-header">
                <h5 className="card-title mb-1">Informações Básicas</h5>
              </div>
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
                          disabled={true}
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
                          disabled={true}
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
                          disabled={true}
                          options={[
                            { value: "admin", label: "Administrador" },
                            { value: "user", label: "Utilizador" },
                          ]}
                        />
                      </div>
                      <div className="col">
                        <FloatingInput
                          type="tel"
                          id="phone"
                          name="phone"
                          disabled={true}
                          placeholder="Telefone do Utilizador"
                          label="Telefone do Utilizador"
                          value={user?.phone || ""}
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

                <a
                  type="button"
                  className="btn btn-primary"
                  href={`/admin/users/edit/${user?._id}`}
                >
                  Editar Utilizador
                </a>
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#deleteModal"
                  type="button"
                  className="btn btn-danger ms-2"
                >
                  Apagar Utilizador
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="modal fade" id="deleteModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Apagar {user?.name}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Fechar"
              ></button>
            </div>
            <div className="modal-body">
              Tens a certeza que queres apagar o utilizador {user?.name}? Esta ação não pode ser revertida.
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button type="button" data-bs-dismiss="modal" className="btn btn-danger" onClick={handleDeleteUser}>
                Apagar
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default UserPage;
