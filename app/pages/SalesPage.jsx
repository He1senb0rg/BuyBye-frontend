import React, { useEffect, useState } from "react";
import { getProductsSales, getProductById } from "../services/api";
import { useSearchParams } from 'react-router-dom';
import Product from "../components/products/Product";

const SalesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalProducts, setTotalProducts] = useState(0);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const sort = searchParams.get("sort") || "mais_recente";

    const totalPages = Math.ceil(totalProducts / limit);

    const handleSortChange = (e) => {
        setSearchParams({
            page: "1",
            limit: String(limit),
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

    const handlePageChange = (newPage) => {
        setSearchParams({
            page: String(newPage),
            limit: String(limit),
            sort
        });
    };

    useEffect(() => {
        const fetchProductsWithImages = async () => {
            setLoading(true);
            try {
                const res = await getProductsSales(page, limit, sort);
                const fetchedProducts = res.products;

                // Fetch images for each product
                const productsWithImages = await Promise.all(
                    fetchedProducts.map(async (product) => {
                        try {
                            const productDetails = await getProductById(product._id);
                            return { ...product, images: productDetails.images };
                        } catch (err) {
                            console.error(`Failed to fetch images for product ${product._id}`, err);
                            return { ...product, images: [] }; // fallback in case of error
                        }
                    })
                );

                setProducts(productsWithImages);
                setTotalProducts(res.totalProducts);
                setError(null);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Failed to fetch products.");
            } finally {
                setLoading(false);
            }
        };

        fetchProductsWithImages();
    }, [page, limit, sort]);

    return (
        <main>
            <section className="bg-body-tertiary py-5 ">
                <div className="container pb-3">
                    <div className="d-flex align-items-center">
                        <p className="h2">Os nossos produtos em promoção: </p>
                    </div>

                    <div className="d-flex flex-wrap align-items-center justify-content-end gap-3 py-3">
                        <div className="form-floating me-3" style={{ minWidth: "150px" }}>
                            <select
                                className="form-select"
                                onChange={handleLimitChange}
                                value={limit}
                            >
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
                                <option value="mais_recente">Mais Recente</option>
                                <option value="mais_antigo">Mais Antigo</option>
                                <option value="nome_az">Nome A → Z</option>
                                <option value="nome_za">Nome Z → A</option>
                            </select>
                            <label htmlFor="floatingSelect">Ordenar por</label>
                        </div>
                    </div>

                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
                            {products.map((product, index) => (
                                <Product
                                    key={"product" + index}
                                    _id={product._id}
                                    name={product.name}
                                    description={product.description}
                                    price={product.price}
                                    images={product.images}
                                    rating={product.averageRating}
                                    discount={product.discount}
                                    link={`product/${product._id}`}
                                />
                            ))}
                        </div>
                    )}

                    <nav>
                        <ul className="pagination justify-content-center">
                            <li className={`page-item ${page <= 1 ? "disabled" : ""}`}>
                                <button
                                    className="page-link"
                                    tabIndex="-1"
                                    onClick={() => handlePageChange(page - 1)}
                                >
                                    Anterior
                                </button>
                            </li>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <li
                                    key={index}
                                    className={`page-item ${page === index + 1 ? "active" : ""}`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => handlePageChange(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                            <li className={`page-item ${page >= totalPages ? "disabled" : ""}`}>
                                <button
                                    className="page-link"
                                    onClick={() => handlePageChange(page + 1)}
                                >
                                    Próximo
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </section>
        </main>
    );
};

export default SalesPage;