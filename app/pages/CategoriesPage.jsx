import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import FloatingInput from "../components/FloatingInput";
import FloatingSelect from "../components/FloatingSelect";
import { getCategories } from "../services/api";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const CategoriesPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [categories, setCategories] = useState([]);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const sort = searchParams.get("sort") || "mais_recente";

  const handleSortChange = (e) => {
    searchParams.set("sort", e.target.value);
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  };

  const handleLimitChange = (e) => {
    searchParams.set("limit", e.target.value);
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  };

  const handlePageChange = (page) => {
    searchParams.set("page", page);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const page2 = searchParams.get("page") || 1;
        const limit2 = searchParams.get("limit") || 10;
        const sort2 = searchParams.get("sort") || "mais_recente";
        const response = await getCategories({ page2, limit2, sort2 });
        setCategories(response);
      } catch (error) {
        console.error("Erro:", error.message);
        toast.error("Erro ao buscar as categorias.");
      }
    };
    console.log(limit, page, sort);

    fetchCategories();
  }, [searchParams]);
  return (
    <main>
      <section className="container py-4">
        <div className="d-flex align-items-center">
          <p className="h1 mb-2">Categorias</p>
          <a href="/category/create" className="text-decoration-none">
            <button className="btn btn-primary ms-2 my-2 py-0">
              <i className="bi bi-plus fs-4"></i>
            </button>
          </a>
        </div>
        <div className="row">
          <div className="col">
            <div className="card bg-body-tertiary">
              <div className="card-header">
                <form className="d-flex justify-content-between align-items-center">
                  <div>
                    <label
                      className="visually-hidden"
                      htmlFor="autoSizingInputGroup"
                    >
                      Pesquisa
                    </label>
                    <div className="input-group">
                      <div className="input-group-text">
                        <i className="bi bi-search" />
                      </div>
                      <input
                        type="search"
                        className="form-control me-3"
                        aria-label="Search"
                        placeholder="Pesquisar..."
                      />
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="form-floating me-3">
                      <select
                        className="form-select"
                        onChange={handleLimitChange}
                        value={limit}
                      >
                        <option value="" disabled>
                          Selecione uma opção
                        </option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                      </select>
                      <label htmlFor="floatingSelect">Por página</label>
                    </div>
                    <div className="form-floating">
                      <select
                        className="form-select"
                        onChange={handleSortChange}
                        value={sort}
                      >
                        <option value="" disabled>
                          Selecione uma opção
                        </option>
                        <option value="mais_recente">Mais Recente</option>
                        <option value="mais_antigo">Mais Antigo</option>
                        <option value="nome_az">Nome A → Z</option>
                        <option value="nome_za">Nome Z → A</option>
                      </select>
                      <label htmlFor="floatingSelect">Ordenar por</label>
                    </div>
                  </div>
                </form>
              </div>
              <div className="card-body">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Nome</th>
                      <th scope="col">Descrição</th>
                      <th scope="col">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category) => (
                      <tr key={category._id}>
                        <td>{category.name}</td>
                        <td>{category.description}</td>
                        <td>
                          <div className="btn-group" role="group">
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={() =>
                                navigate(`/category/edit/${category._id}`)
                              }
                            >
                              <i className="bi bi-pencil-square" />
                            </button>
                            <button
                              data-bs-toggle="modal"
                              data-bs-target="#deleteModal"
                              type="button"
                              className="btn btn-danger"
                              onClick={() => setCategoryToDelete(category)}
                            >
                              <i className="bi bi-trash" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <nav>
                  <ul className="pagination justify-content-center">
                    <li className="page-item disabled">
                      <a className="page-link" href="#" tabIndex="-1">
                        Anterior
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        Próximo
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="modal fade" id="deleteModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirmar Apagar</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Fechar"
              ></button>
            </div>
            <div className="modal-body">
              Tens a certeza que queres apagar esta categoria?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button type="button" className="btn btn-danger">
                Apagar
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default CategoriesPage;
