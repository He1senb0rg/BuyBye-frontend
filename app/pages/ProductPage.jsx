import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

const ProductPage = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <main>
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
                        <Swiper modules={[Navigation, Pagination, Thumbs]} spaceBetween={10} navigation pagination={{ clickable: true }} loop={true} thumbs={{ swiper: thumbsSwiper }} className="mySwiper2 pb-2">
                            <SwiperSlide><img src="/assets/images/fogao1.webp" class="img-fluid rounded" alt="Product Image" /></SwiperSlide>
                            <SwiperSlide><img src="/assets/images/fogao2.webp" class="img-fluid rounded" alt="Product Image" /></SwiperSlide>
                            <SwiperSlide><img src="/assets/images/fogao3.webp" class="img-fluid rounded" alt="Product Image" /></SwiperSlide>
                            <SwiperSlide><img src="/assets/images/fogao4.webp" class="img-fluid rounded" alt="Product Image" /></SwiperSlide>
                            <SwiperSlide><img src="/assets/images/fogao5.webp" class="img-fluid rounded" alt="Product Image" /></SwiperSlide>
                        </Swiper>
                        <Swiper onSwiper={setThumbsSwiper} spaceBetween={10} slidesPerView={3} watchSlidesProgress={true} className="mySwiper">
                            <SwiperSlide><img src="/assets/images/fogao1.webp" class="img-fluid rounded" alt="Product Image Thumbnail" /></SwiperSlide>
                            <SwiperSlide><img src="/assets/images/fogao2.webp" class="img-fluid rounded" alt="Product Image Thumbnail" /></SwiperSlide>
                            <SwiperSlide><img src="/assets/images/fogao3.webp" class="img-fluid rounded" alt="Product Image Thumbnail" /></SwiperSlide>
                            <SwiperSlide><img src="/assets/images/fogao4.webp" class="img-fluid rounded" alt="Product Image Thumbnail" /></SwiperSlide>
                            <SwiperSlide><img src="/assets/images/fogao5.webp" class="img-fluid rounded" alt="Product Image Thumbnail" /></SwiperSlide>
                        </Swiper>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="d-flex flex-column justify-content-between h-100">
                            <div>
                                <div className="d-flex">
                                    <h1 className="h2">Nome do Produto</h1>
                                    <span className="badge bg-primary p-1 m-2 fs-5">-50%</span>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <div className="d-flex">
                                        <p className="h4 me-2">99,99€</p>
                                        <p className="text-decoration-line-through text-muted ">199,99€</p>
                                    </div>
                                    <div>
                                        <i className="bi bi-star-fill text-warning"></i>
                                        <i className="bi bi-star-fill text-warning"></i>
                                        <i className="bi bi-star-fill text-warning"></i>
                                        <i className="bi bi-star-fill text-warning"></i>
                                        <i className="bi bi-star-half text-warning"></i>
                                        <small className="text-muted">(4.5)</small>
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <p className="h5">Descrição</p>
                                    <p className="text-body-secondary">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </p>
                                </div>
                                <div className="pb-3">
                                    <p className="h5">Cor: <span>cor</span></p>
                                    <div className="d-flex gap-2" data-toggle="buttons">
                                        <input className="btn-check" type="radio" name="colors" id="color1" autoComplete="off" />
                                        <label className="btn btn-primary border-0 p-3" style={{ backgroundColor: '#534029', width: '50px' }} htmlFor="color1"></label>

                                        <input className="btn-check" type="radio" name="colors" id="color2" autoComplete="off" />
                                        <label className="btn btn-primary border-0 p-3" style={{ backgroundColor: '#EBEBEB', width: '50px' }} htmlFor="color2"></label>

                                        <input className="btn-check" type="radio" name="colors" id="color3" autoComplete="off" />
                                        <label className="btn btn-primary border-0 p-3" style={{ backgroundColor: '#3A6A90', width: '50px' }} htmlFor="color3"></label>

                                        <input className="btn-check" type="radio" name="colors" id="color4" autoComplete="off" />
                                        <label className="btn btn-primary border-0 p-3" style={{ backgroundColor: '#11171D', width: '50px' }} htmlFor="color4"></label>
                                    </div>
                                </div>
                                <div>
                                    <p className="h5">Tamanho: <span>tamanho</span></p>
                                    <div className="d-flex gap-2" data-toggle="buttons">
                                        <input className="btn-check" type="radio" name="sizes" id="size1" autoComplete="off" />
                                        <label className="btn btn-outline-primary text-light" style={{ width: '50px' }} htmlFor="size1">S</label>

                                        <input className="btn-check" type="radio" name="sizes" id="size2" autoComplete="off" />
                                        <label className="btn btn-outline-primary text-light" style={{ width: '50px' }} htmlFor="size2">M</label>

                                        <input className="btn-check" type="radio" name="sizes" id="size3" autoComplete="off" />
                                        <label className="btn btn-outline-primary text-light" style={{ width: '50px' }} htmlFor="size3">L</label>

                                        <input className="btn-check" type="radio" name="sizes" id="size4" autoComplete="off" />
                                        <label className="btn btn-outline-primary text-light" style={{ width: '50px' }} htmlFor="size4">XL</label>
                                    </div>
                                </div>
                                <div className="row mt-5">
                                    <div className="col-6 col-lg-6 col-xl-3 pe-0 mb-3">
                                        <div className="input-group">
                                            <button className="btn btn-primary" type="button" id="decreaseQuantity">
                                                <i className="bi bi-dash fw-bold"></i>
                                            </button>

                                            <input className="form-control border-primary" name="quantity" id="quantityInput" type="number" value="1" min="1" />
                                            <button className="btn btn-primary" type="button" id="increaseQuantity">
                                                <i className="bi bi-plus-lg fw-bold"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-6 col-lg-6 col-xl-auto d-flex justify-content-end mb-3">
                                        <button className="btn btn-primary justify-content-end w-100" type="button">
                                            <i className="bi bi-heart"></i>
                                        </button>
                                    </div>
                                    <div className="col-1 col-lg-12 col-xl ps-2 ps-lg-0 w-100 mb-3">
                                        <button className="btn btn-primary w-100 h-100 fw-bold" type="button">
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
                            <h1 className="display-4 mt-5 mb-4 fw-bold">4.5</h1>
                            <div className="mb-3 fs-4">
                                <i className="bi bi-star-fill text-warning"></i>
                                <i className="bi bi-star-fill text-warning"></i>
                                <i className="bi bi-star-fill text-warning"></i>
                                <i className="bi bi-star-fill text-warning"></i>
                                <i className="bi bi-star-half text-warning"></i>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="rating-bars">
                                <div className="rating-bar mb-3">
                                    <div className="d-flex justify-content-between align-items-center mb-1">
                                        <span>5 estrelas</span>
                                        <small className="text-muted">254</small>
                                    </div>
                                    <div className="progress" style={{ height: '10px' }}>
                                        <div className="progress-bar bg-warning" role="progressbar" style={{ width: '70%' }} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                                <div className="rating-bar mb-3">
                                    <div className="d-flex justify-content-between align-items-center mb-1">
                                        <span>4 estrelas</span>
                                        <small className="text-muted">132</small>
                                    </div>
                                    <div className="progress" style={{ height: '10px' }}>
                                        <div className="progress-bar bg-warning" role="progressbar" style={{ width: '20%' }} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                                <div className="rating-bar mb-3">
                                    <div className="d-flex justify-content-between align-items-center mb-1">
                                        <span>3 estrelas</span>
                                        <small className="text-muted">69</small>
                                    </div>
                                    <div className="progress" style={{ height: '10px' }}>
                                        <div className="progress-bar bg-warning" role="progressbar" style={{ width: '5%' }} aria-valuenow="5" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                                <div className="rating-bar mb-3">
                                    <div className="d-flex justify-content-between align-items-center mb-1">
                                        <span>2 estrelas</span>
                                        <small className="text-muted">26</small>
                                    </div>
                                    <div className="progress" style={{ height: '10px' }}>
                                        <div className="progress-bar bg-warning" role="progressbar" style={{ width: '3%' }} aria-valuenow="3" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                                <div className="rating-bar">
                                    <div className="d-flex justify-content-between align-items-center mb-1">
                                        <span>1 estrela</span>
                                        <small className="text-muted">9</small>
                                    </div>
                                    <div className="progress" style={{ height: '10px' }}>
                                        <div className="progress-bar bg-warning" role="progressbar" style={{ width: '2%' }} aria-valuenow="2" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row pt-4">
                        <div className="col">
                            <div className="card p-3">
                                <div className="mb-2 fs-4">
                                    <i className="bi bi-star-fill text-warning"></i>
                                    <i className="bi bi-star-fill text-warning"></i>
                                    <i className="bi bi-star-fill text-warning"></i>
                                    <i className="bi bi-star-fill text-warning"></i>
                                    <i className="bi bi-star-half text-warning"></i>
                                </div>
                                <p className="fw-bold">Gostei bue deste produto super fixe wow mudou a minha vida</p>
                                <p className="text-muted">15 de Junho de 2025, 14:56</p>
                                <div className="d-flex align-items-center">
                                    <i className="bi bi-person-circle fs-2"></i>
                                    <p className="ps-2 mt-3">Utilizador wawa</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row pt-4">
                        <div className="col">
                            <div className="card p-3">
                                <div className="mb-2 fs-4">
                                    <i className="bi bi-star-fill text-warning"></i>
                                    <i className="bi bi-star-fill text-warning"></i>
                                    <i className="bi bi-star-fill text-warning"></i>
                                    <i className="bi bi-star-fill text-warning"></i>
                                    <i className="bi bi-star-half text-warning"></i>
                                </div>
                                <p className="fw-bold">Gostei bue deste produto super fixe wow mudou a minha vida</p>
                                <p className="text-muted">15 de Junho de 2025, 14:56</p>
                                <div className="d-flex align-items-center">
                                    <i className="bi bi-person-circle fs-2"></i>
                                    <p className="ps-2 mt-3">Utilizador wawa</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ProductPage;
