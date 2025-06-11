import React from "react";
import { getProductsSales } from "../services/api";
import { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import Product from "../components/products/Product";

const SalesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalProducts, setTotalProducts] = useState(0);

    const page = searchParams.get("page") || 1;
    const limit = searchParams.get("limit") || 10;
    const sort = searchParams.get("sort") || "mais_recente";

    const totalPages = Math.ceil(totalProducts / limit);

    const handleSortChange = (e) => {
        setSearchParams({
            page: "1",
            limit,
            sort: e.target.value
        });
    };

    const handleLimitChange = (e) => {
        setSearchParams({
            page: "1",
            limit: e.target.value,
            sort
        });
    };

    const handlePageChange = (page) => {
        searchParams.set("page", page);
        setSearchParams(searchParams);
    };

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await getProductsSales(page, limit, sort);
                setProducts(res.products);
                setTotalProducts(res.totalProducts);
            } catch (err) {
                console.log("erro:", err)
                setError("Failed to fetch products");
            } finally {
                setLoading(false);
            }
        }
        fetch();
    }, [searchParams])

    return (
        <main>
            <section className="bg-body-tertiary py-5 ">
                <div className="container pb-3">
                    <div className="d-flex align-items-center">
                        <p className="h2">Os nossos produtos em promoção: </p>
                    </div>
                    <div className="d-flex align-items-center justify-content-end py-3">
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

                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            products.map((product, index) => (
                                <Product
                                    key={"product" + index}
                                    name={product.name}
                                    description={product.description}
                                    price={product.price}
                                    images={product.images}
                                    rating={product.averageRating}
                                    discount={product.discount}
                                    link={`product/${product._id}`}
                                />
                            ))
                        )}
                    </div>
                </div>
                <nav>
                    <ul className="pagination justify-content-center">
                        <li className={`page-item ${page <= 1 ? "disabled" : ""}`}>
                            <button
                                className="page-link"
                                tabIndex="-1"
                                onClick={() => handlePageChange(Number(page) - 1)}
                            >
                                Anterior
                            </button>
                        </li>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <li
                                key={index}
                                className={`page-item ${Number(page) === index + 1 ? "active" : ""
                                    }`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                        <li
                            className={`page-item ${Number(page) >= totalPages ? "disabled" : ""
                                }`}
                        >
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(Number(page) + 1)}
                            >
                                Próximo
                            </button>
                        </li>
                    </ul>
                </nav>
            </section>
        </main>
    )
}

export default SalesPage;