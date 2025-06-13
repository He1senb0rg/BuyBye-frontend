import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchOrders } from "../services/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const OrdersPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);

  const traduzirStatus = (status) => {
    if (status === "pending") return "Pendente";
    if (status === "paid") return "Pago";
    if (status === "shipped") return "Enviado";
    if (status === "delivered") return "Entregue";
    return "Desconhecido";
  };

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const sort = searchParams.get("sort") || "mais_recente";
  const search = searchParams.get("search") || "";
  
  const totalPages = Math.ceil(totalOrders / limit);

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
    
    const fetchOrder = async () => {
      try {
        const response = await fetchOrders();
        let filteredOrders = response;
  
        if (search) {
          const lowerSearch = search.toLowerCase();
          filteredOrders = response.filter(order =>
            order.user?.name?.toLowerCase().includes(lowerSearch)
          );
        }
  
        if (sort === "nome_az") {
          filteredOrders.sort((a, b) => a.user.name.localeCompare(b.user.name));
        } else if (sort === "nome_za") {
          filteredOrders.sort((a, b) => b.user.name.localeCompare(a.user.name));
        } else if (sort === "mais_antigo") {
          filteredOrders.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        } else {
          filteredOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
  
        const startIndex = (page - 1) * limit;
        const paginatedOrders = filteredOrders.slice(startIndex, startIndex + limit);
  
        setOrders(paginatedOrders);
        setTotalOrders(filteredOrders.length);
      } catch (error) {
        console.error("Erro:", error.message);
        toast.error("Erro ao buscar os pedidos.");
      }
    };
    fetchOrder();
  }, [searchParams]);
  


  return (
    <main>
      <section className="container py-4">
        <div className="d-flex align-items-center">
          <p className="h1 mb-2">Histórico de Compras</p>
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
                      <th scope="col">Utilizador</th>
                      <th scope="col">Total</th>
                      <th scope="col">Estado</th>
                      <th scope="col">Data</th>
                      <th scope="col">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.user.name}</td>
                        <td>{Number(order.totalAmount).toFixed(2)}   €</td>
                        <td>{traduzirStatus(order.orderStatus)}</td>
                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td>
                          <div className="btn-group" role="group">
                            <a
                              href={`/admin/orders/${order._id}`}
                              className="btn btn-success"
                                type="button"
                            >
                              <i className="bi bi-file-earmark-text" />
                            </a>
                            </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
                <nav>
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${page <= 1 ? "disabled" : ""}`}>
                      <button className="page-link" onClick={() => handlePageChange(page - 1)}>
                        Anterior
                      </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <li key={i} className={`page-item ${page === i + 1 ? "active" : ""}`}>
                        <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                          {i + 1}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${page >= totalPages ? "disabled" : ""}`}>
                      <button className="page-link" onClick={() => handlePageChange(page + 1)}>
                        Próximo
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
      </section>
    </main>
  );
};

export default OrdersPage;
