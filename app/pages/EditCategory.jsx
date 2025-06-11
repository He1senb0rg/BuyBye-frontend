import React from "react";
import { useEffect } from "react";  
import { useNavigate, useParams } from "react-router-dom";
import FloatingInput from "../components/FloatingInput";
import { updateCategory, getCategoryById } from "../services/api";
import toast from "react-hot-toast";

const EditCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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
      const response = await updateCategory(id, category);
      if (response.message == "Categoria já existe") {
        toast.error("Categoria já existe.");
        return;
      }
      toast.success("Categoria editada com sucesso!");
      setTimeout(() => navigate("/admin/categories"), 100);
    } catch (error) {
      console.error("Erro:", error.message);
      toast.error("Erro ao editar a categoria.");
    }
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await getCategoryById(id);

        if (!response || response.error) {
          throw new Error("Categoria não encontrada");
        }

        setCategory(response);
      } catch (error) {
        toast.error("Erro ao buscar a categoria.");
        navigate("/404");
      }
    };

    fetchCategory();
  }, []);
  return (
    <main>
      <section className="container py-4">
        <p className="h1">Editar Categoria - {category.name}</p>
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
                        name="name"
                        placeholder="Nome da Categoria"
                        label="Nome da Categoria"
                        value={category.name}
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
                        name="description"
                        placeholder="Descrição da Categoria"
                        label="Descrição da Categoria"
                        value={category.description}
                        maxLength={150}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-primary" type="submit">
                      Editar Categoria
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default EditCategory;
