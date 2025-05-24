import React from "react";
import { useNavigate } from "react-router-dom";
import FloatingInput from "../components/FloatingInput";
import { createCategory } from "../services/api";
import toast from "react-hot-toast";

const CreateCategory = () => {
  const navigate = useNavigate();
  const [category, setCategory] = React.useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createCategory(category);
      if (response.message == "Categoria já existe") {
        toast.error("Categoria já existe.");
        return;
      }
      toast.success("Categoria criada com sucesso!");
      setTimeout(() => navigate("/admin/category"), 100);
    } catch (error) {
      console.error("Erro:", error.message);
      toast.error("Erro ao criar a categoria.");
    }
  };

  return (
    <main>
      <section className="container py-4">
        <p className="h1">Criar Nova Categoria</p>
        <div className="row">
          <div className="col">
            <div className="card bg-body-tertiary">
              <div className="card-header">
                <h5 className="card-title mb-1">Informações Básicas</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col">
                      <FloatingInput
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Nome da Categoria"
                        label="Nome da Categoria"
                        maxLength={60}
                        required={true}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <FloatingInput
                        isTextArea={true}
                        id="description"
                        name="description"
                        placeholder="Descrição da Categoria"
                        label="Descrição da Categoria"
                        maxLength={150}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary ms-auto">
                    Criar Categoria
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default CreateCategory;
