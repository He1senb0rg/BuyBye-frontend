import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getShops, deleteShop } from "../services/api";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const ShopsPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [shops, setShops] = useState([]);
  const [totalShops, setTotalShops] = useState(0);
  const [shopToDelete, setShopToDelete] = useState(null);

  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 10;
  const sort = searchParams.get("sort") || "mais_recente";
  const search = searchParams.get("search") || "";

  const totalPages = Math.ceil(totalShops / limit);
  
  const [searchValue, setSearchValue] = useState(search);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchParams({
        page: "1",
        limit,
        sort,
        search: searchValue,
      });
    }, 300);
  
    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);

  const handleSortChange = (e) => {
    setSearchParams({
      page: "1",
      limit,
      sort: e.target.value,
    });
  };

  const handleLimitChange = (e) => {
    setSearchParams({
      page: "1",
      limit: e.target.value,
      sort,
    });
  };

  const handlePageChange = (page) => {
    searchParams.set("page", page);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getShops(page, limit, sort, searchValue);
        setShops(response.shops);
        setTotalShops(response.totalShops);
      } catch (error) {
        console.error("Erro:", error.message);
        toast.error("Erro ao buscar os utilizadores.");
      }
    };

    fetchUsers();
  }, [searchParams]);

  const handleDeleteShop = async () => {
    try {
      await deleteShop(shopToDelete._id);
      setShops((prevShops) =>
        prevShops.filter((shop) => shop._id !== shopToDelete._id)
      );
      
      toast.success("Loja apagada com sucesso.");
    } catch (error) {
      console.error("Erro:", error.message);
      toast.error("Erro ao apagar a loja.");
    } finally {
      setShopToDelete(null);
    }
  }

  return (
    <main>
      <section className="container py-4">
        <div className="d-flex align-items-center">
          <p className="h1 mb-2">Lojas</p>
          <a href="/admin/shops/create" className="text-decoration-none">
            <button className="btn btn-primary ms-2 my-2 py-0">
              <i className="bi bi-plus fs-4"></i>
            </button>
          </a>
        </div>
        <div className="row">
          <div className="col">
            <div className="card bg-body-tertiary">
              <div className="card-header">
                <div className="d-flex justify-content-between align-items-center">
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
                        onChange={handleSearchChange}
                        value={searchValue}
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
                </div>
              </div>
              <div className="card-body">
                <table className="table table-striped border">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Logo</th>
                      <th scope="col">Nome</th>
                      <th scope="col">Nome do Dono</th>
                      <th scope="col">Nr Telefone</th>
                      <th scope="col">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shops.map((shop) => (
                      <tr key={shop._id}>
                        <td>{shop._id}</td>
                        <td>
                          <img
                            src={shop.logo || "/assets/images/logo-placeholder.jpg"}
                            alt={shop.name}
                            className="img-fluid rounded"
                            style={{ width: "150px", height: "50px" }}
                          />
                        </td>
                        <td>{shop.name}</td>
                        <td>{shop.ownerName}</td>
                        <td>{shop.phone}</td>
                        <td>
                          <div className="btn-group" role="group">
                            <a
                              type="button"
                              className="btn btn-primary"
                              href={`/admin/shops/edit/${shop._id}`}
                            >
                              <i className="bi bi-pencil-square" />
                            </a>
                            <button
                              data-bs-toggle="modal"
                              data-bs-target="#deleteModal"
                              type="button"
                              className="btn btn-danger"
                              onClick={() => setShopToDelete(shop)}
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
                    <li className={`page-item ${page <= 1 ? "disabled" : ""}`}>
                      <button className="page-link" tabIndex="-1" onClick={() => handlePageChange(Number(page) - 1)}>
                        Anterior
                      </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, index) => (
                      <li
                        key={index}
                        className={`page-item ${Number(page) === index + 1 ? "active" : ""}`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${Number(page) >= totalPages ? "disabled" : ""}`}>
                      <button className="page-link" onClick={() => handlePageChange(Number(page) + 1)}>
                        Próximo
                      </button>
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
              <h5 className="modal-title">Apagar {shopToDelete?.name}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Fechar"
              ></button>
            </div>
            <div className="modal-body">
              Tens a certeza que queres apagar a loja {shopToDelete?.name}? Esta ação não pode ser revertida.
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button type="button" data-bs-dismiss="modal" className="btn btn-danger" onClick={handleDeleteShop}>
                Apagar
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default ShopsPage;
