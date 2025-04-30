import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import { getProductById, getProductReviewsStats } from "../services/api";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import Review from "../components/Review";
import StarRating from "../components/StarRating";
import StarBar from "../components/StarBar";

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loadingProduct, setLoadingProduct] = useState(true);
    const [errorProduct, setErrorProduct] = useState(null);

    const [productStats, setProductStats] = useState({});
    const [loadingProductStats, setLoadingProductStats] = useState(true);
    const [errorProductStats, setErrorProductStats] = useState(null);

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const decreaseQuantity = () => {
        setQuantity((prev) => Math.max(1, prev - 1));
    };

    const increaseQuantity = () => {
        setQuantity((prev) => prev + 1);
    };

    const hasActiveDiscount = (discount) => {
        if (!discount) return false;

        if (!discount.start_date || !discount.end_date) return true;

        const now = new Date();
        const start = new Date(discount.start_date);
        const end = new Date(discount.end_date);

        return now >= start && now <= end;
    };

    const calculateFinalPrice = () => {
        if (hasActiveDiscount(product.discount)) {
            const { type, value } = product.discount;

            if (type === "percentage") {
                return (product.price * (1 - value)).toFixed(2);
            } else if (type === "fixed") {
                return product.price - value;
            }
        }

        return product.price;
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProductById(id);
                setProduct(response);
                console.log("Product response:", response);
            } catch (error) {
                console.errorProduct("Failed to fetch product:", error);
                setErrorProduct("Failed to fetch product");
            } finally {
                setLoadingProduct(false);
            }
        };

        const fetchReviews = async () => {
            try {
                const response = await getProductReviewsStats(id);
                setProductStats(response);
                console.log("Product response:", response);
            } catch (error) {
                console.errorProductStats("Failed to fetch product:", error);
                setErrorProductStats("Failed to fetch product");
            } finally {
                setLoadingProductStats(false);
            }
        };

        fetchProduct();
        fetchReviews();
    }, [id]);

    const maxCount = Math.max(
        productStats[5] || 0,
        productStats[4] || 0,
        productStats[3] || 0,
        productStats[2] || 0,
        productStats[1] || 0
    );


    return (
        <main>
            {loadingProduct ? (
                <p>Loading...</p>
            ) : (
                <>
                    <section className="container pb-3 pt-4">
                        <div className="row">
                            <div className="col">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <a href="shop.html">Home</a>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            Novidades
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <Swiper
                                    modules={[Navigation, Pagination, Thumbs]}
                                    spaceBetween={10}
                                    navigation
                                    pagination={{ clickable: true }}
                                    loop={true}
                                    thumbs={{ swiper: thumbsSwiper }}
                                    className="mySwiper2 pb-2"
                                >
                                    {product.images.map((image, index) => (
                                        <SwiperSlide key={index}>
                                            <img
                                                src={image}
                                                className="img-fluid rounded"
                                                alt={`Product Image ${index + 1}`}
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                <Swiper
                                    onSwiper={setThumbsSwiper}
                                    spaceBetween={10}
                                    slidesPerView={3}
                                    watchSlidesProgress={true}
                                    className="mySwiper"
                                >
                                    {product.images.map((image, index) => (
                                        <SwiperSlide key={index}>
                                            <img src={image}
                                                className="img-fluid rounded"
                                                alt={`Product Image Thumbnail ${index + 1}`}
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="d-flex flex-column justify-content-between h-100">
                                    <div>
                                        <div className="d-flex">
                                            <h1 className="h2">{product.name}</h1>
                                            {product.discount && (
                                                <span className="badge bg-primary p-1 m-2 fs-5">
                                                    {product.discount.type === "percentage"
                                                        ? `-${product.discount.value * 100}%`
                                                        : `-${product.discount.value}€`}
                                                </span>
                                            )}
                                        </div>

                                        <div className="d-flex justify-content-between">
                                            {product.discount ? (
                                                <>
                                                    <div className="d-flex">
                                                        <p className="h4 me-2">{calculateFinalPrice()}€</p>
                                                        <p className="text-decoration-line-through text-muted ">
                                                            {product.price}€
                                                        </p>
                                                    </div>
                                                </>
                                            ) : (
                                                <p className="h4">{product.price}€</p>
                                            )}
                                            <div>
                                                <StarRating rating={product.averageRating} />
                                                <small className="text-muted">
                                                    ({product.averageRating})
                                                </small>
                                            </div>
                                        </div>
                                        <hr />
                                        <div>
                                            <p className="h5">Descrição</p>
                                            <p className="text-body-secondary">
                                                {product.description}
                                            </p>
                                        </div>
                                        <div className="pb-3">
                                            <p className="h5">
                                                Cor: <span>cor</span>
                                            </p>
                                            <div className="d-flex gap-2" data-toggle="buttons">
                                                <input
                                                    className="btn-check"
                                                    type="radio"
                                                    name="colors"
                                                    id="color1"
                                                    autoComplete="off"
                                                />
                                                <label
                                                    className="btn btn-primary border-0 p-3"
                                                    style={{ backgroundColor: "#534029", width: "50px" }}
                                                    htmlFor="color1"
                                                ></label>

                                                <input
                                                    className="btn-check"
                                                    type="radio"
                                                    name="colors"
                                                    id="color2"
                                                    autoComplete="off"
                                                />
                                                <label
                                                    className="btn btn-primary border-0 p-3"
                                                    style={{ backgroundColor: "#EBEBEB", width: "50px" }}
                                                    htmlFor="color2"
                                                ></label>

                                                <input
                                                    className="btn-check"
                                                    type="radio"
                                                    name="colors"
                                                    id="color3"
                                                    autoComplete="off"
                                                />
                                                <label
                                                    className="btn btn-primary border-0 p-3"
                                                    style={{ backgroundColor: "#3A6A90", width: "50px" }}
                                                    htmlFor="color3"
                                                ></label>

                                                <input
                                                    className="btn-check"
                                                    type="radio"
                                                    name="colors"
                                                    id="color4"
                                                    autoComplete="off"
                                                />
                                                <label
                                                    className="btn btn-primary border-0 p-3"
                                                    style={{ backgroundColor: "#11171D", width: "50px" }}
                                                    htmlFor="color4"
                                                ></label>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="h5">
                                                Tamanho: <span>tamanho</span>
                                            </p>
                                            <div className="d-flex gap-2" data-toggle="buttons">
                                                <input
                                                    className="btn-check"
                                                    type="radio"
                                                    name="sizes"
                                                    id="size1"
                                                    autoComplete="off"
                                                />
                                                <label
                                                    className="btn btn-outline-primary text-light"
                                                    style={{ width: "50px" }}
                                                    htmlFor="size1"
                                                >
                                                    S
                                                </label>

                                                <input
                                                    className="btn-check"
                                                    type="radio"
                                                    name="sizes"
                                                    id="size2"
                                                    autoComplete="off"
                                                />
                                                <label
                                                    className="btn btn-outline-primary text-light"
                                                    style={{ width: "50px" }}
                                                    htmlFor="size2"
                                                >
                                                    M
                                                </label>

                                                <input
                                                    className="btn-check"
                                                    type="radio"
                                                    name="sizes"
                                                    id="size3"
                                                    autoComplete="off"
                                                />
                                                <label
                                                    className="btn btn-outline-primary text-light"
                                                    style={{ width: "50px" }}
                                                    htmlFor="size3"
                                                >
                                                    L
                                                </label>

                                                <input
                                                    className="btn-check"
                                                    type="radio"
                                                    name="sizes"
                                                    id="size4"
                                                    autoComplete="off"
                                                />
                                                <label
                                                    className="btn btn-outline-primary text-light"
                                                    style={{ width: "50px" }}
                                                    htmlFor="size4"
                                                >
                                                    XL
                                                </label>
                                            </div>
                                        </div>
                                        <div className="row mt-5">
                                            <div className="col-6 col-lg-6 col-xl-3 pe-0 mb-3">
                                                <div className="input-group">
                                                    <button
                                                        className="btn btn-primary"
                                                        type="button"
                                                        onClick={decreaseQuantity}
                                                    >
                                                        <i className="bi bi-dash fw-bold"></i>
                                                    </button>

                                                    <input
                                                        className="form-control border-primary"
                                                        name="quantity"
                                                        id="quantityInput"
                                                        type="number"
                                                        value={quantity}
                                                        min="1"
                                                        readOnly
                                                    />
                                                    <button
                                                        className="btn btn-primary"
                                                        type="button"
                                                        onClick={increaseQuantity}
                                                    >
                                                        <i className="bi bi-plus-lg fw-bold"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="col-6 col-lg-6 col-xl-auto d-flex justify-content-end mb-3">
                                                <button
                                                    className="btn btn-primary justify-content-end w-100"
                                                    type="button"
                                                >
                                                    <i className="bi bi-heart"></i>
                                                </button>
                                            </div>
                                            <div className="col-1 col-lg-12 col-xl ps-2 ps-lg-0 w-100 mb-3">
                                                <button
                                                    className="btn btn-primary w-100 h-100 fw-bold"
                                                    type="button"
                                                >
                                                    Adicionar ao Carrinho
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="bg-body-tertiary">
                        <div className="container py-4">
                            <p className="h2">Avaliações</p>
                            <div className="row">
                                <div className="col-md-4 text-center">
                                    <h1 className="display-4 mt-5 mb-4 fw-bold">
                                        {product.averageRating}
                                    </h1>
                                    <div className="mb-3 fs-4">
                                        <StarRating rating={product.averageRating} />
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="rating-bars">
                                        {loadingProductStats ? <div>Loading...</div> :
                                            [5, 4, 3, 2, 1].map((star) => (
                                                <StarBar
                                                    key={star}
                                                    rating={star}
                                                    count={productStats[star] || 0}
                                                    maxCount={maxCount || 0}
                                                />
                                            ))}
                                    </div>
                                </div>
                            </div>
                            {product?.reviews?.length > 0 ? (
                                product.reviews.map((review, index) => (
                                    <Review
                                        key={index}
                                        user={review.user.name}
                                        comment={review.comment}
                                        rating={review.rating}
                                        createdAt={review.createdAt}
                                    />
                                ))
                            ) : (
                                <p className="text-muted pt-4">Sem avaliações ainda.</p>
                            )}
                        </div>
                    </section>
                </>
            )}
        </main>
    );
};

export default ProductPage;
